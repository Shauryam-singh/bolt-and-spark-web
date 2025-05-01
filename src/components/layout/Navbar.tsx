import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-industry-900">Shayam Venchers</span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-industry-800 hover:text-primary font-medium transition-colors">
            Home
          </Link>

          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('products')}
              className="flex items-center text-industry-800 hover:text-primary font-medium transition-colors"
            >
              Products <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <Link to="/fasteners" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Fasteners
                </Link>
                <Link to="/electrical" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Electrical Components
                </Link>
              </div>
            </div>
          </div>

          <Link to="/about" className="text-industry-800 hover:text-primary font-medium transition-colors">
            About
          </Link>

          <Link to="/contact" className="text-industry-800 hover:text-primary font-medium transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden lg:block">
          {user ? (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/profile")}
              >
                <User className="h-6 w-6" />
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-industry-800">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <div className="flex flex-col space-y-4 p-4">
          <Link to="/" className="text-lg font-medium py-2 border-b" onClick={toggleMenu}>
            Home
          </Link>

          <div>
            <button 
              onClick={() => toggleDropdown('mobileProducts')}
              className="flex justify-between items-center w-full text-lg font-medium py-2 border-b"
            >
              Products <ChevronDown className={`h-5 w-5 transition-transform ${dropdownOpen === 'mobileProducts' ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen === 'mobileProducts' && (
              <div className="pl-4 py-2 space-y-2">
                <Link to="/fasteners" className="block py-1" onClick={toggleMenu}>
                  Fasteners
                </Link>
                <Link to="/electrical" className="block py-1" onClick={toggleMenu}>
                  Electrical Components
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="text-lg font-medium py-2 border-b" onClick={toggleMenu}>
            About
          </Link>

          <Link to="/contact" className="text-lg font-medium py-2 border-b" onClick={toggleMenu}>
            Contact
          </Link>

          {user ? (
            <Button onClick={handleSignOut} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button onClick={() => navigate("/auth")} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
