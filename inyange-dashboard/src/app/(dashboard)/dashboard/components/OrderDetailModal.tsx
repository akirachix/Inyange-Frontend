"use client"
import React from "react";
import { useOrderById } from "../hooks/useOrderById";
import Image from 'next/image';
import { Order } from "../utils/types";

interface OrderDetailModalProps {
  orderId: number | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ orderId, onClose }) => {
  const { order, isLoading, error } = useOrderById(orderId ?? -1);

  if (orderId === null) {
    return <div className="text-center py-8 text-xl">No Order ID Provided</div>;
  }

  if (isLoading) {
    return <div className="text-center py-8 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-xl text-red-500">Error: {error}</div>;
  }

  if (!order) {
    return <div className="text-center py-8 text-xl">Order not found</div>;
  }
  const getMaterialImage = (material: string | number | undefined): string => {
    if (typeof material === 'number') {
      material = material.toString();
    }
    
    switch (material?.toLowerCase()) {
      case 'steel':
      case '1':
        return "/images/steel.png";
      case 'wood':
      case '2':
        return "/images/wood.png";
      case 'cement':
      case '3':
        return "/images/tembo.jpg";
      case 'paint':
      case '4':
        return "/images/paint.jpg";
      case 'buildingmaterials':
      case '5':
        return "/images/tiles.jpg";
      default:
        return "/images/tembo.jpg";
    }
  };

  const getFirstCartItem = (order: Order) => {
    const cartItems = Object.values(order.cart_data);
    return cartItems.length > 0 ? cartItems[0] : null;
  };

  const firstItem = getFirstCartItem(order);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-[28px] font-bold mb-6">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[20px]"><strong>Order Item:</strong> {firstItem?.brand_name || "N/A"}</p>
              <p className="text-[20px]"><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
              <p className="text-[20px]">
                <strong>Status: </strong>
                <span className={`font-semibold ${order.status.trim().toLowerCase() === "delivered" ? "text-green-600" : "text-red-500"}`}>
                  {order.status}
                </span>
              </p>
              <p className="text-[20px]"><strong>Item Price:</strong> shs {firstItem?.price || "N/A"}</p>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={getMaterialImage(order.material)}
                alt={`${order.material || 'Order'} image`}
                width={600}
                height={600}
                className="rounded-lg shadow-lg object-contain"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-16 rounded-lg text-[16px] transition duration-300"
            >
              Close
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;