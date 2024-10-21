'use client';

import { useState, useEffect } from 'react';
import { fetchMaterials } from '../utils/fetchMaterials';

export const useMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      setLoading(true);
      const materialsData = await fetchMaterials();
      setMaterials(materialsData);
      setLoading(false);
    };

    loadMaterials();
  }, []);

  return { materials, loading };
};
