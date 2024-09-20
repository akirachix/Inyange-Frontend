import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ShoppingCart, ClipboardList, CreditCard, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col bg-[#263C5A] h-screen p-6 md:p-12 lg:p-14 space-y-10 md:space-y-14 w-64 md:w-72 lg:w-80">
      <div className="flex items-center space-x-2 mb-6 md:mb-8">
        <Image
          src="/images/bmlogo.png"
          alt="BuildMart Logo"
          width={160}
          height={160}
        />
      </div>

   
      <nav className="flex flex-col space-y-14 text-lg md:text-xl font-bold">
        <Link 
          href="/" 
          className={`flex items-center space-x-4 ${activeLink === '/' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/')}
        >
          <Home className="w-8 h-8 md:w-10 md:h-10" />
          <span>Dashboard</span>
        </Link>

        <Link 
          href="/inventory" 
          className={`flex items-center space-x-4 ${activeLink === '/inventory' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/inventory')}
        >
          <ShoppingCart className="w-8 h-8 md:w-10 md:h-10" />
          <span>Inventory</span>
        </Link>

        <Link 
          href="/orders" 
          className={`flex items-center space-x-4 ${activeLink === '/orders' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/orders')}
        >
          <ClipboardList className="w-8 h-8 md:w-10 md:h-10" />
          <span>Orders</span>
        </Link>

        <Link 
          href="/payments" 
          className={`flex items-center space-x-4 ${activeLink === '/payments' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/payments')}
        >
          <CreditCard className="w-8 h-8 md:w-10 md:h-10" />
          <span>Payments</span>
        </Link>

        <Link 
          href="/logout" 
          className={`flex items-center space-x-4 ${activeLink === '/logout' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/logout')}
        >
          <LogOut className="w-8 h-8 md:w-10 md:h-10" />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
