"use client";

import React, { useEffect, useState } from "react";
import { useMaterials } from "../../hooks/useMaterials";
import { MaterialData } from "../../utils/types";
import Layout from "../Layout";
import Image from "next/image";
import Navbar from "../Navbar";

const Carpentry: React.FC = () => {
  const { materials, loading } = useMaterials() as {
    materials: MaterialData[];
    loading: boolean;
  };
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialData[]>(
    []
  );

  const getCartItems = () => {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : [];
  };

  const [cartItems, setCartItems] = useState<
    {
      material_id: number;
      material_name: string;
      brand_name: string;
      price: number;
      quantity: number;
    }[]
  >(getCartItems());

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter materials that include 'tiles' in their name
  useEffect(() => {
    const filtered = materials.filter((material) =>
      material.material_name.toLowerCase().includes("carpentry")
    );
    setFilteredMaterials(filtered);
  }, [materials]);
  const [, setShowAlert] = useState(false);

  // Handle adding items to the cart
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
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <Layout>
      <Navbar
        itemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onAddToCart={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="flex flex-row min-h-screen bg-gray-100 xl:mt-10">
        <div className="flex-1 p-4 sm:p-6 ml-72 pt-24 mt-24 overflow-auto">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material.material_id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                >
                  <Image
                    src="/images/cap.jpg"
                    alt="Cap picture"
                    className="w-full h-32 sm:h-40 object-contain mb-4"
                    width={500}
                    height={600}
                  />
                  <h4 className="font-semibold xl:text-lg text-gray-900 mb-1">
                    KES {material.price}
                  </h4>
                  <h4 className="text-gray-800 xl:text-lg font-bold mb-1">
                    {material.material_name}
                  </h4>
                  <p className="text-gray-600 xl:text-lg mb-1">
                    {material.brand_name}
                  </p>
                  <button
                    onClick={() => handleAddToCart(material)}
                    className="mt-4 xl:text-lg w-full sm:w-[150px] font-bold border border-[#F8B612] text-black py-2 rounded-lg sm:rounded-2xl hover:bg-[#F8B612] hover:text-white transition-colors duration-300"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Carpentry;


