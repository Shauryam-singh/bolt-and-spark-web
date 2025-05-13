
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, Package, Zap, Info, Phone, User, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const MobileNavDrawer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cart = useCart();
  const cartItemsCount = cart && cart.items ? cart.items.length : 0;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <SheetContent side="left" className="w-[250px] sm:w-[300px]">
      <SheetHeader className="pb-4">
        <SheetTitle className="text-industry-800">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-4">
        <SheetClose asChild>
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/fasteners">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-5 w-5" />
              Fasteners
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/electrical">
            <Button variant="ghost" className="w-full justify-start">
              <Zap className="mr-2 h-5 w-5" />
              Electrical
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/about">
            <Button variant="ghost" className="w-full justify-start">
              <Info className="mr-2 h-5 w-5" />
              About
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/contact">
            <Button variant="ghost" className="w-full justify-start">
              <Phone className="mr-2 h-5 w-5" />
              Contact
            </Button>
          </Link>
        </SheetClose>
        
        <Separator />
        
        <SheetClose asChild>
          <Link to="/cart">
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Cart {cartItemsCount > 0 && <span className="ml-2 bg-electric-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemsCount}</span>}
            </Button>
          </Link>
        </SheetClose>
        
        {user ? (
          <>
            <SheetClose asChild>
              <Link to="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>
              </Link>
            </SheetClose>
            <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </>
        ) : (
          <SheetClose asChild>
            <Link to="/auth">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-5 w-5" />
                Login / Register
              </Button>
            </Link>
          </SheetClose>
        )}
      </div>
    </SheetContent>
  );
};

export default MobileNavDrawer;
