const baseURL = "/api/orders"
export const fetchOrders = async () =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orderdetails`);
        if(!response.ok){
            throw new Error('Failed to fetch orders' + await response.text());
        }
        return await response.json();
        }catch (error){
            console.error('Error fetching farmers:', error);
            throw error;
        }
}
