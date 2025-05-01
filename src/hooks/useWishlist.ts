
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from '@/hooks/useAuth';

export type WishlistItem = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export function useWishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  async function fetchWishlist() {
    try {
      setLoading(true);
      if (!user) return;
      
      const wishlistRef = collection(db, 'wishlists');
      const q = query(wishlistRef, where('user_id', '==', user.uid));
      const snapshot = await getDocs(q);
      
      const wishlistItems: WishlistItem[] = [];
      snapshot.forEach(doc => {
        wishlistItems.push({
          id: doc.id,
          ...doc.data()
        } as WishlistItem);
      });
      
      setWishlist(wishlistItems);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addToWishlist(product_id: string) {
    try {
      if (!user) return null;
      
      // Check if product already exists in wishlist
      const wishlistRef = collection(db, 'wishlists');
      const q = query(
        wishlistRef, 
        where('user_id', '==', user.uid),
        where('product_id', '==', product_id)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        return snapshot.docs[0].id;
      }
      
      // Add new wishlist item
      const newItem = await addDoc(wishlistRef, {
        user_id: user.uid,
        product_id: product_id,
        created_at: new Date().toISOString()
      });
      
      await fetchWishlist();
      return newItem.id;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return null;
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      setRemovingItems(prev => ({ ...prev, [id]: true }));
      
      const docRef = doc(db, 'wishlists', id);
      await deleteDoc(docRef);
      
      setWishlist(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    } finally {
      setRemovingItems(prev => ({ ...prev, [id]: false }));
    }
  }

  async function isInWishlist(product_id: string): Promise<{isInWishlist: boolean, wishlistId: string | null}> {
    try {
      if (!user) return { isInWishlist: false, wishlistId: null };
      
      const wishlistRef = collection(db, 'wishlists');
      const q = query(
        wishlistRef, 
        where('user_id', '==', user.uid),
        where('product_id', '==', product_id)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return { isInWishlist: false, wishlistId: null };
      }
      
      return { isInWishlist: true, wishlistId: snapshot.docs[0].id };
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return { isInWishlist: false, wishlistId: null };
    }
  }

  return {
    wishlist,
    loading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    removingItems
  };
}
