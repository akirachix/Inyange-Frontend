import { useState, useEffect } from "react";
import { Order } from "../utils/types";
import { fetchOrderById } from "../utils/fetchOrderById";

export const useOrderById = (orderId: number) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setLoading(false);
        return;
      }

      console.log(`Fetching order details for order ID: ${orderId}`);
      try {
        const data = await fetchOrderById(orderId);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };
    getOrder();
  }, [orderId]);

  return { order, isLoading, error };
};
