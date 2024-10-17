// "use client";
// import { useEffect, useState } from "react";
// import { MaterialData } from "../utils/types";

// export const useMaterials = () => {
//   const [materials, setMaterials] = useState<MaterialData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await fetch("/api/materials");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
//         }
//         // const data = await response.json();
//         const data: MaterialData[] = await response.json();

//         const processedMaterials: MaterialData[] = data.map((material) => ({
//           ...material,
//           price: parseFloat(material.price),
//           image: material.image || null,
//         }));

//         if (Array.isArray(processedMaterials)) {
//           setMaterials(processedMaterials);
//         } else {
//           setError("Invalid data format");
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Failed to fetch materials");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMaterials();
//   }, []);

//   return { materials, loading, error, setMaterials };
// };
"use client";
import { useEffect, useState } from "react";
import { MaterialData } from "../utils/types";

export const useMaterials = () => {
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }
        const data: MaterialData[] = await response.json();

        const processedMaterials: MaterialData[] = data.map((material) => ({
          ...material,
          price: material.price,
          image: material.image || null,
        }));

        if (Array.isArray(processedMaterials)) {
          setMaterials(processedMaterials);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch materials");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return { materials, loading, error, setMaterials };
};
