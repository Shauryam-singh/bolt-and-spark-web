
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavDrawer from './MobileNavDrawer';

const MobileAwareNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && <MobileNavDrawer />}

            <Link to="/" className="text-2xl font-bold text-industry-900 mr-8">
              Shyama <span className="text-electric-600">Ventures</span>
            </Link>

            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-1">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/about', label: 'About' },
                  { path: '/fasteners', label: 'Fasteners' },
                  { path: '/electrical', label: 'Electrical' },
                  { path: '/contact', label: 'Contact' },
                ].map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive(item.path) ? 'default' : 'ghost'}
                      className={isActive(item.path) ? 'bg-electric-600 text-white' : ''}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isMobile && (
              <>
                {user ? (
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link to="/profile">
                      <Button variant="ghost" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link to="/auth">
                      <Button variant="ghost" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </>
            )}

            {!isMobile && user && user.email === 'admin@shyamaventures.com' && (
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link to="/admin">
                  <Button className="bg-industry-700 hover:bg-industry-800">
                    Admin
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileAwareNavbar;
