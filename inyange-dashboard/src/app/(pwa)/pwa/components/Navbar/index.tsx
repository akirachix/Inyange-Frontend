import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronLeft} from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MaterialData } from "../../utils/types";


interface NavbarProps {
 itemCount: number;
 cart?: MaterialData[];
 onAddToCart: (item: MaterialData) => void;
}
const Navbar: React.FC<NavbarProps> = ({ itemCount }) => {
 const [storedCartItems, setStoredCartItems] = useState<MaterialData[]>([]);
 useEffect(() => {
   const storedItems = localStorage.getItem("cart"); // Use 'cartItems' key
   if (storedItems) {
     try {
       const parsedItems = JSON.parse(storedItems);
       if (Array.isArray(parsedItems)) {
         console.log("Retrieved cart items:", parsedItems); // Log retrieved items
         setStoredCartItems(parsedItems); // Set state with retrieved items
       }
     } catch (error) {
       console.error("Error parsing cart items from local storage:", error);
       localStorage.removeItem("cart"); // Clear invalid data
     }
   }
 }, []);


 // Store cart items in local storage when storedCartItems state changes
 useEffect(() => {
   localStorage.setItem("cart", JSON.stringify(storedCartItems));
 }, [storedCartItems]);


 return (
   <nav className="flex flex-row justify-between items-center w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
     <div className="flex items-center px-6">
       <Link
         href="/pwa/homepage"
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

      <div className="flex items-center gap-4">

    
     <div className="relative">


       <Link
         href="/pwa/pages"
         className="relative mt-6 mr-20 sm:ml-6 lg:ml-[100%] xl:ml-[100%] md:ml-[70%]"
       >
         <MdOutlineShoppingCart
           size={36}
           className="sm:w-8 sm:h-8 lg:w-14 lg:h-14 xl:size-14 md:size-14 mt-6"
         />
       
       </Link>
       {itemCount > 0 && (
         <span className="absolute -top-[-35px] -left-[-30px] bg-yellow-500 text-white rounded-full w-14 h-10 sm:w-7 sm:h-7 lg:w-9 lg:h-9 flex items-center justify-center text-[15px] sm:text-[14px] lg:text-[18px]">
           {itemCount}
         </span>
       )}
     </div>

     </div>
   </nav>
 );
};


export default Navbar;

