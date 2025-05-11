
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, Menu, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useMobile } from "@/hooks/use-mobile";
import { useWishlist } from "@/hooks/useWishlist";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isMobile } = useMobile();
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();

  // Handle scroll event for changing navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Content for desktop navbar
  const DesktopNav = () => (
    <div
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4 absolute"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-industry-900">
          Shayam Venchers
        </Link>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <Button
                  variant={location.pathname === "/" ? "default" : "ghost"}
                  className="font-medium"
                >
                  Home
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={
                  location.pathname.includes("/fasteners")
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : ""
                }
              >
                Fasteners
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  <Link
                    to="/fasteners?category=industrial"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">Industrial Fasteners</div>
                    <div className="text-sm text-muted-foreground">
                      High-quality fasteners for industrial applications
                    </div>
                  </Link>
                  <Link
                    to="/fasteners?category=specialty"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">Specialty Fasteners</div>
                    <div className="text-sm text-muted-foreground">
                      Custom and specialized fastening solutions
                    </div>
                  </Link>
                  <Link
                    to="/fasteners?category=marine"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">Marine & Chemical</div>
                    <div className="text-sm text-muted-foreground">
                      Corrosion-resistant and chemical-grade fasteners
                    </div>
                  </Link>
                  <Link
                    to="/fasteners"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">View All Categories</div>
                    <div className="text-sm text-muted-foreground">
                      Browse our complete fastener catalog
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={
                  location.pathname.includes("/electrical")
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : ""
                }
              >
                Electrical
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  <Link
                    to="/electrical?category=switches"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">Switches & Controls</div>
                    <div className="text-sm text-muted-foreground">
                      High-quality electrical control components
                    </div>
                  </Link>
                  <Link
                    to="/electrical?category=wires"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">Wires & Cables</div>
                    <div className="text-sm text-muted-foreground">
                      Premium wiring solutions for all applications
                    </div>
                  </Link>
                  <Link
                    to="/electrical?category=lighting"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">Lighting Solutions</div>
                    <div className="text-sm text-muted-foreground">
                      Efficient and reliable lighting products
                    </div>
                  </Link>
                  <Link
                    to="/electrical"
                    className="block p-3 hover:bg-muted rounded-md"
                  >
                    <div className="font-medium">View All Categories</div>
                    <div className="text-sm text-muted-foreground">
                      Browse our complete electrical catalog
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <Button
                  variant={location.pathname === "/about" ? "default" : "ghost"}
                  className="font-medium"
                >
                  About Us
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <Button
                  variant={
                    location.pathname === "/contact" ? "default" : "ghost"
                  }
                  className="font-medium"
                >
                  Contact
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className={wishlistItems.length > 0 ? "text-red-500" : ""} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>
          
          <CartDrawer />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full ml-2"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                {user.email === "admin@example.com" && (
                  <Link to="/admin">
                    <DropdownMenuItem>Admin Panel</DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full ml-2"
              >
                <User />
              </Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="p-2 hover:bg-muted rounded-md">
                  Home
                </Link>
                <Link to="/fasteners" className="p-2 hover:bg-muted rounded-md">
                  Fasteners
                </Link>
                <Link to="/electrical" className="p-2 hover:bg-muted rounded-md">
                  Electrical
                </Link>
                <Link to="/about" className="p-2 hover:bg-muted rounded-md">
                  About Us
                </Link>
                <Link to="/contact" className="p-2 hover:bg-muted rounded-md">
                  Contact
                </Link>
                <Link to="/wishlist" className="p-2 hover:bg-muted rounded-md">
                  Wishlist
                </Link>
                {user ? (
                  <>
                    <Link to="/profile" className="p-2 hover:bg-muted rounded-md">
                      Profile
                    </Link>
                    {user.email === "admin@example.com" && (
                      <Link to="/admin" className="p-2 hover:bg-muted rounded-md">
                        Admin Panel
                      </Link>
                    )}
                    <Button onClick={logout} variant="destructive">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button>Sign In</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );

  return <DesktopNav />;
};

export default Navbar;
