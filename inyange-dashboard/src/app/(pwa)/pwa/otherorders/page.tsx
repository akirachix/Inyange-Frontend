"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft} from "react-icons/fi";
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
const mediaUrl = process.env.MEDIA_URL || "https://buildmart-42eabdb55b17.herokuapp.com";


const OtherOrders = () => {
  const { materials, loading } = useMaterials();
  console.log(materials);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleAddToCart = (material: MaterialData) => {
    const existingItem = cartItems.find(
      (item: CartItem) => item.material_id === material.material_id
    );

    if (existingItem) {
      setCartItems((prevItems: CartItem[]) =>
        prevItems.map((item: CartItem) =>
          item.material_id === material.material_id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems: CartItem[]) => [
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

    const getImageSource = (material: MaterialData) => {
    if (material.image) {
      return `${mediaUrl}${material.image}`;
    }

    const name = material.material_name.toLowerCase();
    if (name.includes("paint")) return "/images/paint.jpg";
    if (name.includes("cement")) return "/images/duracem.jpg";
    if (name.includes("carpentry")) return "/images/carpentry.jpg";
    if (name.includes("tiles")) return "/images/tiles.jpg";
    if (name.includes("wood")) return "/images/wood.jpg";
    if (name.includes("steel")) return "/images/steel.png";
    if (name.includes("sheet")) return "/images/sheets.jpg";
    if (name.includes("brick")) return "/images/brick.jpeg";
    if (name.includes("mabati")) return "/images/sheets.jpg";
    return "/images/placeholder-image.png";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const totalPages = Math.ceil((materials?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMaterials = materials?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  

  return (
    <div className="min-h-screen bg-white p-4 lg:pl-[10%] xl:pl-[20%] flex flex-col items-center">
      {showAlert && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-lg z-50 text-[16px]">
          Item added to cart!
        </div>
      )}

      <div className="flex items-center w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex items-center lg:ml-[-18%] xl:ml-[-330px] ml-[-20px]">
          <Link
            href="/pwa/homepage"
            className="mr-4 sm:mr-6 lg:mr-8 mt-5 text-blue-950"
          >
            <FiChevronLeft size={40} className="lg:w-[50px]" />
          </Link>
      

          <Image
            src="/images/bmLogo.png"
            alt="BuildMart Logo"
            width={130}
            height={32}
            className="w-40 sm:w-48 lg:w-[100%] xl:w-[75%] xl:ml-[5px]"
          />
        </div>

        <div className="flex items-center sm:ml-6 lg:ml-[100%] xl:ml-[100%] md:ml-[70%] xl:gap-14  md:gap-10  lg:gap-12 gap-6">
      
        <Link
          href="/pwa/pages"
          className="relative mt-6 ml-32 sm:ml-6 lg:ml-[10%] xl:ml-[-100%] md:ml-[20%]"
        >
          <MdOutlineShoppingCart
            size={36}
            className="sm:w-6 sm:h-6 lg:w-14 lg:h-14 xl:size-14 md:size-14 w-7 h-7"
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

      <h2 className="text-2xl sm:text-2xl lg:text-[30px] font-medium mt-8 sm:mt-12 lg:mt-20 text-center md:text-[28px] md:ml-[-200px] lg:text-left lg:ml-[-50%] xl:text-left xl:ml-[-97%] xl:mt-[35px]">
        Would you like to order others?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-6 lg:gap-x-24 mt-8 sm:mt-10 lg:mt-16 w-full justify-center lg:ml-[-5%] xl:ml-[-400px] xl:gap-x-[150px] xl:mt-[25px]">
        {currentMaterials && currentMaterials.length > 0 ? (
          currentMaterials.map((material: MaterialData) => (
            <div
              key={material.material_id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center lg:flex-row lg:items-start xl:flex-row xl:items-start"
            >
                 <Image
              src={getImageSource(material)}
              alt={material.material_name}
              width={140}
              height={110}
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
                  className="bg-white border-[2px] sm:border-[3px] border-yellow-500 text-base sm:text-lg lg:text-xl font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-yellow-500 hover:text-white transition-colors xl:mt-[5px] lg:ml-[-20px] lg:whitespace-nowrap"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No materials available.</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center sm:mt-8 mb-6 w-full px-4 sm:px-0 lg:mt-20 lg:ml-[-10%] xl:ml-[-400px] xl:mt-[55px] md:ml-[-40px] md:mt-[8px]">
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
            <FiChevronLeft size={24} className="lg:w-8 lg:h-8 rotate-180" />
          </button>
        </div>

        <Link
          href="/pwa/pages"
          className="mt-4 sm:mt-0 sm:ml-auto py-2 px-4 lg:px-6 lg:py-3 sm:text-2xl lg:text-3xl lg:ml-[20px] xl:text-[23px] font-semibold bg-[#F8B612] text-blue-900 transition-colors xl:ml-[30px] rounded-lg md:ml-[20px] "
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default OtherOrders;

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FiChevronLeft } from "react-icons/fi";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { MaterialData } from "../utils/types";
// import { useMaterials } from "../hooks/useMaterials";

// interface CartItem {
//   material_id: number;
//   material_name: string;
//   brand_name: string;
//   price: number;
//   quantity: number;
// }

// const ITEMS_PER_PAGE = 6;
// const mediaUrl = process.env.MEDIA_URL || "https://buildmart-42eabdb55b17.herokuapp.com";

// const OtherOrders = () => {
//   const { materials, loading } = useMaterials();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     if (typeof window !== "undefined") {
//       const storedCart = localStorage.getItem("cart");
//       return storedCart ? JSON.parse(storedCart) : [];
//     }
//     return [];
//   });
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   const handleAddToCart = (material: MaterialData) => {
//     const existingItem = cartItems.find(
//       (item: CartItem) => item.material_id === material.material_id
//     );

//     if (existingItem) {
//       setCartItems((prevItems: CartItem[]) =>
//         prevItems.map((item: CartItem) =>
//           item.material_id === material.material_id
//             ? { ...item, quantity: (item.quantity || 0) + 1 }
//             : item
//         )
//       );
//     } else {
//       setCartItems((prevItems: CartItem[]) => [
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
//     setShowAlert(true);
//     setTimeout(() => setShowAlert(false), 3000);
//   };

//   const getImageSource = (material: MaterialData) => {
//     if (material.image) {
//       return `${mediaUrl}${material.image}`;
//     }

//     const name = material.material_name.toLowerCase();
//     if (name.includes("paint")) return "/images/paint.jpg";
//     if (name.includes("cement")) return "/images/duracem.jpg";
//     if (name.includes("carpentry")) return "/images/carpentry.jpg";
//     if (name.includes("tiles")) return "/images/tiles.jpg";
//     if (name.includes("wood")) return "/images/wood.jpg";
//     if (name.includes("steel")) return "/images/steel.png";
//     if (name.includes("sheet")) return "/images/sheets.jpg";
//     if (name.includes("brick")) return "/images/brick.jpeg";
//     if (name.includes("mabati")) return "/images/sheets.jpg";
//     return "/images/placeholder-image.png";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//       </div>
//     );
//   }

//   const totalPages = Math.ceil((materials?.length || 0) / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentMaterials = materials?.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   return (
//     <div className="min-h-screen bg-white p-4 lg:pl-[10%] xl:pl-[20%] flex flex-col items-center">
//       {showAlert && (
//         <div className="fixed top-4 right-4 bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-lg z-50 text-[16px]">
//           Item added to cart!
//         </div>
//       )}

//       <div className="flex items-center w-full px-4 sm:px-8 lg:px-16 xl:px-24">
//         <div className="flex items-center lg:ml-[-18%] xl:ml-[-330px] ml-[-20px]">
//           <Link
//             href="/pwa/homepage"
//             className="mr-4 sm:mr-6 lg:mr-8 mt-5 text-blue-950"
//           >
//             <FiChevronLeft size={40} className="lg:w-[50px]" />
//           </Link>
//           <Image
//             src="/images/bmLogo.png"
//             alt="Logo"
//             width={160}
//             height={60}
//             className="w-32 h-20 sm:w-48 lg:w-[100%] xl:w-[103%] xl:ml-[-5px] sm:ml-[-10px] md:ml-[-10px] ml-[-20px]"
//           />
//         </div>

//         <div className="flex items-center sm:ml-6 lg:ml-[100%] xl:ml-[100%] md:ml-[70%] xl:gap-14 md:gap-10 lg:gap-12 gap-6">
//           <Link
//             href="/pwa/pages"
//             className="relative mt-6 ml-32 sm:ml-6 lg:ml-[10%] xl:ml-[50%] md:ml-[20%]"
//           >
//             <MdOutlineShoppingCart size={36} className="sm:w-6 sm:h-..." />
//           </Link>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
//         {currentMaterials.map((material) => (
//           <div key={material.material_id} className="bg-white rounded-lg shadow-lg p-4">
//             <Image
//               src={getImageSource(material)}
//               alt={material.material_name}
//               width={100}
//               height={100}
//               className="w-full h-32 object-cover rounded-md"
//             />
//             <h3 className="mt-4 text-xl font-semibold">{material.material_name}</h3>
//             <p className="text-gray-600">{material.brand_name}</p>
//             <p className="text-gray-900 font-bold">KES {material.price}</p>
//             <button
//               onClick={() => handleAddToCart(material)}
//               className="mt-4 w-full bg-[#F8B612] text-white py-2 rounded-lg"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-8">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
//         >
//           &lt;
//         </button>
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`px-4 py-2 mx-1 rounded-md ${
//               currentPage === index + 1 ? "bg-[#F8B612] text-white" : "bg-gray-200"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OtherOrders;
