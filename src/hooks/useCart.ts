
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Tables } from "@/integrations/supabase/types";

type CartItem = Tables<"cart_items">;
type Cart = Tables<"carts">;

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
    // eslint-disable-next-line
  }, [user]);

  async function fetchCartAndItems() {
    setLoading(true);
    // Find the user's cart, or create one if missing
    let { data: cart, error } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user?.id)
      .maybeSingle();

    if (!cart && user) {
      // Create cart if user does not have one yet
      const { data, error: createError } = await supabase
        .from("carts")
        .insert({ user_id: user.id })
        .select()
        .maybeSingle();
      if (data) cart = data;
    }

    if (cart) {
      setCart(cart);
      // Now load the cart items
      const { data: items, error: itemsError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id);
      setCartItems(items || []);
    }
    setLoading(false);
  }

  async function addToCart(product_id: string, quantity: number = 1) {
    if (!cart) return;

    // Try to find whether already exists, then update quantity
    const existing = cartItems.find(i => i.product_id === product_id);
    if (existing) {
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({
        cart_id: cart.id,
        product_id,
        quantity,
      });
    }
    await fetchCartAndItems();
  }

  async function removeFromCart(item_id: string) {
    await supabase.from("cart_items").delete().eq("id", item_id);
    await fetchCartAndItems();
  }

  async function updateQuantity(item_id: string, quantity: number) {
    await supabase.from("cart_items").update({ quantity }).eq("id", item_id);
    await fetchCartAndItems();
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
