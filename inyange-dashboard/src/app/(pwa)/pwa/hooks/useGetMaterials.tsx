import { useState, useEffect } from 'react';
// import { fetchMaterials} from '../utils/fetchMaterials';
import { fetchMaterials } from '../utils/fetchMaterials';

export interface Material {
    id: number;        
    name: string; 
    material_name: string;     
    // image: string;     
    price: number;     
  }

export const useGetMaterials = () => { 
  const [materials, setMaterials] = useState<Material[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const getMaterials = async () => {
      try {
        const data = await fetchMaterials(); 
        setMaterials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false); 
      }
    };
    getMaterials();
  }, []);

 
  return { materials, loading, error };
};
