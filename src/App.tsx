
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Auth from "@/pages/Auth";
import Fasteners from "@/pages/Fasteners";
import Electrical from "@/pages/Electrical";
import ProductDetails from "@/pages/ProductDetails";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import AdminProducts from "@/pages/AdminProducts";
import AdminProductEdit from "@/pages/AdminProductEdit";
import AdminCategories from "@/pages/AdminCategories";
import AdminSettings from "@/pages/AdminSettings";
import AdminAnalytics from "@/pages/AdminAnalytics";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/fasteners" element={<Fasteners />} />
            <Route path="/electrical" element={<Electrical />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<AdminProductEdit />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
