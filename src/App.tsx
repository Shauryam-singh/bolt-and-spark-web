
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth"; // Using Firebase Auth Provider
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Fasteners from "./pages/Fasteners";
import Electrical from "./pages/Electrical";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
// Import Admin pages
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/fasteners" element={<Fasteners />} />
            <Route path="/electrical" element={<Electrical />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/fasteners/:id" element={<ProductDetails />} />
            <Route path="/electrical/:id" element={<ProductDetails />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<AdminProductEdit />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
