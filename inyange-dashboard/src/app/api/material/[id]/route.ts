const baseUrl = process.env.BASE_URL

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const formData = await request.formData();

    const response = await fetch(`${baseUrl}/api/material/${id}/`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to update material' }), {
        status: response.status,
      });
    }

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
    });
  }
}
