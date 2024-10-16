import { useState, useEffect } from "react";
import { Order } from "../utils/types";
import { fetchOrder } from "../utils/fetchOrder";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const getOrders = async () => {
      console.log("Fetching orders...");
      setLoading(true); 
      setError(null); 
      try {
        const data = await fetchOrder();
        console.log("Fetched data:", data);
        setOrders(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        console.error("Error fetching orders:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false); 
      }
    };

    getOrders();
  }, []);

  const fetchOrderDetails = async (orderId: number) => {
    if (typeof window === 'undefined') {
      return null; 
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/orderdetails/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const orderData = await response.json();
      return orderData; 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching order details";
      console.error("Error fetching order details:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { orders, isLoading, error, fetchOrderDetails };
};

