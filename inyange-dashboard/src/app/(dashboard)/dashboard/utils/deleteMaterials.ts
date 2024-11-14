const baseUrl = '/api/material';

export const deleteMaterial = async (id: string) => {
  try {
    const url = `${baseUrl}/${id}/`;

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete material. Status: ${response.status}`);
    }

    return { message: 'Material deleted successfully' };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
