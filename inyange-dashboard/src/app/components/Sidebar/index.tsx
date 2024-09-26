import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuHome, LuClipboardList, LuCreditCard } from "react-icons/lu";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col bg-[#263C5A] h-screen p-6 md:p-8 lg:p-10 w-64 md:w-72 lg:w-70 justify-between items-center">
      
      <div>
        <div className="flex items-center px-1 space-x-2 mb-24 mt-6">  
          <Image
            src="/images/bmlogo.png"
            alt="BuildMart Logo"
            width={170} 
            height={170}
          />
        </div>

      
        <nav className="flex flex-col px-4 space-y-10 text-base md:text-lg font-medium">
          <Link 
            href="/" 
            className={`flex items-center space-x-4 ${activeLink === '/' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
            onClick={() => handleLinkClick('/')}
          >
            <LuHome className="w-6 h-6 md:w-8 md:h-8" />
            <span>Dashboard</span>
          </Link>

          <Link 
            href="/inventory" 
            className={`flex items-center space-x-4 ${activeLink === '/inventory' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
            onClick={() => handleLinkClick('/inventory')}
          >
            <FiShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
            <span>Inventory</span>
          </Link>

          <Link 
            href="/orders" 
            className={`flex items-center space-x-4 ${activeLink === '/orders' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
            onClick={() => handleLinkClick('/orders')}
          >
            <LuClipboardList className="w-6 h-6 md:w-8 md:h-8" />
            <span>Orders</span>
          </Link>

          <Link 
            href="/payments" 
            className={`flex items-center space-x-4 ${activeLink === '/payments' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
            onClick={() => handleLinkClick('/payments')}
          >
            <LuCreditCard className="w-6 h-6 md:w-8 md:h-8" />
            <span>Payments</span>
          </Link>
        </nav>
      </div>


      <div className="w-full px-8 mb-6">
              <Link 
                href="/logout" 
                className={`flex items-center space-x-4 py-2 ${activeLink === '/logout' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300 text-base md:text-lg font-medium`} 
                onClick={() => handleLinkClick('/logout')}
              >
                <FiLogOut className="w-6 h-6 md:w-8 md:h-8" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
  );
};

export default Sidebar;
