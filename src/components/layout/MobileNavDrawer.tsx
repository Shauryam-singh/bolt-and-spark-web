
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Package, Settings, Menu, User, Home, Info, Phone, Wrench, PlugZap, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const MobileNavDrawer = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth(); // Removed signOut for now
  const isAdmin = user?.email === 'admin@hsindustries.com';

  const mainNavItems: NavItem[] = [
    { label: 'Home', href: '/', icon: <Home size={20} /> },
    { label: 'About', href: '/about', icon: <Info size={20} /> },
    { label: 'Fasteners', href: '/fasteners', icon: <Wrench size={20} /> },
    { label: 'Electrical', href: '/electrical', icon: <PlugZap size={20} /> },
    { label: 'Contact', href: '/contact', icon: <Phone size={20} /> },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Admin Dashboard', href: '/admin', icon: <Settings size={20} /> },
    { label: 'Manage Products', href: '/admin/products', icon: <Package size={20} /> },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">HS Industries</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Main navigation */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 px-1">Navigation</h3>
            <div className="space-y-1">
              {mainNavItems.map((item, index) => (
                <SheetClose asChild key={index}>
                  <Link to={item.href}>
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.label}
                    </motion.div>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>

          {/* Admin section */}
          {isAdmin && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 px-1">Admin</h3>
              <div className="space-y-1">
                {adminNavItems.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <Link to={item.href}>
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <span className="mr-3 text-gray-500">{item.icon}</span>
                        {item.label}
                      </motion.div>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          )}

          {/* Account section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 px-1">Account</h3>
            <div className="space-y-1">
              {user ? (
                <>
                  <SheetClose asChild>
                    <Link to="/profile">
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <User className="mr-3 h-5 w-5 text-gray-500" />
                        My Profile
                      </motion.div>
                    </Link>
                  </SheetClose>
                  {/* No logout button for now if signOut isn't available */}
                </>
              ) : (
                <SheetClose asChild>
                  <Link to="/auth">
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <User className="mr-3 h-5 w-5 text-gray-500" />
                      Sign In
                    </motion.div>
                  </Link>
                </SheetClose>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavDrawer;
