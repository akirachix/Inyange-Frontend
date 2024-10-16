"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useOrders } from "../hooks/useOrders";
import { useSearchParams } from "next/navigation";
import OrderDetailModal from "../components/OrderDetailModal";
import Layout from "../components/Layout";
import { Order } from "../utils/types";

const Orders = () => {
  const { orders, isLoading, error } = useOrders();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl ml-[550px] nh:ml-[300px] nhm:ml-[400px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl ml-[550px] nh:ml-[300px] nhm:ml-[400px]">
        Error: {error}
      </div>
    );
  }

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOpenModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="flex-grow p-8 ml-[35px] nh:ml-[20px] nhm:ml-[25px]">
          <h1 className="text-[32px] mt-[60px] font-bold mb-8 ml-[10px] nh:text-[25px] nh:mt-[10px] nhm:text-[30px] nhm:mt-[50px]">
            Orders
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-4 text-[18px] nh:px-12 nh:py-3 nh:text-[16px] nhm:px-16 nhm:py-3 nhm:text-[18px] text-left">
                    Order Item
                  </th>
                  <th className="border px-5 py-4 text-[18px] nh:px-12 nh:py-3 nh:text-[16px] nhm:px-16 nhm:py-3 nhm:text-[18px] text-left">
                    Price
                  </th>
                  <th className="border px-5 py-4 text-[18px] nh:px-12 nh:py-3 nh:text-[16px] nh:whitespace-nowrap nhm:px-16 nhm:py-3 nhm:text-[18px] text-left">
                    Order Date
                  </th>
                  <th className="border px-5 py-4 text-[18px] nh:px-6 nh:py-3 nh:text-[16px] nhm:px-8 nhm:py-3 nhm:text-[18px] text-left">
                    Status
                  </th>
                  <th className="border px-5 py-4 text-[18px] nh:px-6 nh:py-3 nh:text-[16px] nhm:px-8 nhm:py-3 nhm:text-[18px] text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order: Order) =>
                  Object.entries(order.cart_data).map(([itemNumber, item]) => (
                    <tr
                      key={`${order.order_id}-${itemNumber}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-10 py-4 text-[15px] font-normal nh:px-12 nh:py-3 nh:text-[14px] nh:whitespace-nowrap nhm:px-16 nhm:py-3 nhm:text-[15px]">
                        {item.brand_name}
                      </td>
                      <td className="border px-10 py-4 text-[15px] font-normal nh:px-11 nh:py-3 nh:text-[14px] nh:whitespace-nowrap nhm:px-16 nhm:py-3 nhm:text-[15px]">
                        shs {item.price}
                      </td>
                      <td className="border px-10 py-5 text-[15px] font-normal nh:px-8 nh:py-3 nh:text-[14px] nhm:px-16 nhm:py-3 nhm:text-[15px]">
                        {new Date(order.order_date).toLocaleDateString()}
                      </td>
                      <td
                        className={`border px-4 py-2 text-[15px] font-medium nh:px-2 nh:py-2 nh:text-[14px] nh:whitespace-nowrap nhm:px-3 nhm:py-2 nhm:text-[15px] ${
                          order.status.trim().toLowerCase() === "delivered"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {order.status}
                      </td>
                      <td className="border px-4 py-2 text-[15px] font-normal nh:px-3 nh:py-2 nh:text-[14px] nhm:px-3 nhm:py-2 nhm:text-[15px]">
                        <button
                          onClick={() => handleOpenModal(order.order_id)}
                          className="bg-[#F8B612] hover:bg-[#263C5A] text-white font-bold py-2 px-4 rounded nh:py-2 nh:whitespace-nowrap nh:px-2 nh:text-[14px] nhm:py-1 nhm:px-3 nhm:text-[15px]"
                        >
                          View order
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2 pb-8 ml-[70%] mb-[30px] nh:ml-[60%] nhm:ml-[65%]">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 nh:px-3 nh:py-1 nh:text-[14px] nhm:px-3 nhm:py-1 nhm:text-[15px]"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-9 py-2 border rounded hover:bg-[#263C5A] nh:px-6 nh:py-1 nh:text-[14px] nhm:px-7 nhm:py-1 nhm:text-[15px] ${
                currentPage === index + 1
                  ? "bg-[#F8B612] text-white text-[18px] font-semibold nh:text-[14px] nhm:text-[15px]"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 nh:px-3 nh:py-1 nh:text-[14px] nhm:px-3 nhm:py-1 nhm:text-[15px]"
          >
            &gt;
          </button>
        </div>
        {isModalOpen && (
          <OrderDetailModal
            orderId={selectedOrderId}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Layout>
  );
};

const OrdersPage = () => {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <Orders />
    </Suspense>
  );
};

export default OrdersPage;
