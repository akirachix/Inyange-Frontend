// // // src/app/hooks/useFetchMaterials.ts
// // import { useState, useEffect } from 'react';
// // import { fetchMaterials } from '@/app/utils/fetchMaterials';

// // export interface Material {
// //   material_id: number;
// //   category_name: string;
// //   material_name: string;
// //   brand_name: string;
// //   description: string;
// //   price: number;
// //   quantity: number;
// //   image: string;
// //   availability_status: string;
// // }

// // export const useFetchMaterials = () => {
// //   const [materials, setMaterials] = useState<Material[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [                                          error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const loadMaterials = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const data = await fetchMaterials();
// //         setMaterials(data);
// //       } catch (err: any) {
// //         setError(err.message || 'Failed to load materials');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadMaterials();
// //   }, []);

// //   return { materials, loading, error };
// // };


// // hooks/useMaterials.js
// import { useState, useEffect } from 'react';

// const BASE_URL = process.env.BASE_URL;

// export const useMaterials = () => {
//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadMaterials = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${BASE_URL}/api/materials`);
//         const data = await response.json();
//         setMaterials(data);
//       } catch (error) {
//         console.error('Error fetching materials:', error);
//       }
//       setLoading(false);
//     };

//     loadMaterials();
//   }, []);

//   return { materials, loading };
// };


// // // src/app/hooks/useMaterials.ts

// // 'use client';

// // import { useState, useEffect } from 'react';
// // // import { fetchMaterials } from '../utils/fetchMaterials';
// // import { fetchMaterials } from '../utils/fetchMaterials';

// // // Named export
// // export const useMaterials = () => {
// //   const [materials, setMaterials] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const loadMaterials = async () => {
// //       setLoading(true);
// //       const materialsData = await fetchMaterials();
// //       setMaterials(materialsData);
// //       setLoading(false);
// //     };

// //     loadMaterials();
// //   }, []);

// //   return { materials, loading };
// // };

"use client";

import { useEffect, useState } from 'react';

import { MaterialData } from '../utils/types';

export const useMaterials = () => {
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/api/materials'); 
        const data = await response.json();
        setMaterials(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error){
          setError(error.message)
        }else{
        setError('Failed to fetch materials');
        }
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return { materials, loading, error, setMaterials };
};
