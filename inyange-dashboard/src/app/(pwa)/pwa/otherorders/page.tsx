"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MaterialData } from "../utils/types";
import { useMaterials } from "../hooks/useMaterials";

interface CartItem {
  material_id: number;
  material_name: string;
  brand_name: string;
  price: number;
  quantity: number;
}

const ITEMS_PER_PAGE = 6;

const OtherOrders = () => {
  const { materials, loading } = useMaterials();
  const [currentPage, setCurrentPage] = useState(1);
  //   const [cartItems, setCartItems] = useState(() => {
  //     const storedCart = localStorage.getItem("cart");
  //     return storedCart ? JSON.parse(storedCart) : [];
  //   });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
    alert(`${material.material_name} has been added to your cart!`);
  };

  //    useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cartItems));
  //   }, [cartItems]);

  //   const handleAddToCart = (material: MaterialData) => {
  //     const existingItem = cartItems.find(
  //       (item: { id: any }) => item.id === material.material_id
  //     );
  //     if (existingItem) {
  //       setCartItems((prevItems: any[]) =>
  //         prevItems.map((item: { id: any; quantity: number }) =>
  //           item.id === material.material_id
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item
  //         )
  //       );
  //     } else {
  //       setCartItems((prevItems: any) => [
  //         ...prevItems,
  //         {
  //           material_id: material.material_id,
  //           material_name: material.material_name,
  //           brand_name: material.brand_name,
  //           price: material.price,
  //           quantity: 1,
  //         },
  //       ]);
  //     }
  //     alert(`${material.material_name} has been added to your cart!`);
  //   };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(materials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMaterials = materials.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white p-4 lg:pl-[10%] xl:pl-[20%] flex flex-col items-center">
      <div className="flex items-center w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex items-center lg:ml-[-18%]  xl:ml-[-330px]">
          <Link href="" className="mr-4 sm:mr-6 lg:mr-8 mt-5 text-blue-950">
            <FiChevronLeft size={40} className="lg:w-[50px]" />
          </Link>
          <Image
            src="/images/bmLogo.png"
            alt="BuildMart Logo"
            width={160}
            height={32}
            className="w-40 sm:w-48 lg:w-[100%] xl:w-[83%] xl:ml-[-25px]"
          />
        </div>

        <Link
          href=""
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
          {/* <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 flex items-center justify-center text-[12px] sm:text-[14px] lg:text-[18px]">
            {cartItems.reduce(
              (acc: any, item: { quantity: any }) => acc + item.quantity,
              0
            )}
          </span> */}
        </Link>
      </div>

      <h2 className="text-2xl sm:text-2xl lg:text-[30px] font-medium mt-8 sm:mt-12 lg:mt-20 text-center md:text-[28px] md:ml-[-200px] lg:text-left lg:ml-[-50%] xl:text-left xl:ml-[-97%]">
        Would you like to order others?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-6 lg:gap-x-24 mt-8 sm:mt-10 lg:mt-16 w-full justify-center lg:ml-[-5%] xl:ml-[-400px] xl:gap-x-[150px]">
        {currentMaterials.map((material: MaterialData) => (
          <div
            key={material.material_id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center lg:flex-row lg:items-start xl:flex-row xl:items-start"
          >
            <Image
            //   src={material.image || "/images/placeholder-image.png"}
            src={(material.image as unknown as string) || "/images/placeholder-image.png"}
              alt={material.material_name}
              width={180}
              height={120}
              className="mb-4 lg:mb-0 lg:mr-6 xl:mb-4"
            />

            <div className="flex flex-col items-center lg:items-start mt-4 lg:mt-[50px] xl:ml-12 xl:mt-[46px] lg:ml-[20px]">
              <span className="font-semibold text-lg sm:text-xl lg:text-2xl mb-2 lg:mb-4 xl:text-[17px]">
                KES {material.price}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium mb-2 lg:mb-4 xl:text-[16px]">
                {material.material_name}
              </h3>
              <p className="text-base sm:text-lg lg:text-xl font-medium mb-4 lg:mb-6 xl:text-[16px] md:whitespace-nowrap">
                {material.brand_name}
              </p>
              <button
                onClick={() => handleAddToCart(material)}
                className="bg-white border-2 sm:border-[3px] border-yellow-500 text-base sm:text-lg lg:text-xl font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-yellow-500 hover:text-white transition-colors xl:mt-[5px] lg:ml-[-20px] lg:whitespace-nowrap"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center sm:mt-8 mb-6 w-full px-4 sm:px-0 lg:mt-20 xl:mt-[60px] lg:ml-[-10%] xl:ml-[-400px]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-[#F8B612] text-[#263C5A] p-2 lg:p-3 rounded-full disabled:opacity-50"
            aria-label="Previous page"
          >
            <FiChevronLeft size={24} className="lg:w-8 lg:h-8" />
          </button>
          <span className="text-sm sm:text-lg lg:text-2xl whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-[#F8B612] text-[#263C5A] p-2 lg:p-3 rounded-full disabled:opacity-50"
            aria-label="Next page"
          >
            <FiChevronLeft
              size={24}
              className="transform rotate-180 lg:w-8 lg:h-8"
            />
          </button>
        </div>

        <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-center sm:justify-start">
          <Link
            href=""
            className="text-[#263C5A] px-8 sm:px-10 lg:px-14 py-2 sm:py-3 lg:py-5 rounded-lg text-xl sm:text-2xl lg:text-3xl lg:ml-[20px] xl:text-[23px] font-semibold bg-[#F8B612] transition-colors xl:ml-[30px]"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtherOrders;
