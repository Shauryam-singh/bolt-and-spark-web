
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import MobileNavDrawer from './MobileNavDrawer';

const MobileAwareNavbar = () => {
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
      
      <div className="w-10"></div> {/* Empty div for balance */}
    </div>
  );
};

export default MobileAwareNavbar;
