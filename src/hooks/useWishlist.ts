
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  getUserWishlist, 
  addToWishlist, 
  removeFromWishlist 
} from '@/services/wishlistService';

interface WishlistProduct {
  id: string;
  [key: string]: any;
}

export function useWishlist() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<Map<string, { id: string, data: WishlistProduct }>>(new Map());
  const [loading, setLoading] = useState(false);

  // Load wishlist on component mount or when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems(new Map());
    }
  }, [user]);

  // Fetch user's wishlist items
  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const items = await getUserWishlist(user.uid);
      
      const wishlistMap = new Map();
      items.forEach(item => {
        wishlistMap.set(item.product_id, {
          id: item.id,
          data: item.product_data
        });
      });
      
      setWishlistItems(wishlistMap);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load wishlist items."
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.has(productId);
  };

  // Toggle wishlist status for a product
  const toggleWishlist = async (productId: string, productData: WishlistProduct) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to add items to your wishlist."
      });
      return;
    }

    try {
      if (isInWishlist(productId)) {
        // Remove from wishlist
        const wishlistItemId = wishlistItems.get(productId)?.id;
        if (wishlistItemId) {
          await removeFromWishlist(wishlistItemId);
          
          // Update local state
          const updatedWishlist = new Map(wishlistItems);
          updatedWishlist.delete(productId);
          setWishlistItems(updatedWishlist);
          
          toast({
            title: "Removed from Wishlist",
            description: "Product removed from your wishlist."
          });
        }
      } else {
        // Add to wishlist
        const wishlistItemId = await addToWishlist(user.uid, productId, productData);
        
        // Update local state
        const updatedWishlist = new Map(wishlistItems);
        updatedWishlist.set(productId, {
          id: wishlistItemId,
          data: productData
        });
        setWishlistItems(updatedWishlist);
        
        toast({
          title: "Added to Wishlist",
          description: "Product added to your wishlist."
        });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update wishlist."
      });
    }
  };

  // Get all wishlist items as an array
  const getWishlistItems = (): WishlistProduct[] => {
    return Array.from(wishlistItems.values()).map(item => item.data);
  };

  return {
    wishlistItems: getWishlistItems(),
    isInWishlist,
    toggleWishlist,
    loading,
    refetchWishlist: fetchWishlist
  };
}
