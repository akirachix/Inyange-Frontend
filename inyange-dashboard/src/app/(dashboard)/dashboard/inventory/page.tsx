// // // // // // "use client";

// // // // // // import React, { useState } from "react";
// // // // // // import AddMaterialModal from "../components/AddMaterialsForm";
// // // // // // import EditMaterialForm from "../components/EditMaterialsModal";
// // // // // // import { FaPlus, FaPencilAlt } from "react-icons/fa";
// // // // // // import Layout from "../components/Layout";
// // // // // // import Image from "next/image";
// // // // // // import { useFetchMaterials } from "../hooks/useFetchMaterials";
// // // // // // import { MaterialData } from "../utils/types";

// // // // // // const InventoryPage: React.FC = () => {
// // // // // //   const { materials, loading, error, setMaterials } = useFetchMaterials();
// // // // // //   const [searchTerm] = useState("");
// // // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // // //   const [editModalVisible, setEditModalVisible] = useState(false);
// // // // // // const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
// // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // //   const itemsPerPage = 8;

// // // // // //   const placeholderImage = "/images/duracem.jpg";
// // // // // //   const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

// // // // // //   const filteredMaterials = materials
// // // // // //     .filter((material: { material_name: string }) =>
// // // // // //       material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // //     )
// // // // // //     .reverse();

// // // // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // // // //   const currentMaterials = filteredMaterials.slice(
// // // // // //     indexOfFirstItem,
// // // // // //     indexOfLastItem
// // // // // //   );

// // // // // //   const handleAddNewClick = () => setShowAddModal(true);
// // // // // //    const handleCloseModal = () => setShowAddModal(false);

// // // // // //    const handleEditClick = (material: MaterialData) => {
// // // // // //     setSelectedMaterial(material);
// // // // // //      setEditModalVisible(true);
// // // // // //   };

// // // // // //   const handleCloseEditModal = () => {
// // // // // //     setEditModalVisible(false);
// // // // // //     setSelectedMaterial(null);
// // // // // //   };

// // // // // //   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
// // // // // //     const updatedMaterials = materials.map((material) =>
// // // // // //       material.material_id === updatedMaterial.material_id
// // // // // //         ? updatedMaterial
// // // // // //         : material
// // // // // //     );
// // // // // //     setMaterials(updatedMaterials);
// // // // // //   };

// // // // // //   const handleMaterialAdded = (newMaterial: MaterialData) => {
// // // // // //     setMaterials([newMaterial, ...materials]);
// // // // // //     setCurrentPage(1);
// // // // // //     setShowAddModal(false);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Layout>
// // // // // //       <div className="p-4 flex flex-col mt-[80px]">
// // // // // //         <h2 className="text-4xl font-bold">Inventory</h2>
// // // // // //         <div className="flex justify-end items-center mb-6">
// // // // // //           <div className="flex items-center">
// // // // // //             <button
// // // // // //               className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
// // // // // //               onClick={handleAddNewClick}
// // // // // //             >
// // // // // //               <FaPlus className="mr-2" /> Add New
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {loading ? (
// // // // // //           <p>Loading materials...</p>
// // // // // //         ) : error ? (
// // // // // //           <p className="text-red-500">{error}</p>
// // // // // //         ) : (
// // // // // //           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
// // // // // //             <table className="min-w-full w-full mt-4">
// // // // // //               <thead className="bg-gray-50">
// // // // // //                 <tr>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Material
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Price
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Quantity
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Action
// // // // // //                   </th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody className="bg-white divide-y divide-gray-200 text-xl">
// // // // // //                 {currentMaterials.map((material) => (
// // // // // //                   <tr key={material.material_id}>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       <div className="flex items-center">
// // // // // //                         <Image
// // // // // //                           src={
// // // // // //                             material.image
// // // // // //                               ? `${mediaUrl}${material.image}`
// // // // // //                               : placeholderImage
// // // // // //                           }
// // // // // //                           alt={material.material_name}
// // // // // //                           width={40}
// // // // // //                           height={40}
// // // // // //                           className="w-10 h-10 rounded-full mr-3"
// // // // // //                         />
// // // // // //                         <span>{material.material_name}</span>
// // // // // //                       </div>
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       KES {material.price}
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       {material.quantity}
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // // // // //                     <button
// // // // // //                         onClick={() => handleEditClick(material)}
// // // // // //                        className="text-green-600 hover:text-green-900 mr-3"
// // // // // //                       >
// // // // // //                        <FaPencilAlt className="w-6 h-6" />
// // // // // //                       </button>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ))}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         <div className="flex justify-end mt-4 mb-4">
// // // // // //           <button
// // // // // //             onClick={() => setCurrentPage(currentPage - 1)}
// // // // // //             disabled={currentPage === 1}
// // // // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // // // //           >
// // // // // //             &lt;
// // // // // //           </button>

// // // // // //           {[
// // // // // //             ...Array(
// // // // // //               Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage))
// // // // // //             ),
// // // // // //           ].map((_, index) => {
// // // // // //             const pageNum = index + 1;
// // // // // //             return (
// // // // // //               <button
// // // // // //                 key={index}
// // // // // //                 onClick={() => setCurrentPage(pageNum)}
// // // // // //                 className={`px-4 py-2 mx-1 rounded-md ${
// // // // // //                   currentPage === pageNum
// // // // // //                     ? "bg-[#F8B612] text-white"
// // // // // //                     : "bg-gray-200"
// // // // // //                 }`}
// // // // // //               >
// // // // // //                 {pageNum}
// // // // // //               </button>
// // // // // //             );
// // // // // //           })}

// // // // // //           <button
// // // // // //             onClick={() => setCurrentPage(currentPage + 1)}
// // // // // //             disabled={
// // // // // //               currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)
// // // // // //             }
// // // // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // // // //           >
// // // // // //             &gt;
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {showAddModal && (
// // // // // //           <AddMaterialModal
// // // // // //             onClose={handleCloseModal}
// // // // // //             onMaterialAdded={handleMaterialAdded}
// // // // // //           />
// // // // // //         )}

// // // // // //         {editModalVisible && selectedMaterial && (
// // // // // //        <EditMaterialForm
// // // // // //           materialData={selectedMaterial}
// // // // // //           onClose={handleCloseEditModal}
// // // // // //           onMaterialUpdated={handleMaterialUpdated}
// // // // // //           />
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </Layout>
// // // // // //   );
// // // // // // };

// // // // // // export default InventoryPage;


// // // // // // "use client";

// // // // // // import React, { useState } from "react";
// // // // // // import AddMaterialModal from "../components/AddMaterialsForm";
// // // // // // import EditMaterialForm from "../components/EditMaterialsModal";
// // // // // // import { FaPlus, FaPencilAlt } from "react-icons/fa";
// // // // // // import Layout from "../components/Layout";
// // // // // // import Image from "next/image";
// // // // // // import { useFetchMaterials } from "../hooks/useFetchMaterials";
// // // // // // import { MaterialData } from "../utils/types";

// // // // // // const InventoryPage: React.FC = () => {
// // // // // //   const { materials, loading, error, setMaterials } = useFetchMaterials();
// // // // // //   const [searchTerm] = useState("");
// // // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // // //   const [editModalVisible, setEditModalVisible] = useState(false);
// // // // // //   const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
// // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // //   const itemsPerPage = 8;

// // // // // //   const placeholderImage = "/images/duracem.jpg";
// // // // // //   const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

// // // // // //   const filteredMaterials = materials
// // // // // //     .filter((material: { material_name: string }) =>
// // // // // //       material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // //     )
// // // // // //     .reverse();

// // // // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // // // //   const currentMaterials = filteredMaterials.slice(
// // // // // //     indexOfFirstItem,
// // // // // //     indexOfLastItem
// // // // // //   );

// // // // // //   const handleAddNewClick = () => setShowAddModal(true);
// // // // // //   const handleCloseModal = () => setShowAddModal(false);

// // // // // //   const handleEditClick = (material: MaterialData) => {
// // // // // //     setSelectedMaterial(material);
// // // // // //     setEditModalVisible(true);
// // // // // //   };

// // // // // //   const handleCloseEditModal = () => {
// // // // // //     setEditModalVisible(false);
// // // // // //     setSelectedMaterial(null);
// // // // // //   };

// // // // // //   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
// // // // // //     const updatedMaterials = materials.map((material) =>
// // // // // //       material.material_id === updatedMaterial.material_id
// // // // // //         ? updatedMaterial
// // // // // //         : material
// // // // // //     );
// // // // // //     setMaterials(updatedMaterials);
// // // // // //   };

// // // // // //   const handleMaterialAdded = (newMaterial: MaterialData) => {
// // // // // //     setMaterials([newMaterial, ...materials]);
// // // // // //     setCurrentPage(1);
// // // // // //     setShowAddModal(false);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Layout>
// // // // // //       <div className="p-4 flex flex-col mt-[80px]">
// // // // // //         <h2 className="text-4xl font-bold">Inventory</h2>
// // // // // //         <div className="flex justify-end items-center mb-6">
// // // // // //           <button
// // // // // //             className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
// // // // // //             onClick={handleAddNewClick}
// // // // // //           >
// // // // // //             <FaPlus className="mr-2" /> Add New
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {loading ? (
// // // // // //           <p>Loading materials...</p>
// // // // // //         ) : error ? (
// // // // // //           <p className="text-red-500">{error}</p>
// // // // // //         ) : (
// // // // // //           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
// // // // // //             <table className="min-w-full w-full mt-4">
// // // // // //               <thead className="bg-gray-50">
// // // // // //                 <tr>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Material
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Brand
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Price
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Quantity
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // // //                     Action
// // // // // //                   </th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody className="bg-white divide-y divide-gray-200 text-xl">
// // // // // //                 {currentMaterials.map((material) => (
// // // // // //                   <tr key={material.material_id}>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       <div className="flex items-center">
// // // // // //                         <Image
// // // // // //                           src={
// // // // // //                             material.image
// // // // // //                               ? `${mediaUrl}${material.image}`
// // // // // //                               : placeholderImage
// // // // // //                           }
// // // // // //                           alt={material.material_name}
// // // // // //                           width={40}
// // // // // //                           height={40}
// // // // // //                           className="w-10 h-10 rounded-full mr-3"
// // // // // //                         />
// // // // // //                         <span>{material.material_name}</span>
// // // // // //                       </div>
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       {material.brand_name}
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       KES {material.price}
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // // //                       {material.quantity}
// // // // // //                     </td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // // // // //                       <button
// // // // // //                         onClick={() => handleEditClick(material)}
// // // // // //                         className="text-green-600 hover:text-green-900 mr-3"
// // // // // //                       >
// // // // // //                         <FaPencilAlt className="w-6 h-6" />
// // // // // //                       </button>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ))}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Pagination Buttons */}
// // // // // //         <div className="flex justify-end mt-4 mb-4">
// // // // // //           <button
// // // // // //             onClick={() => setCurrentPage(currentPage - 1)}
// // // // // //             disabled={currentPage === 1}
// // // // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // // // //           >
// // // // // //             &lt;
// // // // // //           </button>

// // // // // //           {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
// // // // // //             const pageNum = index + 1;
// // // // // //             return (
// // // // // //               <button
// // // // // //                 key={index}
// // // // // //                 onClick={() => setCurrentPage(pageNum)}
// // // // // //                 className={`px-4 py-2 mx-1 rounded-md ${
// // // // // //                   currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
// // // // // //                 }`}
// // // // // //               >
// // // // // //                 {pageNum}
// // // // // //               </button>
// // // // // //             );
// // // // // //           })}

// // // // // //           <button
// // // // // //             onClick={() => setCurrentPage(currentPage + 1)}
// // // // // //             disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
// // // // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // // // //           >
// // // // // //             &gt;
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {showAddModal && (
// // // // // //           <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
// // // // // //         )}

// // // // // //         {editModalVisible && selectedMaterial && (
// // // // // //           <EditMaterialForm
// // // // // //             materialData={selectedMaterial}
// // // // // //             onClose={handleCloseEditModal}
// // // // // //             onMaterialUpdated={handleMaterialUpdated}
// // // // // //           />
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </Layout>
// // // // // //   );
// // // // // // };

// // // // // // export default InventoryPage;


// // // // // "use client";

// // // // // import React, { useState } from "react";
// // // // // import AddMaterialModal from "../components/AddMaterialsForm";
// // // // // import EditMaterialForm from "../components/EditMaterialsModal";
// // // // // import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa"; // Import the trash icon
// // // // // import Layout from "../components/Layout";
// // // // // import Image from "next/image";
// // // // // import { useFetchMaterials } from "../hooks/useFetchMaterials";
// // // // // import { MaterialData } from "../utils/types";

// // // // // const InventoryPage: React.FC = () => {
// // // // //   const { materials, loading, error, setMaterials } = useFetchMaterials();
// // // // //   const [searchTerm] = useState("");
// // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // //   const [editModalVisible, setEditModalVisible] = useState(false);
// // // // //   const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const itemsPerPage = 8;

// // // // //   const placeholderImage = "/images/duracem.jpg";
// // // // //   const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

// // // // //   const filteredMaterials = materials
// // // // //     .filter((material) =>
// // // // //       material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //     )
// // // // //     .reverse();

// // // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // // //   const currentMaterials = filteredMaterials.slice(
// // // // //     indexOfFirstItem,
// // // // //     indexOfLastItem
// // // // //   );

// // // // //   const handleAddNewClick = () => setShowAddModal(true);
// // // // //   const handleCloseModal = () => setShowAddModal(false);

// // // // //   const handleEditClick = (material: MaterialData) => {
// // // // //     setSelectedMaterial(material);
// // // // //     setEditModalVisible(true);
// // // // //   };

// // // // //   const handleCloseEditModal = () => {
// // // // //     setEditModalVisible(false);
// // // // //     setSelectedMaterial(null);
// // // // //   };

// // // // //   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
// // // // //     const updatedMaterials = materials.map((material) =>
// // // // //       material.material_id === updatedMaterial.material_id
// // // // //         ? updatedMaterial
// // // // //         : material
// // // // //     );
// // // // //     setMaterials(updatedMaterials);
// // // // //   };

// // // // //   const handleMaterialAdded = (newMaterial: MaterialData) => {
// // // // //     setMaterials([newMaterial, ...materials]);
// // // // //     setCurrentPage(1);
// // // // //     setShowAddModal(false);
// // // // //   };

// // // // //   const handleDelete = async (materialId: number) => {
// // // // //     try {
// // // // //       // Make DELETE request to the backend
// // // // //       const response = await fetch(`/api/materials/${materialId}`, {
// // // // //         method: "DELETE",
// // // // //       });
      
// // // // //       if (response.ok) {
// // // // //         // Filter out the deleted material from the materials state
// // // // //         setMaterials(materials.filter((material) => material.material_id !== materialId));
// // // // //       } else {
// // // // //         console.error("Failed to delete material:", response.statusText);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error deleting material:", error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Layout>
// // // // //       <div className="p-4 flex flex-col mt-[80px]">
// // // // //         <h2 className="text-4xl font-bold">Inventory</h2>
// // // // //         <div className="flex justify-end items-center mb-6">
// // // // //           <button
// // // // //             className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
// // // // //             onClick={handleAddNewClick}
// // // // //           >
// // // // //             <FaPlus className="mr-2" /> Add New
// // // // //           </button>
// // // // //         </div>

// // // // //         {loading ? (
// // // // //           <p>Loading materials...</p>
// // // // //         ) : error ? (
// // // // //           <p className="text-red-500">{error}</p>
// // // // //         ) : (
// // // // //           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
// // // // //             <table className="min-w-full w-full mt-4">
// // // // //               <thead className="bg-gray-50">
// // // // //                 <tr>
// // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // //                     Material
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // //                     Brand
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // //                     Price
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // //                     Quantity
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // // //                     Action
// // // // //                   </th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="bg-white divide-y divide-gray-200 text-xl">
// // // // //                 {currentMaterials.map((material) => (
// // // // //                   <tr key={material.material_id}>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // //                       <div className="flex items-center">
// // // // //                         <Image
// // // // //                           src={
// // // // //                             material.image
// // // // //                               ? `${mediaUrl}${material.image}`
// // // // //                               : placeholderImage
// // // // //                           }
// // // // //                           alt={material.material_name}
// // // // //                           width={40}
// // // // //                           height={40}
// // // // //                           className="w-10 h-10 rounded-full mr-3"
// // // // //                         />
// // // // //                         <span>{material.material_name}</span>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // //                       {material.brand_name}
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // //                       KES {material.price}
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // //                       {material.quantity}
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // // // //                       <button
// // // // //                         onClick={() => handleEditClick(material)}
// // // // //                         className="text-green-600 hover:text-green-900 mr-3"
// // // // //                       >
// // // // //                         <FaPencilAlt className="w-6 h-6" />
// // // // //                       </button>
// // // // //                       <button
// // // // //                         onClick={() => handleDelete(material.material_id)}
// // // // //                         className="text-red-600 hover:text-red-900"
// // // // //                       >
// // // // //                         <FaTrash className="w-6 h-6" />
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Pagination Buttons */}
// // // // //         <div className="flex justify-end mt-4 mb-4">
// // // // //           <button
// // // // //             onClick={() => setCurrentPage(currentPage - 1)}
// // // // //             disabled={currentPage === 1}
// // // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // // //           >
// // // // //             &lt;
// // // // //           </button>

// // // // //           {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
// // // // //             const pageNum = index + 1;
// // // // //             return (
// // // // //               <button
// // // // //                 key={index}
// // // // //                 onClick={() => setCurrentPage(pageNum)}
// // // // //                 className={`px-4 py-2 mx-1 rounded-md ${
// // // // //                   currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
// // // // //                 }`}
// // // // //               >
// // // // //                 {pageNum}
// // // // //               </button>
// // // // //             );
// // // // //           })}

// // // // //           <button
// // // // //             onClick={() => setCurrentPage(currentPage + 1)}
// // // // //             disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
// // // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // // //           >
// // // // //             &gt;
// // // // //           </button>
// // // // //         </div>

// // // // //         {showAddModal && (
// // // // //           <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
// // // // //         )}

// // // // //         {editModalVisible && selectedMaterial && (
// // // // //           <EditMaterialForm
// // // // //             materialData={selectedMaterial}
// // // // //             onClose={handleCloseEditModal}
// // // // //             onMaterialUpdated={handleMaterialUpdated}
// // // // //           />
// // // // //         )}
// // // // //       </div>
// // // // //     </Layout>
// // // // //   );
// // // // // };

// // // // // export default InventoryPage;


// // // // "use client";

// // // // import React, { useState } from "react";
// // // // import AddMaterialModal from "../components/AddMaterialsForm";
// // // // import EditMaterialForm from "../components/EditMaterialsModal";
// // // // import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
// // // // import Layout from "../components/Layout";
// // // // import Image from "next/image";
// // // // import { useFetchMaterials } from "../hooks/useFetchMaterials";
// // // // import { MaterialData } from "../utils/types";

// // // // const InventoryPage: React.FC = () => {
// // // //   const { materials, loading, error, setMaterials } = useFetchMaterials();
// // // //   const [searchTerm] = useState("");
// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [editModalVisible, setEditModalVisible] = useState(false);
// // // //   const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const itemsPerPage = 8;

// // // //   const placeholderImage = "/images/duracem.jpg";
// // // //   const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

// // // //   const filteredMaterials = materials
// // // //     .filter((material) =>
// // // //       material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
// // // //     )
// // // //     .reverse();

// // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //   const currentMaterials = filteredMaterials.slice(
// // // //     indexOfFirstItem,
// // // //     indexOfLastItem
// // // //   );

// // // //   const handleAddNewClick = () => setShowAddModal(true);
// // // //   const handleCloseModal = () => setShowAddModal(false);

// // // //   const handleEditClick = (material: MaterialData) => {
// // // //     setSelectedMaterial(material);
// // // //     setEditModalVisible(true);
// // // //   };

// // // //   const handleCloseEditModal = () => {
// // // //     setEditModalVisible(false);
// // // //     setSelectedMaterial(null);
// // // //   };

// // // //   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
// // // //     const updatedMaterials = materials.map((material) =>
// // // //       material.material_id === updatedMaterial.material_id
// // // //         ? updatedMaterial
// // // //         : material
// // // //     );
// // // //     setMaterials(updatedMaterials);
// // // //   };

// // // //   const handleMaterialAdded = (newMaterial: MaterialData) => {
// // // //     setMaterials([newMaterial, ...materials]);
// // // //     setCurrentPage(1);
// // // //     setShowAddModal(false);
// // // //   };

// // // //   const handleDeleteClick = async (materialId: number) => {
// // // //     const confirmed = confirm("Are you sure you want to delete this material?");
// // // //     if (!confirmed) return;

// // // //     try {
// // // //       const response = await fetch(`/api/materials/${materialId}`, {
// // // //         method: "DELETE",
// // // //       });

// // // //       if (response.ok) {
// // // //         setMaterials((prevMaterials) =>
// // // //           prevMaterials.filter((material) => material.material_id !== materialId)
// // // //         );
// // // //       } else {
// // // //         console.error("Failed to delete the material.");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("An error occurred:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Layout>
// // // //       <div className="p-4 flex flex-col mt-[80px]">
// // // //         <h2 className="text-4xl font-bold">Inventory</h2>
// // // //         <div className="flex justify-end items-center mb-6">
// // // //           <button
// // // //             className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
// // // //             onClick={handleAddNewClick}
// // // //           >
// // // //             <FaPlus className="mr-2" /> Add New
// // // //           </button>
// // // //         </div>

// // // //         {loading ? (
// // // //           <p>Loading materials...</p>
// // // //         ) : error ? (
// // // //           <p className="text-red-500">{error}</p>
// // // //         ) : (
// // // //           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
// // // //             <table className="min-w-full w-full mt-4">
// // // //               <thead className="bg-gray-50">
// // // //                 <tr>
// // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // //                     Material
// // // //                   </th>
// // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // //                     Brand
// // // //                   </th>
// // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // //                     Price
// // // //                   </th>
// // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // //                     Quantity
// // // //                   </th>
// // // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // // //                     Action
// // // //                   </th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="bg-white divide-y divide-gray-200 text-xl">
// // // //                 {currentMaterials.map((material) => (
// // // //                   <tr key={material.material_id}>
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       <div className="flex items-center">
// // // //                         <Image
// // // //                           src={
// // // //                             material.image
// // // //                               ? `${mediaUrl}${material.image}`
// // // //                               : placeholderImage
// // // //                           }
// // // //                           alt={material.material_name}
// // // //                           width={40}
// // // //                           height={40}
// // // //                           className="w-10 h-10 rounded-full mr-3"
// // // //                         />
// // // //                         <span>{material.material_name}</span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       {material.brand_name}
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       KES {material.price}
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       {material.quantity}
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // // //                       <button
// // // //                         onClick={() => handleEditClick(material)}
// // // //                         className="text-green-600 hover:text-green-900 mr-3"
// // // //                       >
// // // //                         <FaPencilAlt className="w-6 h-6" />
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => handleDeleteClick(material.material_id)}
// // // //                         className="text-red-600 hover:text-red-900"
// // // //                       >
// // // //                         <FaTrash className="w-6 h-6" />
// // // //                       </button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         )}

// // // //         {/* Pagination Buttons */}
// // // //         <div className="flex justify-end mt-4 mb-4">
// // // //           <button
// // // //             onClick={() => setCurrentPage(currentPage - 1)}
// // // //             disabled={currentPage === 1}
// // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // //           >
// // // //             &lt;
// // // //           </button>

// // // //           {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
// // // //             const pageNum = index + 1;
// // // //             return (
// // // //               <button
// // // //                 key={index}
// // // //                 onClick={() => setCurrentPage(pageNum)}
// // // //                 className={`px-4 py-2 mx-1 rounded-md ${
// // // //                   currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
// // // //                 }`}
// // // //               >
// // // //                 {pageNum}
// // // //               </button>
// // // //             );
// // // //           })}

// // // //           <button
// // // //             onClick={() => setCurrentPage(currentPage + 1)}
// // // //             disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
// // // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // // //           >
// // // //             &gt;
// // // //           </button>
// // // //         </div>

// // // //         {showAddModal && (
// // // //           <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
// // // //         )}

// // // //         {editModalVisible && selectedMaterial && (
// // // //           <EditMaterialForm
// // // //             materialData={selectedMaterial}
// // // //             onClose={handleCloseEditModal}
// // // //             onMaterialUpdated={handleMaterialUpdated}
// // // //           />
// // // //         )}
// // // //       </div>
// // // //     </Layout>
// // // //   );
// // // // };

// // // // export default InventoryPage;


// // // "use client";

// // // import React, { useState } from "react";
// // // import AddMaterialModal from "../components/AddMaterialsForm";
// // // import EditMaterialForm from "../components/EditMaterialsModal";
// // // import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
// // // import Layout from "../components/Layout";
// // // import Image from "next/image";
// // // import { useFetchMaterials } from "../hooks/useFetchMaterials";
// // // import { MaterialData } from "../utils/types";

// // // const InventoryPage: React.FC = () => {
// // //   const { materials, loading, error, setMaterials } = useFetchMaterials();
// // //   const [searchTerm] = useState("");
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [editModalVisible, setEditModalVisible] = useState(false);
// // //   const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 8;

// // //   const placeholderImage = "/images/duracem.jpg";
// // //   const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

// // //   const filteredMaterials = materials
// // //     .filter((material: { material_name: string }) =>
// // //       material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
// // //     )
// // //     .reverse();

// // //   const indexOfLastItem = currentPage * itemsPerPage;
// // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //   const currentMaterials = filteredMaterials.slice(
// // //     indexOfFirstItem,
// // //     indexOfLastItem
// // //   );

// // //   const handleAddNewClick = () => setShowAddModal(true);
// // //   const handleCloseModal = () => setShowAddModal(false);

// // //   const handleEditClick = (material: MaterialData) => {
// // //     setSelectedMaterial(material);
// // //     setEditModalVisible(true);
// // //   };

// // //   const handleCloseEditModal = () => {
// // //     setEditModalVisible(false);
// // //     setSelectedMaterial(null);
// // //   };

// // //   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
// // //     const updatedMaterials = materials.map((material) =>
// // //       material.material_id === updatedMaterial.material_id
// // //         ? updatedMaterial
// // //         : material
// // //     );
// // //     setMaterials(updatedMaterials);
// // //   };

// // //   const handleMaterialAdded = (newMaterial: MaterialData) => {
// // //     setMaterials([newMaterial, ...materials]);
// // //     setCurrentPage(1);
// // //     setShowAddModal(false);
// // //   };

// // //   const handleDeleteClick = async (materialId: number) => {
// // //     try {
// // //       // Send request to delete material from backend (optional if you have backend API)
// // //       await fetch(`${process.env.MEDIA_URL}/delete-material/${materialId}`, {
// // //         method: "DELETE",
// // //       });

// // //       // Remove the deleted material from the state
// // //       const updatedMaterials = materials.filter((material) => material.material_id !== materialId);
// // //       setMaterials(updatedMaterials);
// // //     } catch (error) {
// // //       console.error("Error deleting material:", error);
// // //     }
// // //   };

// // //   return (
// // //     <Layout>
// // //       <div className="p-4 flex flex-col mt-[80px]">
// // //         <h2 className="text-4xl font-bold">Inventory</h2>
// // //         <div className="flex justify-end items-center mb-6">
// // //           <button
// // //             className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
// // //             onClick={handleAddNewClick}
// // //           >
// // //             <FaPlus className="mr-2" /> Add New
// // //           </button>
// // //         </div>

// // //         {loading ? (
// // //           <p>Loading materials...</p>
// // //         ) : error ? (
// // //           <p className="text-red-500">{error}</p>
// // //         ) : (
// // //           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
// // //             <table className="min-w-full w-full mt-4">
// // //               <thead className="bg-gray-50">
// // //                 <tr>
// // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // //                     Material
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // //                     Brand
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // //                     Price
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // //                     Quantity
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// // //                     Action
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="bg-white divide-y divide-gray-200 text-xl">
// // //                 {currentMaterials.map((material) => (
// // //                   <tr key={material.material_id}>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="flex items-center">
// // //                         <Image
// // //                           src={
// // //                             material.image
// // //                               ? `${mediaUrl}${material.image}`
// // //                               : placeholderImage
// // //                           }
// // //                           alt={material.material_name}
// // //                           width={40}
// // //                           height={40}
// // //                           className="w-10 h-10 rounded-full mr-3"
// // //                         />
// // //                         <span>{material.material_name}</span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {material.brand_name}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       KES {material.price}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {material.quantity}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // //                       <button
// // //                         onClick={() => handleEditClick(material)}
// // //                         className="text-green-600 hover:text-green-900 mr-3"
// // //                       >
// // //                         <FaPencilAlt className="w-6 h-6" />
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleDeleteClick(material.material_id)}
// // //                         className="text-red-600 hover:text-red-900"
// // //                       >
// // //                         <FaTrash className="w-6 h-6" />
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* Pagination Buttons */}
// // //         <div className="flex justify-end mt-4 mb-4">
// // //           <button
// // //             onClick={() => setCurrentPage(currentPage - 1)}
// // //             disabled={currentPage === 1}
// // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // //           >
// // //             &lt;
// // //           </button>

// // //           {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
// // //             const pageNum = index + 1;
// // //             return (
// // //               <button
// // //                 key={index}
// // //                 onClick={() => setCurrentPage(pageNum)}
// // //                 className={`px-4 py-2 mx-1 rounded-md ${
// // //                   currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
// // //                 }`}
// // //               >
// // //                 {pageNum}
// // //               </button>
// // //             );
// // //           })}

// // //           <button
// // //             onClick={() => setCurrentPage(currentPage + 1)}
// // //             disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
// // //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// // //           >
// // //             &gt;
// // //           </button>
// // //         </div>

// // //         {showAddModal && (
// // //           <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
// // //         )}

// // //         {editModalVisible && selectedMaterial && (
// // //           <EditMaterialForm
// // //             materialData={selectedMaterial}
// // //             onClose={handleCloseEditModal}
// // //             onMaterialUpdated={handleMaterialUpdated}
// // //           />
// // //         )}
// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default InventoryPage;



// // "use client";

// // import React, { useState } from "react";
// // import AddMaterialModal from "../components/AddMaterialsForm";
// // import EditMaterialForm from "../components/EditMaterialsModal";
// // import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
// // import Layout from "../components/Layout";
// // import Image from "next/image";
// // import { useFetchMaterials } from "../hooks/useFetchMaterials";
// // import { MaterialData } from "../utils/types";

// // const InventoryPage: React.FC = () => {
// //   const { materials, loading, error, setMaterials } = useFetchMaterials();
// //   const [searchTerm] = useState("");
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [editModalVisible, setEditModalVisible] = useState(false);
// //   const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 8;

// //   const placeholderImage = "/images/duracem.jpg";
// //   const baseUrl = process.env.BASE_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

// //   const filteredMaterials = materials
// //     .filter((material) => material.material_name.toLowerCase().includes(searchTerm.toLowerCase()))
// //     .reverse();

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentMaterials = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);

// //   const handleAddNewClick = () => setShowAddModal(true);
// //   const handleCloseModal = () => setShowAddModal(false);

// //   const handleEditClick = (material: MaterialData) => {
// //     setSelectedMaterial(material);
// //     setEditModalVisible(true);
// //   };

// //   const handleCloseEditModal = () => {
// //     setEditModalVisible(false);
// //     setSelectedMaterial(null);
// //   };

// //   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
// //     const updatedMaterials = materials.map((material) =>
// //       material.material_id === updatedMaterial.material_id ? updatedMaterial : material
// //     );
// //     setMaterials(updatedMaterials);
// //   };

// //   const handleMaterialAdded = (newMaterial: MaterialData) => {
// //     setMaterials([newMaterial, ...materials]);
// //     setCurrentPage(1);
// //     setShowAddModal(false);
// //   };

// //   const handleDeleteClick = async (materialId: number) => {
// //     try {
// //       // Send delete request to the backend
// //       const response = await fetch(`${baseUrl}/api/material/${materialId}/`, {
// //         method: "DELETE",
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to delete material");
// //       }

// //       // Update the materials state
// //       const updatedMaterials = materials.filter((material) => material.material_id !== materialId);
// //       setMaterials(updatedMaterials);
// //     } catch (error) {
// //       console.error("Error deleting material:", error);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="p-4 flex flex-col mt-[80px]">
// //         <h2 className="text-4xl font-bold">Inventory</h2>
// //         <div className="flex justify-end items-center mb-6">
// //           <button
// //             className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
// //             onClick={handleAddNewClick}
// //           >
// //             <FaPlus className="mr-2" /> Add New
// //           </button>
// //         </div>

// //         {loading ? (
// //           <p>Loading materials...</p>
// //         ) : error ? (
// //           <p className="text-red-500">{error}</p>
// //         ) : (
// //           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
// //             <table className="min-w-full w-full mt-4">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// //                     Material
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// //                     Brand
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// //                     Price
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// //                     Quantity
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
// //                     Action
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200 text-xl">
// //                 {currentMaterials.map((material) => (
// //                   <tr key={material.material_id}>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex items-center">
// //                         <Image
// //                           src={
// //                             material.image
// //                               ? `${baseUrl}${material.image}`
// //                               : placeholderImage
// //                           }
// //                           alt={material.material_name}
// //                           width={40}
// //                           height={40}
// //                           className="w-10 h-10 rounded-full mr-3"
// //                         />
// //                         <span>{material.material_name}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">{material.brand_name}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap">KES {material.price}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap">{material.quantity}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                       <button
// //                         onClick={() => handleEditClick(material)}
// //                         className="text-green-600 hover:text-green-900 mr-3"
// //                       >
// //                         <FaPencilAlt className="w-6 h-6" />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteClick(material.material_id)}
// //                         className="text-red-600 hover:text-red-900"
// //                       >
// //                         <FaTrash className="w-6 h-6" />
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Pagination Buttons */}
// //         <div className="flex justify-end mt-4 mb-4">
// //           <button
// //             onClick={() => setCurrentPage(currentPage - 1)}
// //             disabled={currentPage === 1}
// //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// //           >
// //             &lt;
// //           </button>

// //           {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
// //             const pageNum = index + 1;
// //             return (
// //               <button
// //                 key={index}
// //                 onClick={() => setCurrentPage(pageNum)}
// //                 className={`px-4 py-2 mx-1 rounded-md ${
// //                   currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
// //                 }`}
// //               >
// //                 {pageNum}
// //               </button>
// //             );
// //           })}

// //           <button
// //             onClick={() => setCurrentPage(currentPage + 1)}
// //             disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
// //             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
// //           >
// //             &gt;
// //           </button>
// //         </div>

// //         {showAddModal && (
// //           <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
// //         )}

// //         {editModalVisible && selectedMaterial && (
// //           <EditMaterialForm
// //             materialData={selectedMaterial}
// //             onClose={handleCloseEditModal}
// //             onMaterialUpdated={handleMaterialUpdated}
// //           />
// //         )}
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default InventoryPage;


// "use client";

// import React, { useState } from "react";
// import AddMaterialModal from "../components/AddMaterialsForm";
// import EditMaterialForm from "../components/EditMaterialsModal";
// import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
// import Layout from "../components/Layout";
// import Image from "next/image";
// import { useFetchMaterials } from "../hooks/useFetchMaterials";
// import { MaterialData } from "../utils/types";

// const InventoryPage: React.FC = () => {
//   const { materials, loading, error, setMaterials } = useFetchMaterials();
//   const [searchTerm] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [materialToDelete, setMaterialToDelete] = useState<MaterialData | null>(null);

//   const placeholderImage = "/images/duracem.jpg";
//   const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

//   const filteredMaterials = materials
//     .filter((material: { material_name: string }) =>
//       material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .reverse();

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMaterials = filteredMaterials.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const handleAddNewClick = () => setShowAddModal(true);
//   const handleCloseModal = () => setShowAddModal(false);

//   const handleEditClick = (material: MaterialData) => {
//     setSelectedMaterial(material);
//     setEditModalVisible(true);
//   };

//   const handleCloseEditModal = () => {
//     setEditModalVisible(false);
//     setSelectedMaterial(null);
//   };

//   const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
//     const updatedMaterials = materials.map((material) =>
//       material.material_id === updatedMaterial.material_id
//         ? updatedMaterial
//         : material
//     );
//     setMaterials(updatedMaterials);
//   };

//   const handleMaterialAdded = (newMaterial: MaterialData) => {
//     setMaterials([newMaterial, ...materials]);
//     setCurrentPage(1);
//     setShowAddModal(false);
//   };

//   const handleDeleteClick = (material: MaterialData) => {
//     setMaterialToDelete(material);
//     setShowDeleteConfirmation(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!materialToDelete) return;
//     try {
//       // Send request to delete material from backend (optional if you have backend API)
//       await fetch(`${process.env.MEDIA_URL}/delete-material/${materialToDelete.material_id}`, {
//         method: "DELETE",
//       });

//       // Remove the deleted material from the state
//       const updatedMaterials = materials.filter((material) => material.material_id !== materialToDelete.material_id);
//       setMaterials(updatedMaterials);
//       setShowDeleteConfirmation(false);
//       setMaterialToDelete(null);
//     } catch (error) {
//       console.error("Error deleting material:", error);
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteConfirmation(false);
//     setMaterialToDelete(null);
//   };

//   return (
//     <Layout>
//       <div className="p-4 flex flex-col mt-[80px]">
//         <h2 className="text-4xl font-bold">Inventory</h2>
//         <div className="flex justify-end items-center mb-6">
//           <button
//             className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
//             onClick={handleAddNewClick}
//           >
//             <FaPlus className="mr-2" /> Add New
//           </button>
//         </div>

//         {loading ? (
//           <p>Loading materials...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
//             <table className="min-w-full w-full mt-4">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
//                     Material
//                   </th>
//                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
//                     Brand
//                   </th>
//                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
//                     Quantity
//                   </th>
//                   <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200 text-xl">
//                 {currentMaterials.map((material) => (
//                   <tr key={material.material_id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <Image
//                           src={
//                             material.image
//                               ? `${mediaUrl}${material.image}`
//                               : placeholderImage
//                           }
//                           alt={material.material_name}
//                           width={40}
//                           height={40}
//                           className="w-10 h-10 rounded-full mr-3"
//                         />
//                         <span>{material.material_name}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {material.brand_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       KES {material.price}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {material.quantity}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleEditClick(material)}
//                         className="text-green-600 hover:text-green-900 mr-3"
//                       >
//                         <FaPencilAlt className="w-6 h-6" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(material)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         <FaTrash className="w-6 h-6" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination Buttons */}
//         <div className="flex justify-end mt-4 mb-4">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
//           >
//             &lt;
//           </button>

//           {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
//             const pageNum = index + 1;
//             return (
//               <button
//                 key={index}
//                 onClick={() => setCurrentPage(pageNum)}
//                 className={`px-4 py-2 mx-1 rounded-md ${
//                   currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             );
//           })}

//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
//             className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
//           >
//             &gt;
//           </button>
//         </div>

//         {showAddModal && (
//           <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
//         )}

//         {editModalVisible && selectedMaterial && (
//           <EditMaterialForm
//             materialData={selectedMaterial}
//             onClose={handleCloseEditModal}
//             onMaterialUpdated={handleMaterialUpdated}
//           />
//         )}

//         {/* Delete Confirmation Modal */}
//         {showDeleteConfirmation && (
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <h3 className="text-lg font-semibold mb-4">
//                 Are you sure you want to delete this material?
//               </h3>
//               <div>
//                 <button
//                   onClick={handleConfirmDelete}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md mr-4"
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={handleCancelDelete}
//                   className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default InventoryPage;


"use client";

import React, { useState } from "react";
import AddMaterialModal from "../components/AddMaterialsForm";
import EditMaterialForm from "../components/EditMaterialsModal";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";
import Image from "next/image";
import { useFetchMaterials } from "../hooks/useFetchMaterials";
import { MaterialData } from "../utils/types";

const InventoryPage: React.FC = () => {
  const { materials, loading, error, setMaterials } = useFetchMaterials();
  const [searchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<MaterialData | null>(null);
  const itemsPerPage = 8;

  const placeholderImage = "/images/duracem.jpg";
  const mediaUrl = process.env.MEDIA_URL || 'https://buildmart-42eabdb55b17.herokuapp.com';

  const filteredMaterials = materials
    .filter((material: { material_name: string }) =>
      material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = filteredMaterials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleAddNewClick = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);

  const handleEditClick = (material: MaterialData) => {
    setSelectedMaterial(material);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setSelectedMaterial(null);
  };

  const handleMaterialUpdated = (updatedMaterial: MaterialData) => {
    const updatedMaterials = materials.map((material) =>
      material.material_id === updatedMaterial.material_id
        ? updatedMaterial
        : material
    );
    setMaterials(updatedMaterials);
  };

  const handleMaterialAdded = (newMaterial: MaterialData) => {
    setMaterials([newMaterial, ...materials]);
    setCurrentPage(1);
    setShowAddModal(false);
  };

  const handleDeleteClick = (material: MaterialData) => {
    setMaterialToDelete(material);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setMaterialToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    if (!materialToDelete || !materialToDelete.material_id) {
      console.error("No material selected for deletion.");
      return; // Early exit if there's no material or ID
    }

    try {
      // Send request to delete material from backend
      await fetch(`${process.env.MEDIA_URL}/delete-material/${materialToDelete.material_id}`, {
        method: "DELETE",
      });

      // Remove the deleted material from the state
      const updatedMaterials = materials.filter(
        (material) => material.material_id !== materialToDelete.material_id
      );
      setMaterials(updatedMaterials);
      setShowDeleteConfirmation(false);
      setMaterialToDelete(null);
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <Layout>
      <div className="p-4 flex flex-col mt-[80px]">
        <h2 className="text-4xl font-bold">Inventory</h2>
        <div className="flex justify-end items-center mb-6">
          <button
            className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleAddNewClick}
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>

        {loading ? (
          <p>Loading materials...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow flex-grow overflow-x-auto">
            <table className="min-w-full w-full mt-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xl">
                {currentMaterials.map((material) => (
                  <tr key={material.material_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={
                            material.image
                              ? `${mediaUrl}${material.image}`
                              : placeholderImage
                          }
                          alt={material.material_name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{material.material_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {material.brand_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      KES {material.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {material.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(material)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <FaPencilAlt className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(material)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Buttons */}
        <div className="flex justify-end mt-4 mb-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            &lt;
          </button>

          {[...Array(Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage)))].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === pageNum ? "bg-[#F8B612] text-white" : "bg-gray-200"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            &gt;
          </button>
        </div>

        {showAddModal && (
          <AddMaterialModal onClose={handleCloseModal} onMaterialAdded={handleMaterialAdded} />
        )}

        {editModalVisible && selectedMaterial && (
          <EditMaterialForm
            materialData={selectedMaterial}
            onClose={handleCloseEditModal}
            onMaterialUpdated={handleMaterialUpdated}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && materialToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this material?</h3>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleConfirmDelete}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InventoryPage;
