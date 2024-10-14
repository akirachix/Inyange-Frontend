import Image from 'next/image';
import React from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center px-6">
        <Image 
          src="/images/bmLogo.png" 
          alt="BuildMart Logo"
          width={150} 
          height={50} 
          className="w-[150px] sm:w-[200px]" 
        />
      </div>
    
      <div className="flex items-center px-10 space-x-2">
        <MdOutlineShoppingCart className="text-[#263C5A] cursor-pointer" size={35} />
      </div>
    </nav>
  );
};

export default Navbar;
