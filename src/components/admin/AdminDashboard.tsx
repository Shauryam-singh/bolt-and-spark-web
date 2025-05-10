import React, { useEffect, useState } from 'react';
import { collection, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FileText, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    pendingOrders: 0,
    users: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get products count
        const productsSnapshot = await getCountFromServer(collection(db, 'products'));
        const productsCount = productsSnapshot.data().count;
        
        // Get categories count
        const categoriesSnapshot = await getCountFromServer(collection(db, 'categories'));
        const categoriesCount = categoriesSnapshot.data().count;
        
        // Get users count (if you have users collection)
        const usersSnapshot = await getCountFromServer(collection(db, 'users'));
        const usersCount = usersSnapshot.data().count;
        
        // Get orders count (if you have orders collection)
        const ordersSnapshot = await getCountFromServer(collection(db, 'orders'));
        const ordersCount = ordersSnapshot.data().count;
        
        setStats({
          products: productsCount,
          categories: categoriesCount,
          users: usersCount,
          pendingOrders: ordersCount
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // If collections don't exist yet, set default values
        setStats({
          products: 0,
          categories: 0,
          pendingOrders: 0,
          users: 0
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const statItems = [
    { title: 'Total Products', value: stats.products, icon: <Package className="h-8 w-8 text-blue-500" /> },
    { title: 'Categories', value: stats.categories, icon: <FileText className="h-8 w-8 text-green-500" /> },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: <Briefcase className="h-8 w-8 text-amber-500" /> },
    { title: 'Users', value: stats.users, icon: <Users className="h-8 w-8 text-purple-500" /> }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700 mx-auto"></div>
          <p className="mt-4 text-industry-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-industry-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome to the Shayam Venchers Admin Panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-center h-20"
                onClick={() => window.location.href = '/admin/products/new'}
              >
                <div className="flex flex-col items-center">
                  <Package className="h-6 w-6 mb-1" />
                  <span>Add New Product</span>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center h-20"
                onClick={() => window.location.href = '/admin/categories/new'}
              >
                <div className="flex flex-col items-center">
                  <FileText className="h-6 w-6 mb-1" />
                  <span>Add New Category</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Database</p>
                <p>Firebase Firestore</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Authentication</p>
                <p>Firebase Auth</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Storage</p>
                <p>Firebase Storage</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Admin Email</p>
                <p>admin@shayamvenchers.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
