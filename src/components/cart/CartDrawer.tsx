
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchProductsByIds, ProductInfo } from "@/utils/productMap";
import { supabase } from "@/integrations/supabase/client";

export default function CartDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const { user } = useAuth();
  const {
    cart,
    cartItems,
    removeFromCart,
    updateQuantity,
    loading,
    getTotalAmount,
    refetch,
  } = useCart();
  const { toast } = useToast();
  const [productMap, setProductMap] = useState<Record<string, ProductInfo>>({});

  useEffect(() => {
    if (cartItems.length) {
      fetchProductsByIds(cartItems.map((c) => c.product_id)).then(setProductMap);
    } else {
      setProductMap({});
    }
  }, [cartItems]);

  // Place order logic. Adds the order and order_items for all items
  async function placeOrder() {
    if (!user || !cart || !cartItems.length) return;

    const totalAmount = cartItems.reduce((sum, i) => {
      const price = Number(
        productMap[i.product_id]?.price.replace("$", "") || 0
      );
      return sum + price * i.quantity;
    }, 0);

    // Add order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .maybeSingle();

    if (order) {
      // Add all items
      const itemsData = cartItems.map((i) => ({
        order_id: order.id,
        product_id: i.product_id,
        quantity: i.quantity,
        price_at_time: Number(
          productMap[i.product_id]?.price.replace("$", "") || 0
        ),
      }));
      await supabase.from("order_items").insert(itemsData);
      // Remove all cart items for this cart
      await supabase.from("cart_items").delete().eq("cart_id", cart.id);
      await refetch();
      toast({
        title: "Order placed",
        description: "Your order has been placed!",
      });
      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not place order. Try again.",
      });
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Cart
          </h2>
          {loading ? (
            <div>Loading...</div>
          ) : cartItems.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center border rounded-lg p-2"
                >
                  <img
                    src={productMap[item.product_id]?.image}
                    alt={productMap[item.product_id]?.name || "product"}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">
                      {productMap[item.product_id]?.name || item.product_id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </div>
                    <div className="text-sm font-bold">
                      {productMap[item.product_id]?.price}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      removeFromCart(item.id);
                      toast({ description: "Item removed from cart" });
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="pt-6 border-t mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <div>Total:</div>
                  <div>
                    $
                    {getTotalAmount(productMap).toFixed(2)}
                  </div>
                </div>
                <Button
                  variant="default"
                  className="w-full mt-6"
                  onClick={placeOrder}
                  disabled={loading || cartItems.length === 0}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
