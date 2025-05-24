
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import DataMigration from '@/components/admin/DataMigration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Admin email address
const ADMIN_EMAIL = "admin@shyamaventures.com";

const AdminSettings = () => {
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
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-industry-900">Settings</h2>
          <p className="text-gray-600 mt-2">Manage application settings and data</p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
            <TabsTrigger value="admin">Admin Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage general application settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  No general settings available at this time.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Migrate and manage application data</CardDescription>
              </CardHeader>
              <CardContent>
                <DataMigration />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Access</CardTitle>
                <CardDescription>Administrator account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Admin Account</h3>
                    <p className="text-sm text-gray-500">The following email has admin access to the application</p>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Email</div>
                        <div className="col-span-2">{ADMIN_EMAIL}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Access Level</div>
                        <div className="col-span-2">Full Administrator</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Status</div>
                        <div className="col-span-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
