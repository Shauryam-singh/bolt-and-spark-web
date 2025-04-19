
import React from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PRODUCTS: Record<string, { name: string; image: string; price: string }> = {
  // If you want, import from data or context.
};

export default function CartDrawer({
  open,
  setOpen,
  productMap,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  productMap: Record<string, { name: string; image: string; price: string }>;
}) {
  const { user } = useAuth();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    loading,
    getTotalAmount,
  } = useCart();
  const { toast } = useToast();

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
                    alt="product"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">
                      {productMap[item.product_id]?.name}
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
                  <div>${getTotalAmount(productMap).toFixed(2)}</div>
                </div>
                <Button variant="default" className="w-full mt-6">
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
