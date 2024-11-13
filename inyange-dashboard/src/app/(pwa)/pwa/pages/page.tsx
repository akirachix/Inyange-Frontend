"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Minus, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { MaterialData } from "../utils/types";
import { usePayment } from "../hooks/payment";
import Image from "next/image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<MaterialData[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { processPayment, isSubmitting, errorMessage, successMessage } = usePayment();

  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        setCartItems(parsedItems);
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    }
  }, []);

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.material_id === id
          ? {
              ...item,
              quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.material_id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };


  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    await processPayment(totalPrice.toString(), phoneNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 sm:px-8 lg:px-12">
      <header className="flex items-center mb-8">
        <Link href="/pwa/homepage">
          <button className="text-gray-800 transition-colors">
            <ChevronLeft size={50} className="xl:mt-[25px]" />
          </button>
        </Link>
        <div className="flex items-center ml-4">
          <Image
            src="/images/bmLogo.png"
            alt="BuildMart Logo"
            width={160}
            height={32}
            className="w-40 sm:w-48 lg:w-[100%] xl:w-[75%] xl:ml-[5px]"
          />
          <span className="font-bold text-2xl text-blue-900"></span>
        </div>
      </header>

      <main className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 lg:p-12">
          <h1 className="text-[28px] font-bold mb-8 text-blue-900">
            Shopping Cart
          </h1>

          <div className="flex flex-col xl:flex-row gap-12">
            <div className="flex-grow">
              <table className="w-[90%] mb-8">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4 text-blue-900 font-semibold text-[20px]">
                      Product
                    </th>
                    <th className="text-left pb-4 text-blue-900 font-semibold text-[20px]">
                      Quantity
                    </th>
                    <th className="text-right pb-4 text-blue-900 font-semibold text-[20px]">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.material_id} className="border-b border-gray-200">
                      <td className="py-6">
                        <div className="flex items-center">
                          <p className="font-bold text-xl text-blue-900 text-[20px]">
                            {item.material_name}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center border rounded-md w-36 shadow-sm">
                          <button
                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.material_id, false)}
                          >
                            <Minus size={18} />
                          </button>
                          <span className="px-4 py-2 flex-grow text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <button
                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.material_id, true)}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="text-right font-bold text-xl text-blue-900">
                        KES {item.price * item.quantity}
                      </td>
                      <td className="text-right">
                        <button
                          className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
                          onClick={() => handleRemoveItem(item.material_id)}
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/pwa/otherorders">
                <button className="flex items-center bg-yellow-500 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-[16px]">
                  <ChevronLeft className="mr-2" size={24} />
                  Continue Shopping
                </button>
              </Link>
            </div>

            <div className="w-full xl:w-1/3 xl:mt-[-50px]">
              <div className="bg-[#263C5A] pl-20 pr-20 pt-[100px] pb-[100px] rounded-xl text-white shadow-lg">
                <h2 className="text-[25px] font-bold mb-6">Order Summary</h2>
                <p className="mb-6 font-semibold text-[20px]">Payment Method</p>
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full p-4 mb-10 border rounded-lg text-black placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  value={totalPrice}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="254 712345678"
                  className="w-full p-4 mb-12 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div className="flex justify-between mb-4 text-[17px]">
                  <span>Subtotal:</span>
                  <span>KES {totalPrice}</span>
                </div>
                <div className="flex justify-between font-bold mb-8 text-[17px]">
                  <span>Total:</span>
                  <span>KES {totalPrice}</span>
                </div>

                <button
                  className="w-full bg-yellow-500 text-blue-900 font-bold px-6 py-4 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-[17px] xl:mt-[30px]"
                  onClick={handlePayment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;

