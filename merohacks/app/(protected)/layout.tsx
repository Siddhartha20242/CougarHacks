import React from 'react';
import Navbar from './home/Navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center bg-blue-100">
        <Navbar/>
      <main className="flex-grow w-full max-w-7xl py-12 px-4 sm:px-6 lg:px-8 mt-16">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;