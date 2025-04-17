
import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import type { Tables } from '@/integrations/supabase/types';

type Address = Tables<'shipping_addresses'>;

export default function Addresses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  async function fetchAddresses() {
    try {
      const { data, error } = await supabase
        .from('shipping_addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAddress(id: string) {
    try {
      const { error } = await supabase
        .from('shipping_addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAddresses(addresses.filter(addr => addr.id !== id));
      toast({
        title: 'Success',
        description: 'Address deleted successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error deleting address',
      });
    }
  }

  if (loading) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div className="space-y-4">
      <Button className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Address
      </Button>
      
      {addresses.length === 0 ? (
        <p className="text-center text-muted-foreground">No addresses found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p>{address.address_line1}</p>
                    {address.address_line2 && <p>{address.address_line2}</p>}
                    <p>{`${address.city}, ${address.state} ${address.postal_code}`}</p>
                    <p>{address.country}</p>
                    {address.is_default && (
                      <span className="text-sm text-primary mt-2">Default Address</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
