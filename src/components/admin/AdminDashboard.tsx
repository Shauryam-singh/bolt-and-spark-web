
import React, { useEffect, useState } from 'react';
import { collection, getDocs, getCountFromServer, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package, FileText, Users, Briefcase, BarChart2, PieChart, TrendingUp, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    fasteners: 0,
    electrical: 0,
    categories: 0,
    pendingOrders: 0,
    users: 0
  });
  
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get products count
        const productsSnapshot = await getCountFromServer(collection(db, 'products'));
        const productsCount = productsSnapshot.data().count;
        
        // Get product counts by type
        const fastenersSnapshot = await getCountFromServer(
          query(collection(db, 'products'), where('categoryType', '==', 'fasteners'))
        );
        const fastenersCount = fastenersSnapshot.data().count;
        
        const electricalSnapshot = await getCountFromServer(
          query(collection(db, 'products'), where('categoryType', '==', 'electrical'))
        );
        const electricalCount = electricalSnapshot.data().count;
        
        // Get categories count
        const categoriesSnapshot = await getCountFromServer(collection(db, 'categories'));
        const categoriesCount = categoriesSnapshot.data().count;
        
        // Get users count (if you have users collection)
        const usersSnapshot = await getCountFromServer(collection(db, 'users'));
        const usersCount = usersSnapshot.data().count;
        
        // Get orders count (if you have orders collection)
        const ordersSnapshot = await getCountFromServer(collection(db, 'orders'));
        const ordersCount = ordersSnapshot.data().count;
        
        // Get recent products
        const recentProductsQuery = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentProductsSnapshot = await getDocs(recentProductsQuery);
        const recentProductsList = recentProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        
        setRecentProducts(recentProductsList);
        
        setStats({
          products: productsCount,
          fasteners: fastenersCount,
          electrical: electricalCount,
          categories: categoriesCount,
          users: usersCount,
          pendingOrders: ordersCount
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // If collections don't exist yet, set default values
        setStats({
          products: 0,
          fasteners: 0,
          electrical: 0,
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

  const productTypeData = [
    { name: 'Fasteners', value: stats.fasteners },
    { name: 'Electrical', value: stats.electrical },
  ];

  // Sample data for activity chart - in a real app, this would come from your database
  const activityData = [
    { name: 'Mon', products: 4, categories: 2 },
    { name: 'Tue', products: 3, categories: 1 },
    { name: 'Wed', products: 2, categories: 3 },
    { name: 'Thu', products: 6, categories: 2 },
    { name: 'Fri', products: 8, categories: 4 },
    { name: 'Sat', products: 3, categories: 1 },
    { name: 'Sun', products: 2, categories: 0 },
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-industry-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome to the Shayam Venchers Admin Panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-electric-600" />
                Activity Overview
              </CardTitle>
              <CardDescription>Weekly product and category activity</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="products" fill="#8884d8" />
                  <Bar dataKey="categories" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-electric-600" />
                Product Distribution
              </CardTitle>
              <CardDescription>Breakdown by product type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPie>
                  <Pie
                    data={productTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-electric-600" />
                Recently Added Products
              </CardTitle>
              <CardDescription>Latest additions to your catalog</CardDescription>
            </CardHeader>
            <CardContent>
              {recentProducts.length > 0 ? (
                <div className="space-y-4">
                  {recentProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.categoryType === 'fasteners' ? 'Fasteners' : 'Electrical'} • 
                          {typeof product.createdAt === 'object' && product.createdAt.toLocaleDateString
                            ? product.createdAt.toLocaleDateString()
                            : 'Unknown date'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Package size={24} className="text-gray-400 mb-2" />
                  <p className="text-gray-500">No recent products</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/admin/products/new')}
                  >
                    <Plus size={16} className="mr-1" />
                    Add Product
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center h-20"
                  onClick={() => navigate('/admin/products/new')}
                >
                  <div className="flex flex-col items-center">
                    <Package className="h-6 w-6 mb-1" />
                    <span>Add New Product</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center h-20"
                  onClick={() => navigate('/admin/categories')}
                >
                  <div className="flex flex-col items-center">
                    <FileText className="h-6 w-6 mb-1" />
                    <span>Manage Categories</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
