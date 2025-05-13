
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart,
  BarChart2, 
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Calendar
} from 'lucide-react';
import { 
  getProductStats, 
  getInventoryValue, 
  getSalesAnalytics 
} from '@/services/productService';

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [stats, setStats] = useState({
    totalProducts: 0,
    fasteners: 0,
    electrical: 0,
    newProducts: 0,
    featuredProducts: 0
  });
  const [inventoryValue, setInventoryValue] = useState({
    totalValue: 0,
    fastenersValue: 0,
    electricalValue: 0
  });
  const [salesData, setSalesData] = useState({
    monthly: [],
    categoryBreakdown: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productStats = await getProductStats();
        const inventory = await getInventoryValue();
        const sales = await getSalesAnalytics();
        
        setStats(productStats);
        setInventoryValue(inventory);
        setSalesData(sales);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Mock data for order trends
  const orderTrends = [
    { date: '2023-01', orders: 45 },
    { date: '2023-02', orders: 52 },
    { date: '2023-03', orders: 48 },
    { date: '2023-04', orders: 61 },
    { date: '2023-05', orders: 55 },
    { date: '2023-06', orders: 67 },
    { date: '2023-07', orders: 71 },
    { date: '2023-08', orders: 80 },
    { date: '2023-09', orders: 75 },
    { date: '2023-10', orders: 85 },
    { date: '2023-11', orders: 91 },
    { date: '2023-12', orders: 95 }
  ];
  
  // Mock data for customer growth
  const customerGrowth = [
    { month: 'Jan', customers: 120 },
    { month: 'Feb', customers: 145 },
    { month: 'Mar', customers: 162 },
    { month: 'Apr', customers: 189 },
    { month: 'May', customers: 210 },
    { month: 'Jun', customers: 234 },
    { month: 'Jul', customers: 252 },
    { month: 'Aug', customers: 270 },
    { month: 'Sep', customers: 294 },
    { month: 'Oct', customers: 315 },
    { month: 'Nov', customers: 342 },
    { month: 'Dec', customers: 375 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700 mx-auto"></div>
          <p className="mt-4 text-industry-700">Loading analytics data...</p>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-industry-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Monitor your business performance and make data-driven decisions</p>
        </div>
        <Tabs defaultValue="daily" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="daily" onClick={() => setTimeframe('daily')}>
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" onClick={() => setTimeframe('weekly')}>
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" onClick={() => setTimeframe('monthly')}>
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" onClick={() => setTimeframe('yearly')}>
              Yearly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-8 w-8 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(120750).toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12.5% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">823</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +4.3% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-8 w-8 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500">
                <span className="flex">
                  Fasteners: {stats.fasteners} | Electrical: {stats.electrical}
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-8 w-8 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">375</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8.7% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChartIcon className="mr-2 h-5 w-5 text-electric-600" />
                Sales Overview
              </CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData.monthly}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                  <Legend />
                  <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
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
                <PieChartIcon className="mr-2 h-5 w-5 text-electric-600" />
                Sales by Category
              </CardTitle>
              <CardDescription>Distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesData.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
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
                <BarChart2 className="mr-2 h-5 w-5 text-electric-600" />
                Top Products
              </CardTitle>
              <CardDescription>Best performing products by sales</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData.topProducts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => [`${value} units`, 'Sales']} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
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
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-electric-600" />
                Order Trends
              </CardTitle>
              <CardDescription>Monthly order volume</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} orders`, 'Volume']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#82ca9d" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Value</CardTitle>
          <CardDescription>Current inventory value by category</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Fasteners', value: inventoryValue.fastenersValue },
                { name: 'Electrical', value: inventoryValue.electricalValue },
                { name: 'Total', value: inventoryValue.totalValue }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
              <Legend />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsDashboard;
