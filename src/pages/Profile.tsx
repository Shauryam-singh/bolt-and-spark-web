
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import UserProfile from '@/components/profile/UserProfile';
import OrderHistory from '@/components/profile/OrderHistory';
import Addresses from '@/components/profile/Addresses';
import WishList from '@/components/profile/WishList';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>
          <TabsContent value="addresses">
            <Addresses />
          </TabsContent>
          <TabsContent value="wishlist">
            <WishList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
