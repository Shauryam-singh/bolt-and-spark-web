
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Home, Trash, Plus } from 'lucide-react';
import { db } from '@/integrations/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

interface Address {
  id: string;
  title: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Address>();

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const addressesRef = collection(db, 'addresses');
      const q = query(addressesRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      
      const fetchedAddresses: Address[] = [];
      snapshot.forEach(doc => {
        fetchedAddresses.push({
          id: doc.id,
          ...doc.data() as Omit<Address, 'id'>
        });
      });
      
      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your addresses."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Address) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const addressesRef = collection(db, 'addresses');
      const newAddress = {
        ...data,
        userId: user.uid,
        isDefault: addresses.length === 0 ? true : !!data.isDefault,
        createdAt: new Date()
      };
      
      await setDoc(doc(addressesRef), newAddress);
      
      // If this is set as default, update other addresses
      if (newAddress.isDefault) {
        const promises = addresses
          .filter(address => address.isDefault)
          .map(address => {
            const addressRef = doc(db, 'addresses', address.id);
            return updateDoc(addressRef, { isDefault: false });
          });
        
        await Promise.all(promises);
      }
      
      toast({
        title: "Address Added",
        description: "Your new address has been saved."
      });
      
      reset();
      setIsAddingNew(false);
      fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add your address. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    setIsLoading(true);
    try {
      const addressRef = doc(db, 'addresses', id);
      await deleteDoc(addressRef);
      
      toast({
        title: "Address Deleted",
        description: "Your address has been deleted."
      });
      
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete your address. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setAsDefault = async (id: string) => {
    setIsLoading(true);
    try {
      // Update the selected address to be default
      const addressRef = doc(db, 'addresses', id);
      await updateDoc(addressRef, { isDefault: true });
      
      // Update other addresses to not be default
      const promises = addresses
        .filter(address => address.id !== id && address.isDefault)
        .map(address => {
          const otherAddressRef = doc(db, 'addresses', address.id);
          return updateDoc(otherAddressRef, { isDefault: false });
        });
      
      await Promise.all(promises);
      
      toast({
        title: "Default Changed",
        description: "Your default address has been updated."
      });
      
      fetchAddresses();
    } catch (error) {
      console.error("Error updating default address:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update your default address. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6">
        <p>Please sign in to manage your addresses.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Addresses</h2>
        {!isAddingNew && (
          <Button onClick={() => setIsAddingNew(true)} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add New Address
          </Button>
        )}
      </div>

      {isAddingNew && (
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Address Title</Label>
                <Input
                  id="title"
                  placeholder="Home, Office, etc."
                  {...register("title", { required: true })}
                />
                {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Full Name"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  placeholder="Street address, P.O. box"
                  {...register("addressLine1", { required: true })}
                />
                {errors.addressLine1 && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  {...register("addressLine2")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  {...register("city", { required: true })}
                />
                {errors.city && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="State"
                  {...register("state", { required: true })}
                />
                {errors.state && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Postal Code"
                  {...register("postalCode", { required: true })}
                />
                {errors.postalCode && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Phone Number"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...register("isDefault")}
                  className="rounded border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                />
                <Label htmlFor="isDefault" className="cursor-pointer">
                  Set as default address
                </Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsAddingNew(false);
                  reset();
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Address"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {isLoading && !isAddingNew ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <Home className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-4 text-gray-500">You don't have any saved addresses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={`p-4 ${address.isDefault ? 'border-primary' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className="font-medium">{address.title}</span>
                  {address.isDefault && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(address.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-sm space-y-1">
                <p>{address.fullName}</p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.phoneNumber}</p>
              </div>
              {!address.isDefault && (
                <Button
                  onClick={() => setAsDefault(address.id)}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Set as Default
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
