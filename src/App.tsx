
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Electrical from "./pages/Electrical";
import Fasteners from "./pages/Fasteners";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminSettings from "./pages/AdminSettings";
import AdminProductEdit from "./pages/AdminProductEdit";
import { AuthProvider } from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/electrical" element={<Electrical />} />
          <Route path="/fasteners" element={<Fasteners />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/electrical/:id" element={<ProductDetails />} />
          <Route path="/fasteners/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/products/:id" element={<AdminProductEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
