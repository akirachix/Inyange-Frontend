"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart} from "react-icons/md";
import {FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { MaterialData } from "../../utils/types";
import { useMaterials } from "../../hooks/useMaterials";
interface CartItem {
  material_id: number;
  material_name: string;
  brand_name: string;
  price: number;
  quantity: number;
  image?: string;
}
const HeroSection = () => {
  const { materials, loading } = useMaterials() as {
    materials: MaterialData[];
    loading: boolean;
  };
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getCartItems = () => {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : [];
  };
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const filtered = materials.filter((material) =>
      material.material_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterials(filtered);
  }, [materials, searchQuery]);
  // const [, setShowAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const handleAddToCart = (material: MaterialData) => {
    const existingItem = cartItems.find(
      (item) => item.material_id === material.material_id
    );
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.material_id === material.material_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          material_id: material.material_id,
          material_name: material.material_name,
          brand_name: material.brand_name,
          price: material.price,
          quantity: 1,
        },
      ]);
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); 
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("cart");
      localStorage.removeItem("user");
      window.location.href = "/dashboard/login"; // Adjust this path as needed
    }
  };

  return (
    <div className="flex flex-col bg-white py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 w-full">
       {showAlert && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-lg z-50 text-[16px]">
          Item added to cart!
        </div>
      )}
      {/* Header section */}
      <div className="flex items-center w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex items-center lg:ml-[-18%] xl:ml-[-330px]"></div>
      </div>
      <div className="flex items-center justify-between w-full mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mx-auto md:mx-0">
          <Image
            src="/images/bmLogo.png"
            alt="Logo"
            width={160}
            height={60}
            className="w-40 sm:w-48 lg:w-[100%] xl:w-[103%] xl:ml-[-5px] sm:ml-[-100px] md:ml-[-10px]"
          />
        </div>
        <div className="relative flex items-center space-x-10 sm:space-x-8 md:space-x-10 mx-auto md:mx-0 xl:mt-[20px] xl:justify-evenly pr-8 xl:gap-[20px]">
          <Link
            href="/pwa/pages"
            className="relative mt-6 ml-[180%] sm:ml-6 lg:ml-[10%] xl:ml-[10%] md:ml-[40%]"
          >
            <MdOutlineShoppingCart
              size={36}
              className="sm:w-8 sm:h-8 lg:w-14 lg:h-14 xl:size-14 md:size-14"
            />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 flex items-center justify-center text-[12px] sm:text-[14px] lg:text-[18px]">
              {cartItems.reduce(
                (acc: number, item: CartItem) => acc + item.quantity,
                0
              )}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 text-[#263C5A] hover:text-[#F8B612] transition-colors"
            aria-label="Logout"
          >
            <FiLogOut className="sm:w-9 sm:h-9 lg:w-12 lg:h-9 xl:size-9 md:size-8 w-9 h-6" />
          </button>

        </div>
      </div>
      {/* Search bar */}
      <div
        className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[45%] mx-auto
        mt-4 sm:mt-6 md:mt-8 lg:mt-6 xl:mt-4"
      >
        <div
          className="relative flex items-center w-full 
          border-2 border-[#F8B612] rounded-full 
          overflow-hidden
          transition-all duration-300
          hover:shadow-md
          focus-within:shadow-lg focus-within:border-[#e5a610]"
        >
          <input
            type="text"
            placeholder="Search materials"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 w-full
            px-4 sm:px-5 md:px-6 lg:px-8
            py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4
            text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl
            placeholder-gray-400
            bg-transparent
            outline-none
            transition-colors duration-300"
          />
          <button
            className="flex-shrink-0
            px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10
            py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4
            text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl
            font-medium
            text-white
            bg-[#F8B612]
            transition-all duration-300
            hover:bg-[#e5a610]
            active:bg-[#d49a0f]
            focus:outline-none focus:ring-2 focus:ring-[#F8B612] focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </div>
      {/* Conditional rendering based on search query */}
      {searchQuery === "" ? (
        <>
          {/* Hero section */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg mt-6 md:mt-8 text-center md:text-left">
            <div className="md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-[#263C5A] text-[#F8B612] shadow-lg mb-6 md:mb-0 h-160">
              <h1 className="text-2xl sm:text-xl md:text-3xl lg:text-4xl xl:text-[40px] font-bold mb-4 md:mb-6 leading-tight xl:leading-[1.1] xl:w-[55%]">
                Everything You Need For Your Building, All in One Place
              </h1>
              <Link href="/pwa/steel">
                <button className="bg-transparent text-white border-2 border-[#F8B612] px-4 sm:px-4 md:px-5 lg:px-9 py-1 sm:py-2 md:py-4 font-bold rounded-full transition duration-300 ease-in-out hover:bg-[#F8B612] hover:text-[#263C5A] text-xl mt-2 sm:mt-4 xl:text-[20px] xl:mt-[20px] xl:px-[20px] xl:py-[13px]">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <Image
                src="/images/image (7).png"
                alt="Building Materials"
                width={700}
                height={280}
                className="rounded-lg w-full md:w-[100%] mx-auto md:mx-0"
              />
            </div>
          </div>
          {/* Categories section */}
          <div className="w-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-14 text-center md:text-left">
            <h2 className="text-2xl sm:text-lg md:text-3xl lg:text-3xl font-bold mb-4 text-black xl:text-[30px]">
              Top Categories
            </h2>
            <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center md:items-start gap-4">
              {/* Building Materials */}
              <div
                className="flex flex-col items-center bg-[#263C5A] text-white border border-[#F8B612] rounded-lg shadow-lg 
                p-4 
                w-full sm:w-[80%] md:w-[32%] 
                mx-auto
                min-h-[280px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px] 
                h-auto
                max-w-[400px] md:max-w-none"
              >
                <h3 className="text-xl md:text-[20px] md:mt-[30px] sm:text-lg font-bold mb-3 xl:text-[22px]">
                  Building Materials
                </h3>
                <div className="flex-grow flex items-center justify-center w-full py-4">
                  <Image
                    src="/images/build.png"
                    alt="Building Materials"
                    width={140}
                    height={100}
                    className="rounded-lg object-contain
                    w-[35%] sm:w-[38%] md:w-[80%] lg:w-[60%]
                    max-w-[180px]"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/pwa/steel">
                    <button
                      className="bg-transparent text-white border-2 border-[#F8B612] 
                      px-4 py-2
                      text-lg sm:text-base
                      font-bold rounded-full 
                      transition duration-300 ease-in-out 
                      hover:bg-[#F8B612] hover:text-[#263C5A] 
                      xl:text-[18px] xl:px-[23px] xl:py-[14px] md:text-[17px] md:py-[14px]"
                    >
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
              {/* Finishing Materials */}
              <div
                className="flex flex-col items-center bg-[#263C5A] text-white border border-[#F8B612] rounded-lg shadow-lg 
                p-4 
                w-full sm:w-[80%] md:w-[32%] 
                mx-auto
                min-h-[280px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px] 
                h-auto
                max-w-[400px] md:max-w-none"
              >
                <h3 className="text-xl sm:text-lg md:text-[20px] md:mt-[30px] font-bold mb-3 xl:text-[22px]">
                  Finishing Materials
                </h3>
                <div className="flex-grow flex items-center justify-center w-full py-4">
                  <Image
                    src="/images/Tiles.png"
                    alt="Finishing Materials"
                    width={140}
                    height={100}
                    className="rounded-lg object-contain
                    w-[35%] sm:w-[38%] md:w-[80%] lg:w-[60%]
                    max-w-[180px]"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/pwa/tiles">
                    <button
                      className="bg-transparent text-white border-2 border-[#F8B612] 
                      px-4 py-2
                      text-lg sm:text-base
                      font-bold rounded-full 
                      transition duration-300 ease-in-out 
                      hover:bg-[#F8B612] hover:text-[#263C5A] 
                      xl:text-[18px] xl:px-[23px] xl:py-[14px] md:text-[17px] md:py-[14px]"
                    >
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
              {/* Hardware and Tools */}
              <div
                className="flex flex-col items-center bg-[#263C5A] text-white border border-[#F8B612] rounded-lg shadow-lg 
                p-4 
                w-full sm:w-[80%] md:w-[32%] 
                mx-auto
                min-h-[280px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px] 
                h-auto
                max-w-[400px] md:max-w-none"
              >
                <h3 className="text-xl md:text-[20px] md:mt-[30px] sm:text-lg font-bold mb-3 xl:text-[22px]">
                  Hardware and Tools
                </h3>
                <div className="flex-grow flex items-center justify-center w-full py-4">
                  <Image
                    src="/images/hardwaretools.png"
                    alt="Hardware and Tools"
                    width={140}
                    height={100}
                    className="rounded-lg object-contain
                    w-[35%] sm:w-[38%] md:w-[80%] lg:w-[60%]
                    max-w-[180px]"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/pwa/carpentry">
                    <button
                      className="bg-transparent text-white border-2 border-[#F8B612] 
                      px-4 py-2
                      text-lg sm:text-base
                      font-bold rounded-full 
                      transition duration-300 ease-in-out 
                      hover:bg-[#F8B612] hover:text-[#263C5A] 
                      xl:text-[18px] xl:px-[23px] xl:py-[14px] md:text-[17px] md:py-[14px]"
                    >
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Hot Deals section */}
          <div className="w-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-14 text-center md:text-left">
            <h2 className="text-2xl sm:text-lg md:text-3xl lg:text-3xl font-bold mb-4 text-black xl:text-[30px]">
              Hot Deals
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center place-items-center">
              {materials.slice(36, 52).map((material) => (
                <div
                  key={material.material_id}
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 xl:px-20 xl:py-6"
                >
<Image
                  src={(() => {
                    const name = material.material_name.toLowerCase();
                    if (name.includes("paint")) {
                      return "/images/paint.jpg";
                    } else if (name.includes("cement")) {
                      return "/images/duracem.jpg";
                    } else if (name.includes("carpentry")) {
                      return "/images/carpentry.jpg";
                    }else if (name.includes("tiles")) {
                      return "/images/tiles.jpg";
                    }else if (name.includes("wood")) {
                      return "/images/wood.jpg";
                    }else if (name.includes("steel")) {
                      return "/images/steel.png";
                    }else if (name.includes("sheets")) {
                      return "/images/sheets.jpg";
                    }else if (name.includes("brick")) {
                      return "/images/brick.jpeg";
                    }else if (name.includes("cement")) {
                      return "/images/duracem.jpg";
                      }
                    else if (name.includes("mabati")) {
                      return "/images/sheets.jpg";
                    }
                    
                    else {
                      return (
                        (typeof material.image === "string" && material.image) ||
                        "/images/placeholder-image.png"
                      );
                    }
                  })()}
                  alt={material.material_name}
                  width={140}
                  height={140}
                  className="rounded-lg mb-3"
                />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{material.material_name}</h3>
                    <p className="text-gray-600">{material.brand_name}</p>
                    <p className="text-xl font-bold">KES {material.price}</p>
                    <button
                      onClick={() => handleAddToCart(material)}
                      className="mt-2 bg-[#F8B612] text-white px-4 py-2 rounded-full hover:bg-[#e5a610] transition duration-200"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4  justify-center place-items-center">
          {filteredMaterials.length === 0 ? (
            <p className="text-center col-span-4">
              No materials found for your search.
            </p>
          ) : (
            filteredMaterials.map((material) => (
              <div
                key={material.material_id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 xl:px-20 xl:py-6"
              >
     
                <div className="p-4">
                <Image
                  src={(() => {
                    const name = material.material_name.toLowerCase();
                    if (name.includes("paint")) {
                      return "/images/paint.jpg";
                    } else if (name.includes("cement")) {
                      return "/images/duracem.jpg";
                    } else if (name.includes("carpentry")) {
                      return "/images/carpentry.jpg";
                    }else if (name.includes("tiles")) {
                      return "/images/tiles.jpg";
                    }else if (name.includes("wood")) {
                      return "/images/wood.jpg";
                    }else if (name.includes("steel")) {
                      return "/images/steel.png";
                    }else if (name.includes("sheets")) {
                      return "/images/sheets.jpg";
                    }else if (name.includes("brick")) {
                      return "/images/brick.jpeg";
                    }else if (name.includes("cement")) {
                      return "/images/duracem.jpg";
                     }
                     else if (name.includes("mabati")) {
                      return "/images/sheets.jpg";
                    }

                     else {
                      return (
                        (typeof material.image === "string" && material.image) ||
                        "/images/placeholder-image.png"
                      );
                    }
                  })()}
                  alt={material.material_name}
                  width={140}
                  height={140}
                  className="rounded-lg mb-3"
                />
                  <h3 className="font-semibold text-lg">{material.material_name}</h3>
                  <p className="text-gray-600">{material.brand_name}</p>
                  <p className="text-xl font-bold">KES {material.price}</p>
                  <button
                    onClick={() => handleAddToCart(material)}
                    className="mt-2 bg-[#F8B612] text-white px-4 py-2 rounded-full hover:bg-[#e5a610] transition duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default HeroSection;