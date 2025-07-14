import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;