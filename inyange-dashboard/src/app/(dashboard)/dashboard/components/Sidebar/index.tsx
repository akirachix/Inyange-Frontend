import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ShoppingCart, LogOut } from "lucide-react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6 md:mb-8 mt-[50px] ml-[15px] nh:mt-[30px] nh:ml-[10px] nhm:mt-[40px] nhm:ml-[12px]">
        <Image
          src="/images/bmlogo.png"
          alt="B<uildMart Logo"
          width={200}
          height={200}
          className="ml-[50px] mt-[50px] nh:ml-[30px] nh:mt-[30px] nh:w-[150px] nh:h-[150px] nhm:ml-[40px] nhm:mt-[40px] nhm:w-[175px] nhm:h-[175px]"
        />
      </div>

      <nav className="flex flex-col space-y-14 mt-[130px] ml-[70px] font-bold nh:mt-[80px] nh:ml-[40px] nh:space-y-10 nhm:mt-[100px] nhm:ml-[50px] nhm:space-y-12">
        <Link
          href="/dashboard/dashboard"
          className={`flex items-center space-x-4 ${
            activeLink === "/" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/dashboard")}
        >
          <Home className="w-8 h-8 md:w-10 md:h-10 nh:w-7 nh:h-7 nhm:w-9 nhm:h-9" />
          <span className="text-[22px] nh:text-[18px] nhm:text-[20px]">Dashboard</span>
        </Link>

        <Link
          href="/dashboard/inventory"
          className={`flex items-center space-x-4 ${
            activeLink === "/inventory" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/inventory")}
        >
          <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 mt-[10px] nh:w-7 nh:h-7 nh:mt-[5px] nhm:w-9 nhm:h-9 nhm:mt-[7px]" />
          <span className="text-[22px] mt-[10px] nh:text-[18px] nh:mt-[5px] nhm:text-[20px] nhm:mt-[7px]">Inventory</span>
        </Link>

        {/* <Link
          href="/dashboard/order"
          className={`flex items-center space-x-4 ${
            activeLink === "/order" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/order")}
        >
          <ClipboardList className="w-8 h-8 md:w-10 md:h-10 mt-[10px] nh:w-7 nh:h-7 nh:mt-[5px] nhm:w-9 nhm:h-9 nhm:mt-[7px]" />
          <span className="text-[22px] mt-[10px] nh:text-[18px] nh:mt-[5px] nhm:text-[20px] nhm:mt-[7px]">Orders</span>
        </Link> */}

        <Link
          href="/dashboard/login"
          className={`flex items-center space-x-4 ${
            activeLink === "/logout" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/login")}
        >
          <LogOut className="w-8 h-8 md:w-10 md:h-10 mt-[70%] nh:w-7 nh:h-7 nh:mt-[50%] nhm:w-9 nhm:h-9 nhm:mt-[60%]" />
          <span className="text-[22px] mt-[70%] nh:text-[18px] nh:mt-[50%] nhm:text-[20px] nhm:mt-[60%]">Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;