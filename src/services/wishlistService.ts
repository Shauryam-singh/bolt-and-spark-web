
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/integrations/firebase';

export interface WishlistItem {
  id: string;
  product_id: string;
  product_data: any;
  user_id: string;
  created_at: any;
}

// Get all wishlist items for a user
export const getUserWishlist = async (userId: string): Promise<WishlistItem[]> => {
  try {
    if (!userId) return [];
    
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('user_id', '==', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as WishlistItem));
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add a product to the wishlist
export const addToWishlist = async (userId: string, product_id: string, product_data: any): Promise<string> => {
  try {
    if (!userId) throw new Error('User must be logged in to add to wishlist');
    
    const wishlistRef = collection(db, 'wishlist');
    
    // Check if product already exists in wishlist
    const q = query(wishlistRef, 
      where('user_id', '==', userId), 
      where('product_id', '==', product_id)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      // Product already in wishlist
      return snapshot.docs[0].id;
    }
    
    // Add new wishlist item
    const docRef = await addDoc(wishlistRef, {
      user_id: userId,
      product_id,
      product_data,
      created_at: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (wishlistItemId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'wishlist', wishlistItemId));
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Check if a product is in the wishlist
export const isProductInWishlist = async (userId: string, product_id: string): Promise<string | null> => {
  try {
    if (!userId) return null;
    
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, 
      where('user_id', '==', userId), 
      where('product_id', '==', product_id)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    return snapshot.docs[0].id;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    throw error;
  }
};
