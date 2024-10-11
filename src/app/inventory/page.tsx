"use client";

import React, { useState } from "react";
import { useFetchMaterials } from "@/app/hooks/useFetchMaterials";
import AddMaterialModal from "../components/AddMaterialsForm";
import EditMaterialForm from "../components/EditMaterialsModal";
import { FaPlus, FaPencilAlt } from "react-icons/fa";
import { MaterialData } from "@/app/utils/types";
import Layout from "../components/Layout";

const InventoryPage: React.FC = () => {
  const { materials, loading, error, setMaterials } = useFetchMaterials();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const placeholderImage = "/images/duracem.jpg";

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

  return (
    <Layout>
    <div className="p-4 flex flex-col mt-[80px]">
      <h2 className="text-4xl font-bold">Inventory</h2>
      <div className="flex justify-end items-center mb-6">
        <div className="flex items-center">
          <button
            className="bg-[#F8B612] text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleAddNewClick}
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>
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
                      <img
                        src={material.image || placeholderImage}
                        alt={material.material_name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{material.material_name}</span>
                    </div>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end mt-4 mb-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          &lt;
        </button>

        {[
          ...Array(
            Math.min(3, Math.ceil(filteredMaterials.length / itemsPerPage))
          ),
        ].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === pageNum
                  ? "bg-[#F8B612] text-white"
                  : "bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)
          }
          className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      {showAddModal && (
        <AddMaterialModal
          onClose={handleCloseModal}
          onMaterialAdded={handleMaterialAdded}
        />
      )}
      {editModalVisible && selectedMaterial && (
        <EditMaterialForm
          materialData={selectedMaterial}
          onClose={handleCloseEditModal}
          onMaterialUpdated={handleMaterialUpdated}
        />
      )}
    </div>
    </Layout>
  );
};

export default InventoryPage;
