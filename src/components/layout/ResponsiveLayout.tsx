
import React from 'react';
import Footer from './Footer';
import MobileAwareNavbar from './MobileAwareNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileAwareNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default ResponsiveLayout;
