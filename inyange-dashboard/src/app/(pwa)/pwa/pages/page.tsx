
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
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { processPayment, isSubmitting } = usePayment();

  const [categoryBudgets, setCategoryBudgets] = useState({
    wood: 0,
    tiles: 0,
    sheet: 0,
    steel: 0,
    cement: 0,
    paint: 0,
    carpentry: 0,
  });

  

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

    const savedBudgets = localStorage.getItem("categoryBudgets");
    if (savedBudgets) {
      setCategoryBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categoryBudgets", JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  const getTotalForCategory = (category: string) => {
    return cartItems
      .filter((item) => item.material_name.toLowerCase().includes(category))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  type Category = keyof typeof categoryBudgets;

  const getOverBudgetAmount = (category: Category) => {
    const totalForCategory = getTotalForCategory(category);
    const budgetForCategory = categoryBudgets[category];
    return totalForCategory > budgetForCategory
      ? totalForCategory - budgetForCategory
      : 0;
  };
  

  const totalBudget = Object.values(categoryBudgets).reduce((a, b) => a + b, 0);
  const isTotalOverBudget = totalPrice > totalBudget;
  const totalOverBudgetAmount = isTotalOverBudget
    ? totalPrice - totalBudget
    : 0;

    const handleQuantityChange = (id: string | number, increment: boolean) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.material_id === id
            ? {
                ...item,
                quantity: increment
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
              }
            : item
        )
      );
    };
    

    const handleRemoveItem = (id: string | number) => {
      const updatedCartItems = cartItems.filter((item) => item.material_id !== id);
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };
    
    const handleCategoryBudgetSubmit = (
      e: React.FormEvent<HTMLFormElement>,
      category: string
    ) => {
      e.preventDefault();
      const budgetInput = e.currentTarget.budget.value;
      setCategoryBudgets((prevBudgets) => ({
        ...prevBudgets,
        [category]: Number(budgetInput),
      }));
      setModalMessage(`Budget for ${category} set to: KES ${budgetInput}`);
      setShowModal(true);
    };
    
    

  const handlePayment = async () => {
    if (!phoneNumber.startsWith("254")) {
      setErrorMessage("Please enter your number starting with 254");
      return;
    }
    setErrorMessage("");
    try {
      await processPayment(totalPrice.toString(), phoneNumber);
      setSuccessMessage("Payment processed successfully!");
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex w-full h-full bg-white rounded-xl shadow-lg">
        {/* Left Section */}
        <div className="flex flex-col w-1/3 p-8 lg:p-12 overflow-y-auto">
          <header className="flex items-center mb-8">
            <Link href="/pwa/homepage">
              <button className="text-gray-800 transition-colors">
                <ChevronLeft size={50} />
              </button>
            </Link>
            <Image
              src="/images/bmLogo.png"
              alt="BuildMart Logo"
              width={160}
              height={32}
              className="ml-4 w-40 sm:w-48 lg:w-full"
            />
          </header>
          <h1 className="text-[24px] font-bold mb-4 text-blue-900">Shopping Cart</h1>
          <div className="overflow-y-auto flex-1">
            <table className="w-full mb-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-4 text-blue-900 font-semibold">Product</th>
                  <th className="text-left pb-4 text-blue-900 font-semibold">Quantity</th>
                  <th className="text-right pb-4 text-blue-900 font-semibold">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.material_id} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="text-blue-900 font-bold">{item.material_name}</div>
                    </td>
                    <td>
                      <div className="flex items-center border rounded-md w-28 shadow-sm">
                        <button
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() => handleQuantityChange(item.material_id, false)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 text-center font-semibold">{item.quantity}</span>
                        <button
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() => handleQuantityChange(item.material_id, true)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="text-right font-bold text-blue-900">KES {item.price * item.quantity}</td>
                    <td className="text-right">
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => handleRemoveItem(item.material_id)}
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/pwa/otherorders">
              <button className="bg-yellow-500 text-blue-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors">
                <ChevronLeft size={20} /> Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 p-8 lg:p-12 bg-gray-100 flex flex-col overflow-y-hidden">
          {/* Budget Forms */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-[20px] font-bold text-blue-900 mb-4">Set Category Budgets</h2>
            {["wood", "tiles", "sheet", "steel", "cement", "paint", "carpentry"].map((category) => (
              <form key={category} onSubmit={(e) => handleCategoryBudgetSubmit(e, category)} className="mb-4">
                <label className="block text-blue-900 font-semibold mb-2" htmlFor={`${category}-budget`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)} Budget:
                </label>
                <input
                  type="number"
                  name="budget"
                  className="w-full px-4 py-2 border rounded-md mb-2"
                  placeholder={`Enter budget for ${category} (KES)`}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Set {category.charAt(0).toUpperCase() + category.slice(1)} Budget
                </button>
              </form>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-4 flex-grow">
            <h2 className="text-[24px] font-bold text-blue-900 mb-4">Order Summary</h2>
            <p className="text-[18px] text-blue-900 font-bold mb-2">
              Total: <span className="font-bold text-[18px]">KES {totalPrice}</span>
            </p>

            {(["wood", "tiles", "sheet", "steel", "cement", "paint", "carpentry"] as Category[]).map((category) => (
  <div key={category}>
    {getOverBudgetAmount(category) > 0 && (
      <p className="text-red-600 font-semibold mb-2">
        You are over your {category.charAt(0).toUpperCase() + category.slice(1)} budget by KES {getOverBudgetAmount(category)}.
      </p>
    )}
  </div>
))}

            {isTotalOverBudget && (
              <p className="text-red-600 font-semibold mb-2">
                You are over your Total budget by KES {totalOverBudgetAmount}.
              </p>
            )}
          </div>

          {/* Payment Form */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-[24px] font-bold text-blue-900 mb-4">Payment</h2>
            <Image src="/images/logompesa.png" alt="M-Pesa Logo" width={60} height={20} />

            <form onSubmit={handlePayment}>
              <label className="block text-blue-900 font-semibold mb-2" htmlFor="phone-number">
                Enter Phone Number:
              </label>
              <input
                type="text"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="254..."
              />
              {errorMessage && (
                <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
              )}
              <br />
              <br />

              <button
                onClick={handlePayment}
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-blue-900 font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors text-[20px]"
              >
                {isSubmitting ? "Processing..." : "Confirm and Pay"}
              </button>
              {successMessage && (
                <p className="text-blue-800 text-sm font-semibold">{successMessage}</p>
              )}
            </form>
          </div>

          {/* Modal */}
          {showModal && (
  <div
    className="fixed top-    top: '10%',
    left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-blue-900 font-bold p-6 rounded-lg shadow-md z-50 transition-colors"
    style={{ zIndex: 1000 }} 
  >
    {modalMessage}
    <br />

    <button 
      className="bg-blue-900 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition-colors"
      onClick={() => setShowModal(false)}
    >
      Close
    </button>
  </div>
)}


        </div>
      </main>
    </div>
  );
};

export default CartPage;
