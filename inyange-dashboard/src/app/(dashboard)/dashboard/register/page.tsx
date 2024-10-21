// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Image from "next/image";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { getCookie, setCookie } from "cookies-next";
// import toast from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";

// interface UserData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   username: string;
//   phone_number: string;
//   user_role: string;
//   location: string;
// }

// const signupSchema = yup.object().shape({
//   first_name: yup.string().required("First Name is required"),
//   last_name: yup.string().required("Last Name is required"),
//   phone_number: yup.string().required("Phone number is required"),
//   email: yup
//     .string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   location: yup.string().required("Location is required"),
//   username: yup.string().required("Username is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters long"),
//   user_role: yup
//     .string()
//     .required("Role is required")
//     .oneOf(["homeowner", "supplier"], "Invalid role selected"),
// });

// const locations = ["Nairobi", "Nakuru", "Mombasa", "Kiambu", "Thika"];

// const SignUpForm = () => {
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(signupSchema),
//     mode: "onBlur",
//   });

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const onSubmit = async (data: UserData) => {
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     try {
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         setCookie("first_name", data.first_name, { maxAge: 60 * 60 * 24 });
//         setCookie("last_name", data.last_name, { maxAge: 60 * 60 * 24 });
//         setCookie("phone_number", data.phone_number, { maxAge: 60 * 60 * 24 });
//         setCookie("role", data.user_role, { maxAge: 60 * 60 * 24 });

//         setSuccessMessage("Account created successfully! Redirecting...");
//         toast.success("Account created successfully! Redirecting...");

//         router.push("/dashboard/login");
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(
//           errorData.message || "Signup failed. Please try again."
//         );
//         toast.error(errorData.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Sign-up error:", error);
//       setErrorMessage(
//         "An error occurred during signup. Please check your network connection and try again."
//       );
//       toast.error(
//         "An error occurred during signup. Please check your network connection and try again."
//       );
//     }
//   };
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center items-center">
//         <div className="w-full max-w-3xl bg-white p-6 lg:p-10 rounded-xl shadow-xl">
//           <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-gray-800">
//             Sign Up
//           </h1>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-5 lg:space-y-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="First name *"
//                   {...register("first_name")}
//                   className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                     errors.first_name ? "border-red-500" : "border-gray-300"
//                   } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//                 />
//                 {errors.first_name && (
//                   <p className="text-red-500 text-xs lg:text-sm mt-1">
//                     {errors.first_name.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Last name *"
//                   {...register("last_name")}
//                   className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                     errors.last_name ? "border-red-500" : "border-gray-300"
//                   } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//                 />
//                 {errors.last_name && (
//                   <p className="text-red-500 text-xs lg:text-sm mt-1">
//                     {errors.last_name.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <input
//               type="tel"
//               placeholder="Phone number *"
//               {...register("phone_number")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.phone_number ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.phone_number && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.phone_number.message}
//               </p>
//             )}
//             <input
//               type="email"
//               placeholder="Email *"
//               {...register("email")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//             <input
//               type="text"
//               placeholder="Username *"
//               {...register("username")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.username.message}
//               </p>
//             )}
//             <select
//               {...register("user_role")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.user_role ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             >
//               <option value="">Select a role *</option>
//               <option value="homeowner">Homeowner</option>
//               <option value="supplier">Supplier</option>
//             </select>
//             {errors.user_role && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.user_role.message}
//               </p>
//             )}
//             <select
//               {...register("location")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.location ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             >
//               <option value="">Select your location *</option>
//               {locations.map((location, index) => (
//                 <option key={index} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//             {errors.location && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.location.message}
//               </p>
//             )}
//            <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 id="password"
//                 {...register("password")}
//                 className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pr-12`}
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
//               >
//                 {passwordVisible ? <FiEye size={24} /> : <FiEyeOff size={24} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 lg:py-4 px-4 bg-[#263C5A] text-base lg:text-lg font-semibold border border-transparent rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
//             >
//               Sign Up
//             </button>
//             {successMessage && (
//               <p className="mt-2 text-green-500 text-center text-sm">
//                 {successMessage}
//               </p>
//             )}
//             {errorMessage && (
//               <p className="mt-2 text-red-500 text-center text-sm">
//                 {errorMessage}
//               </p>
//             )}
//           </form>
//           <p className="mt-6 lg:mt-8 text-center text-sm lg:text-base text-gray-600">
//             Already have an account?{" "}
//             <Link
//               href="/dashboard/login"
//               className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//       <div className="hidden lg:block w-1/2 relative">
//         <Image
//           src="/images/construction.png"
//           alt="Construction site illustration"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Image from "next/image";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { getCookie, setCookie } from "cookies-next";
// import toast from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";

// interface UserData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   username: string;
//   phone_number: string;
//   user_role: string;
//   location: string;
// }

// const signupSchema = yup.object().shape({
//   first_name: yup.string().required("First Name is required"),
//   last_name: yup.string().required("Last Name is required"),
//   phone_number: yup.string().required("Phone number is required"),
//   email: yup
//     .string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   location: yup.string().required("Location is required"),
//   username: yup.string().required("Username is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters long"),
//   user_role: yup
//     .string()
//     .required("Role is required")
//     .oneOf(["homeowner", "supplier"], "Invalid role selected"),
// });

// const locations = ["Nairobi", "Nakuru", "Mombasa", "Kiambu", "Thika"];

// const SignUpForm = () => {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(signupSchema),
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     const user_role = getCookie("user_role");
//     const phone_number = getCookie("phone_number");
//     const splashTimeout = setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 2000);

//     if (user_role && phone_number) {
//       switch (user_role) {
//         case "homeowner":
//           router.push("/homeowner/homepage");
//           break;
//         case "dashboard":
//           router.push("/supplier/dashboard");
//           break;
//         default:
//           break;
//       }
//     }

//     return () => clearTimeout(splashTimeout);
//   }, [router]);

//   if (isSplashVisible) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Image
//           src="/images/bmLogo.png"
//           alt="Splash Screen"
//           width={200}
//           height={300}
//           className="max-w-full h-auto sm:w-1/2 md:w-3/4 lg:w-[250px] xl:w-[250px]"
//         />
//       </div>
//     );
//   }

//   const onSubmit = async (data: UserData) => {
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     try {
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         setCookie("first_name", data.first_name, { maxAge: 60 * 60 * 24 });
//         setCookie("last_name", data.last_name, { maxAge: 60 * 60 * 24 });
//         setCookie("phone_number", data.phone_number, { maxAge: 60 * 60 * 24 });
//         setCookie("role", data.user_role, { maxAge: 60 * 60 * 24 });

//         setSuccessMessage("Account created successfully! Redirecting...");
//         toast.success("Account created successfully! Redirecting...");

//         router.push("/dashboard/login");
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(
//           errorData.message || "Signup failed. Please try again."
//         );
//         toast.error(errorData.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Sign-up error:", error);
//       setErrorMessage(
//         "An error occurred during signup. Please check your network connection and try again."
//       );
//       toast.error(
//         "An error occurred during signup. Please check your network connection and try again."
//       );
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center items-center">
//         <div className="w-full max-w-3xl bg-white p-6 lg:p-10 rounded-xl shadow-xl">
//           <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-gray-800">
//             Sign Up
//           </h1>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-5 lg:space-y-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="First name *"
//                   {...register("first_name")}
//                   className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                     errors.first_name ? "border-red-500" : "border-gray-300"
//                   } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//                 />
//                 {errors.first_name && (
//                   <p className="text-red-500 text-xs lg:text-sm mt-1">
//                     {errors.first_name.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Last name *"
//                   {...register("last_name")}
//                   className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                     errors.last_name ? "border-red-500" : "border-gray-300"
//                   } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//                 />
//                 {errors.last_name && (
//                   <p className="text-red-500 text-xs lg:text-sm mt-1">
//                     {errors.last_name.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <input
//               type="tel"
//               placeholder="Phone number *"
//               {...register("phone_number")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.phone_number ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.phone_number && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.phone_number.message}
//               </p>
//             )}
//             <input
//               type="email"
//               placeholder="Email *"
//               {...register("email")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//             <input
//               type="text"
//               placeholder="Username *"
//               {...register("username")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.username.message}
//               </p>
//             )}
//             <select
//               {...register("user_role")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.user_role ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             >
//               <option value="">Select a role *</option>
//               <option value="homeowner">Homeowner</option>
//               <option value="supplier">Supplier</option>
//             </select>
//             {errors.user_role && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.user_role.message}
//               </p>
//             )}
//             <select
//               {...register("location")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.location ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             >
//               <option value="">Select your location *</option>
//               {locations.map((location, index) => (
//                 <option key={index} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//             {errors.location && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.location.message}
//               </p>
//             )}
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 id="password"
//                 {...register("password")}
//                 className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pr-12`}
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
//               >
//                 {passwordVisible ? <FiEye size={24} /> : <FiEyeOff size={24} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 lg:py-4 px-4 bg-[#263C5A] text-base lg:text-lg font-semibold border border-transparent rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
//             >
//               Sign Up
//             </button>
//             {successMessage && (
//               <p className="mt-2 text-green-500 text-center text-sm">
//                 {successMessage}
//               </p>
//             )}
//             {errorMessage && (
//               <p className="mt-2 text-red-500 text-center text-sm">
//                 {errorMessage}
//               </p>
//             )}
//           </form>
//           <p className="mt-6 lg:mt-8 text-center text-sm lg:text-base text-gray-600">
//             Already have an account?{" "}
//             <Link
//               href="/dashboard/login"
//               className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//       <div className="hidden lg:block w-1/2 relative">
//         <Image
//           src="/images/construction.png"
//           alt="Construction site illustration"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  phone_number: string;
  user_role: string;
  location: string;
}

const signupSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  phone_number: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  location: yup.string().required("Location is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  user_role: yup
    .string()
    .required("Role is required")
    .oneOf(["homeowner", "supplier"], "Invalid role selected"),
});

const locations = ["Nairobi", "Nakuru", "Mombasa", "Kiambu", "Thika"];

const SignUpForm = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const user_role = getCookie("role");
    const phone_number = getCookie("phone_number");

    if (user_role && phone_number) {
      // User is already logged in, show splash screen briefly and then redirect
      setTimeout(() => {
        switch (user_role) {
          case "homeowner":
            router.push("/pwa/homepage");
            break;
          case "supplier":
            router.push("/dashboard/dashboard");
            break;
          default:
            break;
        }
      }, 2000);
    } else {
      // If user is not logged in, hide the splash screen
      setIsSplashVisible(false);
    }
  }, [router]);

  if (isSplashVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Image
          src="/images/bmLogo.png"
          alt="Splash Screen"
          width={200}
          height={300}
          className="max-w-full h-auto sm:w-1/2 md:w-3/4 lg:w-[250px] xl:w-[250px]"
        />
      </div>
    );
  }

  const onSubmit = async (data: UserData) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCookie("first_name", data.first_name, { maxAge: 60 * 60 * 24 });
        setCookie("last_name", data.last_name, { maxAge: 60 * 60 * 24 });
        setCookie("phone_number", data.phone_number, { maxAge: 60 * 60 * 24 });
        setCookie("role", data.user_role, { maxAge: 60 * 60 * 24 });

        setSuccessMessage("Account created successfully! Redirecting...");
        toast.success("Account created successfully! Redirecting...");

        router.push("/dashboard/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Signup failed. Please try again."
        );
        toast.error(errorData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrorMessage(
        "An error occurred during signup. Please check your network connection and try again."
      );
      toast.error(
        "An error occurred during signup. Please check your network connection and try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
    <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-6 lg:p-10 rounded-xl shadow-xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-gray-800">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 lg:space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            <div>
              <input
                type="text"
                placeholder="First name *"
                {...register("first_name")}
                className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs lg:text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name *"
                {...register("last_name")}
                className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs lg:text-sm mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          <input
            type="tel"
            placeholder="Phone number *"
            {...register("phone_number")}
            className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
              errors.phone_number ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">
              {errors.phone_number.message}
            </p>
          )}
          <input
            type="email"
            placeholder="Email *"
            {...register("email")}
            className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Username *"
            {...register("username")}
            className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          <select
            {...register("user_role")}
            className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
              errors.user_role ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
          >
            <option value="">Select a role *</option>
            <option value="homeowner">Homeowner</option>
            <option value="supplier">Supplier</option>
          </select>
          {errors.user_role && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">
              {errors.user_role.message}
            </p>
          )}
          <select
            {...register("location")}
            className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
          >
            <option value="">Select your location *</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">
              {errors.location.message}
            </p>
          )}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password")}
              className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pr-12`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              {passwordVisible ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 lg:py-4 px-4 bg-[#263C5A] text-base lg:text-lg font-semibold border border-transparent rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            Sign Up
          </button>
          {successMessage && (
            <p className="mt-2 text-green-500 text-center text-sm">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="mt-2 text-red-500 text-center text-sm">
              {errorMessage}
            </p>
          )}
        </form>
        <p className="mt-6 lg:mt-8 text-center text-sm lg:text-base text-gray-600">
          Already have an account?{" "}
          <Link
            href="/dashboard/login"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    <div className="hidden lg:block w-1/2 relative">
      <Image
        src="/images/construction.png"
        alt="Construction site illustration"
        layout="fill"
        objectFit="cover"
      />
    </div>
  </div>
  );
};

export default SignUpForm;





// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Image from "next/image";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { getCookie, setCookie, deleteCookie } from "cookies-next";
// import toast from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";

// interface UserData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   username: string;
//   phone_number: string;
//   user_role: string;
//   location: string;
// }

// const signupSchema = yup.object().shape({
//   first_name: yup.string().required("First Name is required"),
//   last_name: yup.string().required("Last Name is required"),
//   phone_number: yup.string().required("Phone number is required"),
//   email: yup.string().email("Invalid email format").required("Email is required"),
//   location: yup.string().required("Location is required"),
//   username: yup.string().required("Username is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters long"),
//   user_role: yup
//     .string()
//     .required("Role is required")
//     .oneOf(["homeowner", "supplier"], "Invalid role selected"),
// });

// const locations = ["Nairobi", "Nakuru", "Mombasa", "Kiambu", "Thika"];

// const SignUpForm = () => {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<UserData>({
//     resolver: yupResolver(signupSchema),
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     const user_role = getCookie("role");
//     const phone_number = getCookie("phone_number");

//     if (user_role && phone_number) {
//       // User is already logged in, show splash screen briefly and then redirect
//       setTimeout(() => {
//         switch (user_role) {
//           case "homeowner":
//             router.push("/pwa/homepage");
//             break;
//           case "supplier":
//             router.push("/dashboard/dashboard");
//             break;
//           default:
//             break;
//         }
//       }, 2000);
//     } else {
//       // If user is not logged in, hide the splash screen
//       setIsSplashVisible(false);
//     }
//   }, [router]);

//   const clearCookiesAndRedirect = () => {
//     deleteCookie("first_name");
//     deleteCookie("last_name");
//     deleteCookie("phone_number");
//     deleteCookie("role");

//     // Redirect the user back to the sign-up page
//     router.push("/dashboard/register");
//   };

//   if (isSplashVisible) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Image
//           src="/images/bmLogo.png"
//           alt="Splash Screen"
//           width={200}
//           height={300}
//           className="max-w-full h-auto sm:w-1/2 md:w-3/4 lg:w-[250px] xl:w-[250px]"
//         />
//       </div>
//     );
//   }

//   const onSubmit = async (data: UserData) => {
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     try {
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         setCookie("first_name", data.first_name, { maxAge: 60 * 60 * 24 });
//         setCookie("last_name", data.last_name, { maxAge: 60 * 60 * 24 });
//         setCookie("phone_number", data.phone_number, { maxAge: 60 * 60 * 24 });
//         setCookie("role", data.user_role, { maxAge: 60 * 60 * 24 });

//         setSuccessMessage("Account created successfully! Redirecting...");
//         toast.success("Account created successfully! Redirecting...");

//         router.push("/dashboard/login");
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(
//           errorData.message || "Signup failed. Please try again."
//         );
//         toast.error(errorData.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Sign-up error:", error);
//       setErrorMessage(
//         "An error occurred during signup. Please check your network connection and try again."
//       );
//       toast.error(
//         "An error occurred during signup. Please check your network connection and try again."
//       );
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center items-center">
//         <div className="w-full max-w-3xl bg-white p-6 lg:p-10 rounded-xl shadow-xl">
//           <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-gray-800">
//             Sign Up
//           </h1>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="First name *"
//                   {...register("first_name")}
//                   className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                     errors.first_name ? "border-red-500" : "border-gray-300"
//                   } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//                 />
//                 {errors.first_name && (
//                   <p className="text-red-500 text-xs lg:text-sm mt-1">
//                     {errors.first_name.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Last name *"
//                   {...register("last_name")}
//                   className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                     errors.last_name ? "border-red-500" : "border-gray-300"
//                   } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//                 />
//                 {errors.last_name && (
//                   <p className="text-red-500 text-xs lg:text-sm mt-1">
//                     {errors.last_name.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <input
//               type="tel"
//               placeholder="Phone number *"
//               {...register("phone_number")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.phone_number ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.phone_number && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.phone_number.message}
//               </p>
//             )}
//             <input
//               type="email"
//               placeholder="Email *"
//               {...register("email")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//             <input
//               type="text"
//               placeholder="Username *"
//               {...register("username")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.username.message}
//               </p>
//             )}
//             <select
//               {...register("user_role")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.user_role ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             >
//               <option value="">Select your role *</option>
//               <option value="homeowner">Homeowner</option>
//               <option value="supplier">Supplier</option>
//             </select>
//             {errors.user_role && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.user_role.message}
//               </p>
//             )}
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password *"
//               {...register("password")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-[155px] lg:top-[164px] text-gray-600"
//             >
//               {passwordVisible ? <FiEyeOff /> : <FiEye />}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//             <select
//               {...register("location")}
//               className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${
//                 errors.location ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
//             >
//               <option value="">Select your location *</option>
//               {locations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//             {errors.location && (
//               <p className="text-red-500 text-xs lg:text-sm mt-1">
//                 {errors.location.message}
//               </p>
//             )}
//             {errorMessage && (
//               <p className="text-red-500 text-xs lg:text-sm mt-2">{errorMessage}</p>
//             )}
//             {successMessage && (
//               <p className="text-green-500 text-xs lg:text-sm mt-2">{successMessage}</p>
//             )}
//             <button
//               type="submit"
//               className="w-full py-3 lg:py-4 text-base lg:text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
//             >
//               Create Account
//             </button>
//             <p className="text-center text-sm lg:text-base">
//               Already have an account?{" "}
//               <Link href="/dashboard/login" className="text-blue-600 hover:underline">
//                 Log in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
