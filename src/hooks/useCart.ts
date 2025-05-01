
import { useEffect, useState } from "react";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/firebase';
import { useAuth } from "@/hooks/useAuth";

type CartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at?: string;
};

type Cart = {
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export function useCart() {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCartAndItems();
    } else {
      setCart(null);
      setCartItems([]);
    }
  }, [user]);

  async function fetchCartAndItems() {
    setLoading(true);
    try {
      // Find the user's cart, or create one if missing
      const cartsRef = collection(db, 'carts');
      const q = query(cartsRef, where("user_id", "==", user?.uid));
      const snapshot = await getDocs(q);
      
      let userCart: Cart | null = null;
      
      if (snapshot.empty && user) {
        // Create cart if user does not have one yet
        const newCartRef = await addDoc(cartsRef, { 
          user_id: user.uid,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
        // Get the newly created cart
        const newCartDoc = await getDoc(newCartRef);
        userCart = {
          id: newCartDoc.id,
          ...newCartDoc.data()
        } as Cart;
      } else {
        // Use existing cart
        userCart = {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data()
        } as Cart;
      }

      if (userCart) {
        setCart(userCart);
        
        // Now load the cart items
        const cartItemsRef = collection(db, 'cart_items');
        const itemsQuery = query(cartItemsRef, where("cart_id", "==", userCart.id));
        const itemsSnapshot = await getDocs(itemsQuery);
        
        const items: CartItem[] = [];
        itemsSnapshot.forEach(doc => {
          items.push({
            id: doc.id,
            ...doc.data()
          } as CartItem);
        });
        
        setCartItems(items);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(product_id: string, quantity: number = 1) {
    if (!cart) return;

    try {
      // Try to find whether already exists, then update quantity
      const cartItemsRef = collection(db, 'cart_items');
      const q = query(
        cartItemsRef, 
        where("cart_id", "==", cart.id), 
        where("product_id", "==", product_id)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Update existing item
        const existingItem = snapshot.docs[0];
        const existingQuantity = existingItem.data().quantity || 0;
        
        await updateDoc(doc(db, 'cart_items', existingItem.id), {
          quantity: existingQuantity + quantity
        });
      } else {
        // Add new item
        await addDoc(cartItemsRef, {
          cart_id: cart.id,
          product_id,
          quantity,
          created_at: new Date().toISOString()
        });
      }
      
      await fetchCartAndItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function removeFromCart(item_id: string) {
    try {
      await deleteDoc(doc(db, 'cart_items', item_id));
      await fetchCartAndItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  async function updateQuantity(item_id: string, quantity: number) {
    try {
      await updateDoc(doc(db, 'cart_items', item_id), { quantity });
      await fetchCartAndItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  function getTotalQuantity() {
    return cartItems.reduce((sum, i) => sum + i.quantity, 0);
  }

  function getTotalAmount(productMap: Record<string, { price: string }>) {
    return cartItems.reduce((sum, i) => {
      const price = Number(productMap[i.product_id]?.price?.replace("$", "") || 0);
      return sum + price * i.quantity;
    }, 0);
  }

  return {
    cart,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    loading,
    refetch: fetchCartAndItems,
    getTotalQuantity,
    getTotalAmount,
  };
}
