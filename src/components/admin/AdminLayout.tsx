import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, 
  Package, 
  Tag, 
  Settings, 
  Home, 
  BarChart2,
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out of the admin panel.",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: <Home size={18} /> },
    { name: "Products", href: "/admin/products", icon: <Package size={18} /> },
    { name: "Categories", href: "/admin/categories", icon: <Tag size={18} /> },
    { name: "Analytics", href: "/admin/analytics", icon: <BarChart2 size={18} /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings size={18} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <h1 className="text-xl font-bold text-industry-900">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">Shayama Venchers</p>
          </div>

          <nav className="flex-1 p-5 space-y-1">
            {sidebarLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-industry-100 text-industry-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 rounded-full p-2 mr-3">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`pl-0 lg:pl-64 min-h-screen transition-all duration-300`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
