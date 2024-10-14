
export const fetchOrderById = async (orderId: number) => {
    try {
      console.log(`Fetching order details for order ID: ${orderId}`);
      const response = await fetch(`/api/details/${orderId}`);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch order details:', errorText);
        throw new Error('Failed to fetch order details: ' + errorText);
      }
  
      const data = await response.json();
      console.log('Fetched order details:', data);
      return data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  };
  
