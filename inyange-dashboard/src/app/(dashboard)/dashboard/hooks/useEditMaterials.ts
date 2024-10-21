import { useState, useEffect } from "react";
import { MaterialData } from "../utils/types";


export const useMaterial = (materialId: string) => {
  const [material, setMaterial] = useState<MaterialData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`/api/material/${materialId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch material with id: ${materialId}`);
        }
        const data = await response.json();
        setMaterial(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (materialId) {
      fetchMaterial();
    }
  }, [materialId]);

  return { material, loading, error };
};
