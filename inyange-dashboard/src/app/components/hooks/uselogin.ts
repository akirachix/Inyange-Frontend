
import { useState } from 'react';
const uselogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userLogin = async (loginData: { email: string; password: string }) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const { data, error } = await userLogin(loginData);
      if (error) {
        setErrorMessage(error);
      } else {
        setSuccessMessage('Login successful!');
        return data;
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    isSubmitting,
    errorMessage,
    successMessage,
    userLogin,
  };
};
export default uselogin;