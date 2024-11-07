import { NextResponse } from 'next/server';


const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
  if (!baseUrl) {
    console.error("BASE_URL is not defined.");
    return NextResponse.json(
      { error: "BASE_URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    
    // Create a new FormData to send to the backend
    const dataToSend = new FormData();
    
    // Transfer all fields to the new FormData
    formData.forEach((value, key) => {
      if (value instanceof File) {
        dataToSend.append(key, value, value.name);
      } else {
        dataToSend.append(key, value);
      }
    });

    console.log("Received form data:", Object.fromEntries(formData.entries()));

    const response = await fetch(`${baseUrl}/api/materials/`, {
      method: "POST",
      // Remove the Content-Type header to let the browser set it automatically for FormData
      body: dataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("POST error response:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const updatedData = await response.json();
    return NextResponse.json(updatedData, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!baseUrl) {
    console.error("BASE_URL is not defined.");
    return NextResponse.json(
      { error: "BASE_URL is not defined" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${baseUrl}/api/materials/`);
    if (!response.ok) {
      const textResponse = await response.text();
      console.error('GET error response:', textResponse);
      return NextResponse.json(
        { error: textResponse || 'Failed to fetch Materials' },
        { status: response.status }
      );
    }
    const materials = await response.json();
    return NextResponse.json(materials, { status: 200 });
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}