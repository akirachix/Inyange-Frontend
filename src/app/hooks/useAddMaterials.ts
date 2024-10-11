import { MaterialData } from "../../app/utils/types";
import { useState } from "react";
import { addMaterial } from "../../app/utils/addMaterials";

export const useAddMaterials = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitMaterials = async (details: MaterialData) => {
    console.log("Submitting materials:", details);
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await addMaterial(details);
      console.log("Submission successful:", result);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitMaterials, isSubmitting, error };
};
