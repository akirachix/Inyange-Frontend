import { useState } from "react";
export const usePayment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages
  const [successMessage, setSuccessMessage] = useState(''); // For displaying success messages
  // Function to trigger the payment request
  const processPayment = async (amount: string, phone_number: string) => {
    setIsSubmitting(true);
    setErrorMessage(''); // Reset previous error message
    setSuccessMessage(''); // Reset previous success message
    try {
      const paymentRequest = { amount, phone_number }; // Prepare data to send
      // Adjust this URL to your backend
      const API_URL = "https://buildmart-42eabdb55b17.herokuapp.com/process_payment/"; // Your endpoint
      // Send request to your backend to initiate the payment
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(paymentRequest),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle errors
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
      }
      // Parse response data
      const data = await response.json();
      // Handle success response
      setSuccessMessage(data.CustomerMessage || 'Payment request processed successfully.');
      return data; // Return data for further handling if needed
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      setErrorMessage((error as Error).message || 'An error occurred during payment initiation.');
      throw error; // Propagate error to be handled by the caller
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };
  return { processPayment, isSubmitting, errorMessage, successMessage }; // Return the necessary state and functions
};