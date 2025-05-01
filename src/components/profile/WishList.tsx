
import React, { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';
import { fetchProductsByIds, ProductInfo } from '@/utils/productMap';

type Wishlist = Tables<'wishlists'>;

export default function WishList() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [productMap, setProductMap] = useState<Record<string, ProductInfo>>({});
  const [removingItems, setRemovingItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  useEffect(() => {
    if (wishlist.length) {
      fetchProductsByIds(wishlist.map(w => w.product_id)).then(setProductMap);
    } else {
      setProductMap({});
    }
  }, [wishlist]);

  async function fetchWishlist() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setWishlist(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch your wishlist. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      setRemovingItems(prev => ({ ...prev, [id]: true }));
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWishlist(wishlist.filter(item => item.id !== id));
      toast({
        title: 'Success',
        description: 'Item removed from wishlist',
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error removing item from wishlist',
      });
    } finally {
      setRemovingItems(prev => ({ ...prev, [id]: false }));
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
              const product = productMap[item.product_id];
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
                        onClick={() => removeFromWishlist(item.id)}
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
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
