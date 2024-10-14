// // utils/fetchMaterials.js
// const baseURL = process.env.BASE_URL; 

// export const fetchMaterials = async () => {
//     try {
//         const response = await fetch(`${baseURL}/api/materials`);
//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error('Failed to fetch materials: ' + errorText);
//         }
//         const data = await response.json();
//         console.log("Fetched Materials:", data); 
//         return data;
//     } catch (error) {
//         console.error('Error fetching materials:', error);
//         throw error;
//     }
// };
