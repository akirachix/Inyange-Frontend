"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useGetMaterials } from "../hooks/useGetMaterials";
import Link from "next/link";

interface DealItem {
  id: number;
  material_name: string;
  price: number;
  image?: string;
}

interface CartItem {
  material_id: number;
  material_name: string;
  price: number;
  quantity: number;
}

const HeroSection = () => {
  const { materials: hotDeals, loading, error } = useGetMaterials();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleAddToCart = (deal: DealItem) => {
    const existingItem = cartItems.find(
      (item: CartItem) => item.material_id === deal.id
    );

    if (existingItem) {
      setCartItems((prevItems: CartItem[]) =>
        prevItems.map((item: CartItem) =>
          item.material_id === deal.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems: CartItem[]) => [
        ...prevItems,
        {
          material_id: deal.id,
          material_name: deal.material_name,
          price: deal.price,
          quantity: 1,
        },
      ]);
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const limitedHotDeals = hotDeals.slice(0, 12);
  const filteredDeals =
    searchQuery === ""
      ? limitedHotDeals
      : hotDeals.filter((deal) =>
          deal.material_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  function getImagePath(_material_name: string): string | undefined {
    const imagePaths: { [key: string]: string } = {
      wood: "/images/materials/wood.jpg",
      metal: "/images/materials/metal.jpg",
      concrete: "/images/materials/concrete.jpg",
    };

    return imagePaths[_material_name.toLowerCase()];
  }

  return (
    <div className="flex flex-col bg-white py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 w-full">
      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Item added to cart!
        </div>
      )}

      {/* Header section */}
      <div className="flex items-center w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex items-center lg:ml-[-18%] xl:ml-[-330px]"></div>
      </div>

      {/* Logo and Cart section */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center space-x-2 mx-auto md:mx-0">
          <Image
            src="/images/bmLogo.png"
            alt="Logo"
            width={160}
            height={60}
            className="w-40 sm:w-48 lg:w-[100%] xl:w-[103%] xl:ml-[-5px]"
          />
        </div>
        <div className="relative flex items-center space-x-10 sm:space-x-8 md:space-x-10 mx-auto md:mx-0 xl:mt-[20px] xl:justify-evenly pr-8">
          <Link
            href="/pwa/pages"
            className="relative mt-6 ml-auto sm:ml-6 lg:ml-[100%] xl:ml-[100%] md:ml-[70%]"
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
            placeholder="Search Hot Deals"
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
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[40px] font-bold mb-4 md:mb-6 leading-tight xl:leading-[1.1] xl:w-[55%]">
                Everything You Need For Your Building, All in One Place
              </h1>
              <Link href="/pwa/steel">
                <button className="bg-transparent text-white border-2 border-[#F8B612] px-4 sm:px-4 md:px-6 lg:px-9 py-1 sm:py-2 md:py-6 font-bold rounded-full transition duration-300 ease-in-out hover:bg-[#F8B612] hover:text-[#263C5A] mt-2 sm:mt-4 xl:text-[20px] xl:mt-[20px] xl:px-[20px] xl:py-[13px]">
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
                className="rounded-lg w-full md:w-auto mx-auto md:mx-0"
              />
            </div>
          </div>

          {/* Categories section */}
          <div className="w-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-14 text-center md:text-left">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-black xl:text-[30px]">
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
                <h3 className="text-base sm:text-lg font-bold mb-3 xl:text-[22px]">
                  Building Materials
                </h3>
                <div className="flex-grow flex items-center justify-center w-full py-4">
                  <Image
                    src="/images/build.png"
                    alt="Building Materials"
                    width={140}
                    height={100}
                    className="rounded-lg object-contain
          w-[35%] sm:w-[38%] md:w-[42%] lg:w-[45%]
          max-w-[180px]"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/pwa/steel">
                    <button
                      className="bg-transparent text-white border-2 border-[#F8B612] 
          px-4 py-2
          text-sm sm:text-base
          font-bold rounded-full 
          transition duration-300 ease-in-out 
          hover:bg-[#F8B612] hover:text-[#263C5A] 
          xl:text-[18px] xl:px-[23px] xl:py-[14px]"
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
                <h3 className="text-base sm:text-lg font-bold mb-3 xl:text-[22px]">
                  Finishing Materials
                </h3>
                <div className="flex-grow flex items-center justify-center w-full py-4">
                  <Image
                    src="/images/Tiles.png"
                    alt="Finishing Materials"
                    width={140}
                    height={100}
                    className="rounded-lg object-contain
          w-[35%] sm:w-[38%] md:w-[42%] lg:w-[45%]
          max-w-[180px]"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/pwa/tiles">
                    <button
                      className="bg-transparent text-white border-2 border-[#F8B612] 
          px-4 py-2
          text-sm sm:text-base
          font-bold rounded-full 
          transition duration-300 ease-in-out 
          hover:bg-[#F8B612] hover:text-[#263C5A] 
          xl:text-[18px] xl:px-[23px] xl:py-[14px]"
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
                <h3 className="text-base sm:text-lg font-bold mb-3 xl:text-[22px]">
                  Hardware and Tools
                </h3>
                <div className="flex-grow flex items-center justify-center w-full py-4">
                  <Image
                    src="/images/hardwaretools.png"
                    alt="Hardware and Tools"
                    width={140}
                    height={100}
                    className="rounded-lg object-contain
          w-[35%] sm:w-[38%] md:w-[42%] lg:w-[45%]
          max-w-[180px]"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/pwa/carpentry">
                    <button
                      className="bg-transparent text-white border-2 border-[#F8B612] 
          px-4 py-2
          text-sm sm:text-base
          font-bold rounded-full 
          transition duration-300 ease-in-out 
          hover:bg-[#F8B612] hover:text-[#263C5A] 
          xl:text-[18px] xl:px-[23px] xl:py-[14px]"
                    >
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Hot Deals section */}
      <div
        className={`w-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 text-center md:text-left ${
          searchQuery ? "mt-8" : ""
        }`}
      >
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-black xl:text-[26px]">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Hot Deals"}
        </h2>
        <div
          className={`grid gap-4 sm:gap-6 ${
            searchQuery
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {loading ? (
            <p>Loading hot deals...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow-lg p-4"
              >
                <Image
                  src={(() => {
                    const name = deal.material_name.toLowerCase();
                    if (name.includes("paint")) {
                      return "/images/paint.jpg";
                    } else if (name.includes("cement")) {
                      return "/images/duracem.jpg";
                    } else {
                      return (
                        (typeof deal.image === "string" && deal.image) ||
                        "/images/placeholder-image.png"
                      );
                    }
                  })()}
                  alt={deal.material_name}
                  width={150}
                  height={150}
                  className="rounded-lg mb-3"
                />
                <h3 className="text-sm sm:text-base font-bold mb-2 xl:text-[17px]">
                  {deal.material_name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 xl:text-[16px]">
                  Sale price
                </p>
                <p className="text-base sm:text-lg font-semibold mb-3 xl:text-[16px]">
                  KES {deal.price}
                </p>
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: deal.id,
                      material_name: deal.material_name,
                      price: deal.price,
                      image: getImagePath(deal.material_name),
                    })
                  }
                  className="bg-[#F8B612] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold transition duration-300 ease-in-out hover:bg-[#263C5A] hover:text-[#F8B612] xl:text-[16px]"
                >
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
