"use client";

import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
  
      <Navbar itemCount={0} onAddToCart={function (): void {
        throw new Error('Function not implemented.');
      } } />

      <div className="flex flex-1">

        <Sidebar/>
      
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
