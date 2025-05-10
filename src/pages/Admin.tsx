
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Admin email address - this is the only account that can access the admin panel
const ADMIN_EMAIL = "admin@shayamvenchers.com";

const Admin = () => {
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
      <AdminDashboard />
    </AdminLayout>
  );
};

export default Admin;
