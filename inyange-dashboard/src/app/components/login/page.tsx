

'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import userlogin from '../utils/userlogin';


const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  type FormData = yup.InferType<typeof schema>;
const Login = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
      resolver: yupResolver(schema),
    });
    const [apiError, setApiError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const onSubmit = async (data: FormData) => {
      console.log('Login submitted', data);
      const response = await userlogin(data);
      if (response){
        setSuccessMessage("Logged in successfully! Let's go to your page .....")
        setTimeout(() => router.push("/home"), 1500)
      }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://buildmart-42eabdb55b17.herokuapp.com/auth/login_sso';
      };


  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Log in to continue to BuildMart</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                    type={passwordVisible ? "text" : "password"}
  id="password"
  {...register('password')}
  className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
  placeholder="Password"
                />
                {passwordVisible &&(
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                    {passwordVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}

                </button>
)}
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#263C5A] text-white py-2 px-4 rounded-md  transition duration-300"
            >
              Login
            </button>
            
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
          <button
          onClick={handleGoogleLogin}
            className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Image src="/images/google.png" alt="Google" width={20} height={20} className="mr-2"  />
            Continue with Google
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-blue-100 relative">
        <Image
          src="/images/construction.png"
          alt="Construction site"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Login;