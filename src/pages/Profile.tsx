import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import UserProfile from '@/components/profile/UserProfile';
import WishList from '@/components/profile/WishList';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (user === undefined) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold m-6 text-center sm:text-left">My Account</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 flex flex-wrap gap-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          <TabsContent value="wishlist">
            <WishList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
