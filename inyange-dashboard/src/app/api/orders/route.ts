import { NextResponse } from 'next/server';
import { Order } from '@/app/utils/types'; // Adjust the import path based on your project structure

// Static data for testing
const staticOrders: Order[] = [
  {
    total_price: '100',
    totalAmount: 1,
    customerName: 'John Doe',
    order_id: 1,
    itemNumber: 2,
    order_date: '2024-10-14',
    status: 'Completed',
    cart_data: {}, // Add your CartItem data here if needed
    material: 1,
  },
  {
    total_price: '200',
    totalAmount: 2,
    customerName: 'Jane Smith',
    order_id: 2,
    itemNumber: 3,
    order_date: '2024-10-13',
    status: 'Pending',
    cart_data: {}, // Add your CartItem data here if needed
    material: 2,
  },
  // You can add more static orders if necessary
];

export async function GET() {
  // Instead of fetching, we return the static data
  return NextResponse.json(staticOrders);
}
