export const fetchOrders = async () => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/materials`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders: ' + await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
