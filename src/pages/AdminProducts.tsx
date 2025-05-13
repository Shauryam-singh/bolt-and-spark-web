
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductsManager from '@/components/admin/ProductsManager';

// Admin email address
const ADMIN_EMAIL = "admin@shayamavenchers.com";

const AdminProducts = () => {
  const { user } = useAuth();
  
  // Only allow access if the user is logged in and has the admin email
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <AdminLayout>
      <ProductsManager />
    </AdminLayout>
  );
};

export default AdminProducts;
