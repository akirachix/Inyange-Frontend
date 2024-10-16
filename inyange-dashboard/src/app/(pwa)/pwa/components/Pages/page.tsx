

"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { usePayment } from "../../hooks/payment";
import Link from "next/link";
import { MaterialData } from "../../utils/types";
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from "next/image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<MaterialData[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { processPayment, isSubmitting, errorMessage, successMessage } = usePayment();

  useEffect(() => {
    const items = localStorage.getItem('cart');
    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, []);

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.material_id === id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    await processPayment(totalPrice.toString(), phoneNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/components/Steel">
              <button className="text-gray-800 transition-colors mr-4">
                <ChevronLeft size={24} />
              </button>
            </Link>
            <Image
  src="/images/bmLogo.png"
  alt="BuildMart Logo"
  className="h-8 sm:h-10"
  width={200} 
  height={50} 
/>

          </div>
          <div className="relative">
            <MdOutlineShoppingCart className="text-gray-600" size={24} />
            {/* <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span> */}
          </div>
        </div>
      </header>

      <main className="flex-grow mt-16 sm:mt-20 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-900">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="overflow-x-auto">
                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-4 text-blue-900 font-semibold text-sm sm:text-base w-1/2">Product</th>
                        <th className="text-left pb-4 text-blue-900 font-semibold text-sm sm:text-base w-1/4">Quantity</th>
                        <th className="text-right pb-4 text-blue-900 font-semibold text-sm sm:text-base w-1/4">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.material_id} className="border-b border-gray-200">
                          <td className="py-4">
                            <div>
                              <p className="font-bold text-sm sm:text-base text-blue-900">{item.material_name}</p>
                              <p className="text-xs sm:text-sm mt-1 text-gray-600">
                                Brand: {item.brand_name}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center border rounded-md w-24 sm:w-32 shadow-sm">
                              <button 
                                className="px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-100 transition-colors"
                                onClick={() => handleQuantityChange(item.material_id, false)}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2 sm:px-3 py-1 sm:py-2 flex-grow text-center font-semibold text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <button 
                                className="px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-100 transition-colors"
                                onClick={() => handleQuantityChange(item.material_id, true)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="text-right font-bold text-sm sm:text-base text-blue-900">KES {item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link href="/otherorder">
                  <button className="flex items-center bg-yellow-500 text-blue-900 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-xs sm:text-sm">
                    <ChevronLeft className="mr-1 sm:mr-2" size={16} />
                    Continue Shopping
                  </button>
                </Link>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="bg-[#263C5A] p-4 sm:p-6 rounded-xl text-white shadow-lg">
                  <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
                  <p className="mb-3 font-semibold text-sm sm:text-base">Payment Method</p>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="w-full p-2 sm:p-3 mb-4 border rounded-lg text-black placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    // value={`KES ${totalPrice}`}
                    // readOnly
                  />
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="w-full p-2 sm:p-3 mb-4 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Subtotal:</span>
                    <span>KES {totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold mb-4 text-sm">
                    <span>Total:</span>
                    <span>KES {totalPrice}</span>
                  </div>
                  
                  <button 
                    className="w-full bg-yellow-500 text-blue-900 font-bold px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-sm"
                    onClick={handlePayment} 
                    disabled={isSubmitting} 
                  >
                    {isSubmitting ? 'Processing...' : 'Pay Now'}
                  </button>
                  {errorMessage && <p className="text-red-500 mt-3 text-xs sm:text-sm">{errorMessage}</p>}
                  {successMessage && <p className="text-green-500 mt-3 text-xs sm:text-sm">{successMessage}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { ChevronLeft, Minus, Plus } from "lucide-react";
// import { usePayment } from "../../hooks/payment";
// import Link from "next/link";
// import { MaterialData } from "../../utils/types";
// import { MdOutlineShoppingCart } from "react-icons/md";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<MaterialData[]>([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [paymentAmount, setPaymentAmount] = useState(""); // New state for user input amount
//   const { processPayment, isSubmitting, errorMessage, successMessage } = usePayment();

//   useEffect(() => {
//     const items = localStorage.getItem('cart');
//     if (items) {
//       try {
//         const parsedItems = JSON.parse(items);
//         setCartItems(parsedItems);
//       } catch (error) {
//         console.error('Error parsing cart items:', error);
//       }
//     }
//   }, []);

//   const handleQuantityChange = (id: number, increment: boolean) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.material_id === id
//           ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
//           : item
//       )
//     );
//   };

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handlePayment = async () => {
//     // Ensure the user enters a valid payment amount
//     if (Number(paymentAmount) <= 0 || isNaN(Number(paymentAmount))) {
//       alert("Please enter a valid amount.");
//       return;
//     }
//     await processPayment(paymentAmount, phoneNumber);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-10">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center">
//             <Link href="/components/Steel">
//               <button className="text-gray-800 transition-colors mr-4">
//                 <ChevronLeft size={24} />
//               </button>
//             </Link>
//             <img
//               src="/images/bmLogo.png"
//               alt="BuildMart Logo"
//               className="h-8 sm:h-10"
//             />
//           </div>
//           <div className="relative">
//             <MdOutlineShoppingCart className="text-gray-600" size={24} />
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow mt-16 sm:mt-20 p-4 sm:p-6 lg:p-8">
//         <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-4 sm:p-6 lg:p-8">
//             <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-900">Shopping Cart</h1>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2">
//                 <div className="overflow-x-auto">
//                   <table className="w-full mb-6">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-left pb-4 text-blue-900 font-semibold text-sm sm:text-base w-1/2">Product</th>
//                         <th className="text-left pb-4 text-blue-900 font-semibold text-sm sm:text-base w-1/4">Quantity</th>
//                         <th className="text-right pb-4 text-blue-900 font-semibold text-sm sm:text-base w-1/4">Total Price</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {cartItems.map((item) => (
//                         <tr key={item.material_id} className="border-b border-gray-200">
//                           <td className="py-4">
//                             <div>
//                               <p className="font-bold text-sm sm:text-base text-blue-900">{item.material_name}</p>
//                               <p className="text-xs sm:text-sm mt-1 text-gray-600">
//                                 Brand: {item.brand_name}
//                               </p>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="flex items-center border rounded-md w-24 sm:w-32 shadow-sm">
//                               <button 
//                                 className="px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-100 transition-colors"
//                                 onClick={() => handleQuantityChange(item.material_id, false)}
//                               >
//                                 <Minus size={14} />
//                               </button>
//                               <span className="px-2 sm:px-3 py-1 sm:py-2 flex-grow text-center font-semibold text-sm sm:text-base">
//                                 {item.quantity}
//                               </span>
//                               <button 
//                                 className="px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-100 transition-colors"
//                                 onClick={() => handleQuantityChange(item.material_id, true)}
//                               >
//                                 <Plus size={14} />
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-right font-bold text-sm sm:text-base text-blue-900">KES {item.price * item.quantity}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <Link href="/otherorder">
//                   <button className="flex items-center bg-yellow-500 text-blue-900 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-xs sm:text-sm">
//                     <ChevronLeft className="mr-1 sm:mr-2" size={16} />
//                     Continue Shopping
//                   </button>
//                 </Link>
//               </div>

//               <div className="lg:sticky lg:top-24 lg:self-start">
//                 <div className="bg-[#263C5A] p-4 sm:p-6 rounded-xl text-white shadow-lg">
//                   <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
//                   <p className="mb-3 font-semibold text-sm sm:text-base">Payment Method</p>
//                   <div className="mb-4">
//                     <label htmlFor="paymentAmount" className="block text-xs sm:text-sm mb-1">Enter Payment Amount</label>
//                     <input
//                       type="number"
//                       id="paymentAmount"
//                       placeholder="Amount"
//                       className="w-full p-2 sm:p-3 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//                       value={paymentAmount}
//                       onChange={(e) => setPaymentAmount(e.target.value)} // User inputs the amount
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="phoneNumber" className="block text-xs sm:text-sm mb-1">Enter Phone Number</label>
//                     <input
//                       type="text"
//                       id="phoneNumber"
//                       placeholder="Phone Number"
//                       className="w-full p-2 sm:p-3 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                     />
//                   </div>
//                   <div className="flex justify-between mb-2 text-sm">
//                     <span>Subtotal:</span>
//                     <span>KES {totalPrice}</span>
//                   </div>
//                   <div className="flex justify-between font-bold mb-4 text-sm">
//                     <span>Total:</span>
//                     <span>KES {totalPrice}</span>
//                   </div>
                  
//                   <button 
//                     className="w-full bg-yellow-500 text-blue-900 font-bold px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors text-sm"
//                     onClick={handlePayment} 
//                     disabled={isSubmitting} 
//                   >
//                     {isSubmitting ? 'Processing...' : 'Pay Now'}
//                   </button>
//                   {errorMessage && <p className="text-red-500 mt-3 text-xs sm:text-sm">{errorMessage}</p>}
//                   {successMessage && <p className="text-green-500 mt-3 text-xs sm:text-sm">{successMessage}</p>}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CartPage;
