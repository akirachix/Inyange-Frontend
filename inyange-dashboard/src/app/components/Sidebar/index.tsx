// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Home, ShoppingCart, ClipboardList, CreditCard, LogOut } from 'lucide-react';

// const Sidebar = () => {
//   const [activeLink, setActiveLink] = useState('');

//   const handleLinkClick = (link: string) => {
//     setActiveLink(link);
//   };

//   return (
//     <div className="flex flex-col bg-[#263C5A] h-screen p-6 md:p-12 lg:p-14 space-y-10 md:space-y-14 w-64 md:w-72 lg:w-80">
//       <div className="flex items-center space-x-2 mb-6 md:mb-8">
//         <Image
//           src="/images/bmlogo.png"
//           alt="BuildMart Logo"
//           width={200}
//           height={200}
//         />
//       </div>

   
//       <nav className="flex flex-col space-y-10 text-lg md:text-xl font-bold">
//         <Link 
//           href="/" 
//           className={`flex items-center space-x-4 ${activeLink === '/' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
//           onClick={() => handleLinkClick('/')}
//         >
//           <Home className="w-8 h-8 md:w-10 md:h-10" />
//           <span>Dashboard</span>
//         </Link>

//         <Link 
//           href="components/Inventory" 
//           className={`flex items-center space-x-4 ${activeLink === '/Inventory' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
//           onClick={() => handleLinkClick('/Inventory')}
//         >
//           <ShoppingCart className="w-8 h-8 md:w-10 md:h-10" />
//           <span>Inventory</span>
//         </Link>

//         <Link 
//           href="/orders" 
//           className={`flex items-center space-x-4 ${activeLink === '/orders' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
//           onClick={() => handleLinkClick('/orders')}
//         >
//           <ClipboardList className="w-8 h-8 md:w-10 md:h-10" />
//           <span>Orders</span>
//         </Link>

//         <Link 
//           href="/payments" 
//           className={`flex items-center space-x-4 ${activeLink === '/payments' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
//           onClick={() => handleLinkClick('/payments')}
//         >
//           <CreditCard className="w-8 h-8 md:w-10 md:h-10" />
//           <span>Payments</span>
//         </Link>

//         <Link 
//           href="/logout" 
//           className={`flex items-center space-x-4 ${activeLink === '/logout' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
//           onClick={() => handleLinkClick('/logout')}
//         >
//           <LogOut className="w-8 h-8 md:w-10 md:h-10" />
//           <span>Logout</span>
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuHome, LuClipboardList, LuCreditCard } from "react-icons/lu";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col bg-[#263C5A] h-screen p-6 md:p-12 lg:p-14 space-y-10 md:space-y-14 w-64 md:w-72 lg:w-80">
      <div className="flex items-center space-x-2 mb-6 md:mb-8">
        <Image
          src="/images/bmlogo.png"
          alt="BuildMart Logo"
          width={200}
          height={200}
        />
      </div>

      <nav className="flex flex-col space-y-10 text-lg md:text-xl font-bold">
        <Link 
          href="/" 
          className={`flex items-center space-x-4 ${activeLink === '/' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/')}
        >
          <LuHome className="w-8 h-8 md:w-10 md:h-10" />
          <span>Dashboard</span>
        </Link>

        <Link 
          href="components/Inventory" 
          className={`flex items-center space-x-4 ${activeLink === '/Inventory' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/Inventory')}
        >
          <FiShoppingCart className="w-8 h-8 md:w-10 md:h-10" />
          <span>Inventory</span>
        </Link>

        <Link 
          href="/Orders" 
          className={`flex items-center space-x-4 ${activeLink === '/Orders' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/Orders')}
        >
          <LuClipboardList className="w-8 h-8 md:w-10 md:h-10" />
          <span>Orders</span>
        </Link>

        <Link 
          href="/Payments" 
          className={`flex items-center space-x-4 ${activeLink === '/Payments' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/Payments')}
        >
          <LuCreditCard className="w-8 h-8 md:w-10 md:h-10" />
          <span>Payments</span>
        </Link>

        <Link 
          href="/Logout" 
          className={`flex items-center space-x-4 ${activeLink === '/Logout' ? 'text-[#F8B612]' : 'text-white'} hover:text-[#F8B612] transition-all duration-300`} 
          onClick={() => handleLinkClick('/Logout')}
        >
          <FiLogOut className="w-8 h-8 md:w-10 md:h-10" />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;