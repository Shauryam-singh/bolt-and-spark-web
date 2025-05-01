
import React, { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { fetchProductsByIds, ProductInfo } from '@/utils/productMap';
import { useWishlist } from '@/hooks/useWishlist';

export default function WishList() {
  const { toast } = useToast();
  const { wishlist, loading, removeFromWishlist, removingItems } = useWishlist();
  const [productMap, setProductMap] = useState<Record<string, ProductInfo>>({});

  useEffect(() => {
    if (wishlist.length) {
      // Convert product_id to string if it's not already
      const productIds = wishlist.map(w => String(w.product_id));
      fetchProductsByIds(productIds).then(setProductMap);
    } else {
      setProductMap({});
    }
  }, [wishlist]);

  async function handleRemoveFromWishlist(id: string) {
    try {
      const success = await removeFromWishlist(id);
      
      if (success) {
        toast({
          title: 'Success',
          description: 'Item removed from wishlist',
        });
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error removing item from wishlist',
      });
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading wishlist...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        {wishlist.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => {
              // Convert product_id to string if it's not already
              const productId = String(item.product_id);
              const product = productMap[productId];
              
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      {product ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 bg-muted flex items-center justify-center">
                          Product Image Not Available
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white rounded-full hover:bg-gray-100"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        disabled={removingItems[item.id]}
                      >
                        {removingItems[item.id] ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          <X className="h-4 w-4 text-gray-700" />
                        )}
                      </Button>
                    </div>
                    <div className="p-4">
                      {product ? (
                        <>
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-muted-foreground">{product.price}</p>
                        </>
                      ) : (
                        <p>Product ID: {item.product_id}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
