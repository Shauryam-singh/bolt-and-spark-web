
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { db } from "@/integrations/firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc, documentId } from "firebase/firestore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    // Listen for real-time updates to the user's cart
    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: CartItem[] = [];
      snapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        } as CartItem);
      });
      setCartItems(items);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching cart items:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const removeFromCart = async (itemId: string) => {
    if (!user) return;
    
    try {
      const itemRef = doc(db, "cart", itemId);
      await deleteDoc(itemRef);
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item from cart",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? "Your cart is empty"
              : `You have ${cartItems.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No items in your cart</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600">
                        {item.quantity} × ₹{item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Shipping and taxes calculated at checkout
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Button className="w-full">
                  <Check className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
