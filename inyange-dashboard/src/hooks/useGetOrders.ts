
import { useState, useEffect } from 'react';
import { fetchOrders } from '../utils/fetchOrders';

export interface Order {
  id: number; 
  total: number; 
  order_date: string; 
  status: string;
  cart_data: object;
}

export const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  
  const submitOrder = async (newOrder: Omit<Order, 'id'>) => { 
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const orderData = await response.json();

     
      setOrders((prevOrders) => [...prevOrders, orderData]); 
    } catch (err) {
      console.error('Error submitting order:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the order');
    }
  };

  
  return { orders, loading, error, submitOrder };
};
