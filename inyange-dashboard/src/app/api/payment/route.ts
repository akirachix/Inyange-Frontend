import { NextRequest, NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;
export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log("Received data:", requestData);
  try {
    const response = await fetch(`${baseURL}/process_payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("POST error response:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}