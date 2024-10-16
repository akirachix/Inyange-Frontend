export const fetchMaterials = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/materials`);
    if (!response.ok) {
      throw new Error('Failed to fetch materials');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};