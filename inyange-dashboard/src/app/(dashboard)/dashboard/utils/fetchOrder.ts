const baseURL = "/api/orderdetails"

export const fetchOrder = async () => {
    try {
      console.log('Fetching orders from:', baseURL);
      const response = await fetch(baseURL);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch orders:', errorText);
        throw new Error('Failed to fetch orders: ' + errorText);
      }
  
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };