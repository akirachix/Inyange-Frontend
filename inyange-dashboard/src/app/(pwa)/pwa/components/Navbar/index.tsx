import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MaterialData } from '../../utils/types';

 
interface NavbarProps {
  itemCount: number;
  cart?: MaterialData[]; // Make cartItems optional
  onAddToCart: (item: MaterialData) => void; // Function to handle adding items
 }
 const Navbar: React.FC<NavbarProps> = ({ itemCount }) => {
  const [storedCartItems, setStoredCartItems] = useState<MaterialData[]>([]); // State to hold cart items
  useEffect(() => {

    const storedItems = localStorage.getItem('cart'); // Use 'cartItems' key
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          console.log('Retrieved cart items:', parsedItems); // Log retrieved items
          setStoredCartItems(parsedItems); // Set state with retrieved items
        }
      } catch (error) {
        console.error('Error parsing cart items from local storage:', error);
        localStorage.removeItem('cart'); // Clear invalid data
      }
    }
  }, []);
 
 
  // Store cart items in local storage when storedCartItems state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(storedCartItems));
  }, [storedCartItems]);
 
 
 

// const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center px-6">
      <Link
            href="/pwa/components/Homepage"
            className="mr-4 sm:mr-6 lg:mr-8 mt-5 text-blue-950"
          >
            <FiChevronLeft size={40} className="lg:w-[50px]" />
          </Link>
        
        <Image 
          src="/images/bmLogo.png" 
          alt="BuildMart Logo"
          width={150} 
          height={50} 
          className="w-[150px] sm:w-[200px]" 
        />
      </div>
    
   
       <div className="relative">
       <Link href="/pwa/components/Pages">
         <span className="cursor-pointer">
           <MdOutlineShoppingCart
             className="text-[#263C5A] mr-[50px]"
             size={40}
           />
         </span>
       </Link>
       {itemCount > 0 && (
         <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
           {itemCount}
         </span>
       )}
      
     </div>
    </nav>
  );
};

export default Navbar;