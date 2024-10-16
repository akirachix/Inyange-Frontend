import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const response = await fetch(`${baseURL}/api/orderdetail/${id}/`);
    
    if (!response.ok) {
      const errorText = await response.text(); 
      return NextResponse.json({ error: 'Failed to fetch order details: ' + errorText }, { status: response.status });
    }

    const orderDetail = await response.json();
    
    return NextResponse.json(orderDetail);
    
  } catch (error) {
    console.error('Error fetching order details:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch order details: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}


