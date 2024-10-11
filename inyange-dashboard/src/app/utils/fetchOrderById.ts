
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
  

  // export const cancelOrder = async (orderId: number) => {
  //   try {
  //     console.log(`Cancelling order with ID: ${orderId}`);
  //     const response = await fetch(`/api/details/${orderId}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error('Failed to cancel order:', errorText);
  //       throw new Error('Failed to cancel order: ' + errorText);
  //     }
  
  //     const data = await response.json();
  //     console.log('Order cancelled successfully:', data);
  //     return data;
  //   } catch (error) {
  //     console.error('Error cancelling order:', error);
  //     throw error;
  //   }
  // };