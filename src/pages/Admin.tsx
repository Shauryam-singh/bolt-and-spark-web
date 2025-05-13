
import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/services/productService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Package, Tag, Database, Settings, Presentation, ArrowRight } from 'lucide-react';

// Admin email address - this is the only account that can access the admin panel
const ADMIN_EMAIL = "admin@shayamavenchers.com";

interface AdminDashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: number | string;
  linkTo: string;
  linkText: string;
}

const AdminDashboardCard: React.FC<AdminDashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  count, 
  linkTo,
  linkText 
}) => {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-industry-100 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {count !== undefined && (
          <div className="text-3xl font-bold mb-2">{count}</div>
        )}
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={linkTo} className="w-full">
          <Button variant="outline" className="w-full justify-between group">
            {linkText}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Admin = () => {
  const { user } = useAuth();
  const [productCount, setProductCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [fastenerCount, setFastenerCount] = useState<number>(0);
  const [electricalCount, setElectricalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  // Only allow access if the user is logged in and has the admin email
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get products
        const products = await getAllProducts();
        setProductCount(products.length);
        
        // Count by type
        const fasteners = products.filter(p => p.categoryType === 'fasteners');
        const electrical = products.filter(p => p.categoryType === 'electrical');
        setFastenerCount(fasteners.length);
        setElectricalCount(electrical.length);
        
        // Get categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        setCategoryCount(categoriesSnapshot.size);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-industry-900">Dashboard</h2>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mt-1"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-9 w-full bg-gray-200 animate-pulse rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminDashboardCard
              title="Total Products"
              description="Total number of products in your inventory."
              icon={<Package size={20} className="text-industry-700" />}
              count={productCount}
              linkTo="/admin/products"
              linkText="Manage Products"
            />
            <AdminDashboardCard
              title="Categories"
              description="Total categories for product organization."
              icon={<Tag size={20} className="text-industry-700" />}
              count={categoryCount}
              linkTo="/admin/categories"
              linkText="Manage Categories"
            />
            <AdminDashboardCard
              title="Fasteners"
              description="Total fastener products in your inventory."
              icon={<Database size={20} className="text-industry-700" />}
              count={fastenerCount}
              linkTo="/fasteners"
              linkText="View Fasteners Page"
            />
            <AdminDashboardCard
              title="Electrical"
              description="Total electrical products in your inventory."
              icon={<Presentation size={20} className="text-industry-700" />}
              count={electricalCount}
              linkTo="/electrical"
              linkText="View Electrical Page"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for managing your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Link to="/admin/products/new">
                  <Button className="w-full justify-start bg-electric-600 hover:bg-electric-700">
                    <Package className="mr-2 h-4 w-4" />
                    Add New Product
                  </Button>
                </Link>
                <Link to="/admin/categories">
                  <Button variant="outline" className="w-full justify-start">
                    <Tag className="mr-2 h-4 w-4" />
                    Manage Categories
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Product Stats</CardTitle>
              <CardDescription>Overview of your product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fasteners</span>
                  <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ 
                        width: `${productCount > 0 ? (fastenerCount / productCount * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{fastenerCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Electrical</span>
                  <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ 
                        width: `${productCount > 0 ? (electricalCount / productCount * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{electricalCount}</span>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                  <span className="font-medium">Total Products</span>
                  <span className="text-xl font-bold">{productCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
