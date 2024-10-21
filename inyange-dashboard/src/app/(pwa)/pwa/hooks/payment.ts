import { useState } from "react";
export const usePayment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const processPayment = async (amount: string, phone_number: string) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const paymentRequest = { amount, phone_number };
      const API_URL = "https://buildmart-42eabdb55b17.herokuapp.com/process_payment/";
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(paymentRequest),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
      }
      const data = await response.json();
      setSuccessMessage(data.CustomerMessage || 'Payment request processed successfully.');
      return data;
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      setErrorMessage((error as Error).message || 'An error occurred during payment initiation.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  return { processPayment, isSubmitting, errorMessage, successMessage };
};



