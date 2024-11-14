import { useState } from "react";

export const useDeleteMaterial = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteMaterial = async (materialId: string) => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch(`/api/material/${materialId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete material with id: ${materialId}`);
      }

      // Optionally, you might want to handle the response or perform additional actions
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Unknown error occurred during deletion");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteMaterial, isDeleting, deleteError };
};
