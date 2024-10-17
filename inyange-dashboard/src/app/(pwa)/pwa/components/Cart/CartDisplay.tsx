
import React from "react";
import { useCart } from "../../context/CartProvider";

const CartDisplay: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>
                KES {item.price} x {item.quantity}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartDisplay;
