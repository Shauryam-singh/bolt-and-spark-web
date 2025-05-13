
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

// Admin email address
const ADMIN_EMAIL = "admin@shayamavenchers.com";

const AdminAnalytics = () => {
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
      <AnalyticsDashboard />
    </AdminLayout>
  );
};

export default AdminAnalytics;
