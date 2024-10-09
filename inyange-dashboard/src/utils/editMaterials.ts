import { MaterialData } from './types';

const baseUrl = '/api/material';

export const editMaterial = async (id: string, formData: FormData) => {
  try {
    const url = `${baseUrl}/${id}/`;

    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update material. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
