
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import MobileNavDrawer from './MobileNavDrawer';

const MobileAwareNavbar = () => {
  const cart = useCart();
  const cartItemsCount = cart && cart.items ? cart.items.length : 0;

  return (
    <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <MobileNavDrawer />
      </Sheet>
      
      <Link to="/" className="text-xl font-bold text-industry-800">
        Shayama Venchers
      </Link>
      
      <Link to="/cart">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-electric-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default MobileAwareNavbar;
