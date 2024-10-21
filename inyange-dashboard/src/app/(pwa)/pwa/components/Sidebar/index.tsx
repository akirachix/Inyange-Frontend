// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import { useRouter, usePathname } from 'next/navigation'; 
// // import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

// // interface SidebarProps {
// //   onCategorySelect?: (category: string) => void; 
// //   selectedCategory?: string; 
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, selectedCategory }) => {
// //   const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
// //   const router = useRouter(); 
// //   const pathname = usePathname(); 

// //   const getCategoryFromMaterial = (material: string) => {
// //     const materialCategories: { [key: string]: string } = {
// //       'steel': 'Building Materials',
// //       'wood': 'Building Materials',
// //       'ironsheets': 'Building Materials',
// //       'cement': 'Building Materials',
// //       'paint': 'Finishing Materials',
// //       'tiles': 'Finishing Materials',
// //       'carpentry': 'Hardware and Tools',
// //     };
// //     return materialCategories[material] || null;
// //   };

// //   useEffect(() => {
// //     const materialFromPath = pathname.split('/').pop()?.replace(/([A-Z])/g, ' $1').trim();
// //     const category = materialFromPath ? getCategoryFromMaterial(materialFromPath) : null;
// //     if (category) {
// //       setExpandedCategory(category);
// //     }
// //   }, [pathname]);

// //   const toggleCategory = (category: string | null) => {
// //     if (expandedCategory === category) {
// //       setExpandedCategory(null);
// //     } else {
// //       setExpandedCategory(category);
// //     }
// //   };

// //   const handleCategoryClick = (material: string) => {
// //     if (onCategorySelect) {
// //       onCategorySelect(material); 
// //     }
// //     router.push(`/pwa/${material.replace(' ', '')}`);
// //   };

// //   return (
// //     <aside 
// //       className="w-full sm:w-72 p-4 bg-white shadow-md fixed top-[125px] left-0 h-[calc(100vh-64px)] overflow-y-auto z-50 text-xl"
// //     >
// //       <h3 className="text-2xl font-bold mb-4 text-gray-900">All Categories</h3>
// //       <ul className="space-y-3">
// //         <li>
// //           <div 
// //             className="flex justify-between items-center cursor-pointer px-4 py-2"
// //             onClick={() => toggleCategory('Building Materials')}
// //           >
// //             <span className="font-semibold">Building Materials</span>
// //             <span>{expandedCategory === 'Building Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
// //           </div>
// //           {expandedCategory === 'Building Materials' && (
// //             <ul className="pl-6 mt-2 space-y-2">
// //               {['steel', 'wood', 'ironsheets', 'cement'].map((material) => (
// //                 <li
// //                   key={material}
// //                   className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
// //                     selectedCategory === material
// //                       ? 'bg-[#F8B612] text-white font-semibold'
// //                       : 'hover:bg-[#F8B612] hover:text-white text-black'
// //                   }`}
// //                   onClick={() => handleCategoryClick(material)}
// //                 >
// //                   {material}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </li>

// //         <li>
// //           <div 
// //             className="flex justify-between items-center cursor-pointer px-4 py-2"
// //             onClick={() => toggleCategory('Finishing Materials')}
// //           >
// //             <span className="font-semibold">Finishing Materials</span>
// //             <span>{expandedCategory === 'Finishing Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
// //           </div>
// //           {expandedCategory === 'Finishing Materials' && (
// //             <ul className="pl-6 mt-2 space-y-2">
// //               {['paint', 'tiles'].map((material) => (
// //                 <li
// //                   key={material}
// //                   className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
// //                     selectedCategory === material
// //                       ? 'bg-[#F8B612] text-white font-semibold'
// //                       : 'hover:bg-[#F8B612] hover:text-white text-black'
// //                   }`}
// //                   onClick={() => handleCategoryClick(material)} 
// //                 >
// //                   {material}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </li>

// //         <li>
// //           <div 
// //             className="flex justify-between items-center cursor-pointer px-4 py-2"
// //             onClick={() => toggleCategory('Hardware and Tools')}
// //           >
// //             <span className="font-semibold">Hardware and Tools</span>
// //             <span>{expandedCategory === 'Hardware and Tools' ? <FaChevronUp /> : <FaChevronDown />}</span>
// //           </div>
// //           {expandedCategory === 'Hardware and Tools' && (
// //             <ul className="pl-6 mt-2 space-y-2">
// //               {['carpentry'].map((material) => (
// //                 <li
// //                   key={material}
// //                   className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
// //                     selectedCategory === material
// //                       ? 'bg-[#F8B612] text-white font-semibold'
// //                       : 'hover:bg-[#F8B612] hover:text-white text-black'
// //                   }`}
// //                   onClick={() => handleCategoryClick(material)} 
// //                 >
// //                   {material}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </li>
// //       </ul>
// //     </aside>
// //   );
// // };

// // export default Sidebar;


// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import { useRouter, usePathname } from 'next/navigation'; 
// // import { FaChevronDown, FaChevronUp, FaBars } from 'react-icons/fa'; 

// // interface SidebarProps {
// //   onCategorySelect?: (category: string) => void; 
// //   selectedCategory?: string; 
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, selectedCategory }) => {
// //   const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility on smaller screens
// //   const router = useRouter(); 
// //   const pathname = usePathname(); 

// //   const getCategoryFromMaterial = (material: string) => {
// //     const materialCategories: { [key: string]: string } = {
// //       'steel': 'Building Materials',
// //       'wood': 'Building Materials',
// //       'ironsheets': 'Building Materials',
// //       'cement': 'Building Materials',
// //       'paint': 'Finishing Materials',
// //       'tiles': 'Finishing Materials',
// //       'carpentry': 'Hardware and Tools',
// //     };
// //     return materialCategories[material] || null;
// //   };

// //   useEffect(() => {
// //     const materialFromPath = pathname.split('/').pop()?.replace(/([A-Z])/g, ' $1').trim();
// //     const category = materialFromPath ? getCategoryFromMaterial(materialFromPath) : null;
// //     if (category) {
// //       setExpandedCategory(category);
// //     }
// //   }, [pathname]);

// //   const toggleCategory = (category: string | null) => {
// //     if (expandedCategory === category) {
// //       setExpandedCategory(null);
// //     } else {
// //       setExpandedCategory(category);
// //     }
// //   };

// //   const handleCategoryClick = (material: string) => {
// //     if (onCategorySelect) {
// //       onCategorySelect(material); 
// //     }
// //     router.push(`/pwa/${material.replace(' ', '')}`);
// //     setIsSidebarOpen(false); // Close the sidebar when a category is selected
// //   };

// //   return (
// //     <div>
// //       {/* Hamburger menu button for smaller screens */}
// //       <button 
// //         className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-[#F8B612] text-white rounded-md focus:outline-none"
// //         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //       >
// //         <FaBars size={24} />
// //       </button>

// //       {/* Sidebar */}
// //       <aside 
// //         className={`fixed top-0 left-0 h-full p-4 bg-white shadow-md z-40 w-64 transition-transform transform ${
// //           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
// //         } sm:translate-x-0 sm:w-72 sm:p-4 sm:bg-white sm:shadow-md sm:fixed sm:top-[125px] sm:left-0 sm:h-[calc(100vh-64px)] sm:overflow-y-auto sm:z-50 sm:text-xl`}
// //       >
// //         <h3 className="text-2xl font-bold mb-4 text-gray-900">All Categories</h3>
// //         <ul className="space-y-3">
// //           <li>
// //             <div 
// //               className="flex justify-between items-center cursor-pointer px-4 py-2"
// //               onClick={() => toggleCategory('Building Materials')}
// //             >
// //               <span className="font-semibold">Building Materials</span>
// //               <span>{expandedCategory === 'Building Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
// //             </div>
// //             {expandedCategory === 'Building Materials' && (
// //               <ul className="pl-6 mt-2 space-y-2">
// //                 {['steel', 'wood', 'ironsheets', 'cement'].map((material) => (
// //                   <li
// //                     key={material}
// //                     className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
// //                       selectedCategory === material
// //                         ? 'bg-[#F8B612] text-white font-semibold'
// //                         : 'hover:bg-[#F8B612] hover:text-white text-black'
// //                     }`}
// //                     onClick={() => handleCategoryClick(material)}
// //                   >
// //                     {material}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </li>

// //           <li>
// //             <div 
// //               className="flex justify-between items-center cursor-pointer px-4 py-2"
// //               onClick={() => toggleCategory('Finishing Materials')}
// //             >
// //               <span className="font-semibold">Finishing Materials</span>
// //               <span>{expandedCategory === 'Finishing Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
// //             </div>
// //             {expandedCategory === 'Finishing Materials' && (
// //               <ul className="pl-6 mt-2 space-y-2">
// //                 {['paint', 'tiles'].map((material) => (
// //                   <li
// //                     key={material}
// //                     className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
// //                       selectedCategory === material
// //                         ? 'bg-[#F8B612] text-white font-semibold'
// //                         : 'hover:bg-[#F8B612] hover:text-white text-black'
// //                     }`}
// //                     onClick={() => handleCategoryClick(material)} 
// //                   >
// //                     {material}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </li>

// //           <li>
// //             <div 
// //               className="flex justify-between items-center cursor-pointer px-4 py-2"
// //               onClick={() => toggleCategory('Hardware and Tools')}
// //             >
// //               <span className="font-semibold">Hardware and Tools</span>
// //               <span>{expandedCategory === 'Hardware and Tools' ? <FaChevronUp /> : <FaChevronDown />}</span>
// //             </div>
// //             {expandedCategory === 'Hardware and Tools' && (
// //               <ul className="pl-6 mt-2 space-y-2">
// //                 {['carpentry'].map((material) => (
// //                   <li
// //                     key={material}
// //                     className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
// //                       selectedCategory === material
// //                         ? 'bg-[#F8B612] text-white font-semibold'
// //                         : 'hover:bg-[#F8B612] hover:text-white text-black'
// //                     }`}
// //                     onClick={() => handleCategoryClick(material)} 
// //                   >
// //                     {material}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </li>
// //         </ul>
// //       </aside>
// //     </div>
// //   );
// // };

// // export default Sidebar;









// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation'; 
// import { FaChevronDown, FaChevronUp, FaBars } from 'react-icons/fa'; 
// import { yupResolver } from '@hookform/resolvers/yup';

// interface SidebarProps {
//   onCategorySelect?: (category: string) => void; 
//   selectedCategory?: string; 
// }

// const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, selectedCategory }) => {
//   const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const router = useRouter(); 
//   const pathname = usePathname(); 

//   const getCategoryFromMaterial = (material: string) => {
//     const materialCategories: { [key: string]: string } = {
//       'steel': 'Building Materials',
//       'wood': 'Building Materials',
//       'ironsheets': 'Building Materials',
//       'cement': 'Building Materials',
//       'paint': 'Finishing Materials',
//       'tiles': 'Finishing Materials',
//       'carpentry': 'Hardware and Tools',
//     };
//     return materialCategories[material] || null;
//   };

//   useEffect(() => {
//     const materialFromPath = pathname.split('/').pop()?.replace(/([A-Z])/g, ' $1').trim();
//     const category = materialFromPath ? getCategoryFromMaterial(materialFromPath) : null;
//     if (category) {
//       setExpandedCategory(category);
//     }
//   }, [pathname]);

//   const toggleCategory = (category: string | null) => {
//     setExpandedCategory(expandedCategory === category ? null : category);
//   };

//   const handleCategoryClick = (material: string) => {
//     if (onCategorySelect) {
//       onCategorySelect(material); 
//     }
//     router.push(`/pwa/${material.replace(' ', '')}`);
//     setIsSidebarOpen(false);
//   };

//   const closeSidebar = () => setIsSidebarOpen(false);

//   return (
//     <div>
//       {/* Hamburger Menu Button */}
//       <button 
//         className="sm:hidden mt-32 top-16 left-4 z-50 p-2 bg-[#F8B612] text-white rounded-md"
//         onClick={() => setIsSidebarOpen(prev => !prev)}
//         aria-expanded={isSidebarOpen}
//         aria-label="Toggle Sidebar"
//       >
//         <FaBars size={24} />
//       </button>

//       {/* Sidebar */}
//       <aside 
//         className={`fixed top-0 left-0 h-full p-4 bg-white shadow-md z-40 w-64 transition-transform transform mt-32 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } sm:translate-x-0 sm:w-72`}
//       >
//         <button className="absolute top-4 right-4 z-50 bg-[#F8B612] text-white rounded-md p-2 sm:hidden" onClick={closeSidebar}>
//           Close
//         </button>
//         <h3 className="text-2xl font-bold mb-4 text-gray-900">All Categories</h3>
//         <ul className="space-y-3">
//           {/* Building Materials */}
//           <li>
//             <div 
//               className="flex justify-between items-center cursor-pointer px-4 py-2"
//               onClick={() => toggleCategory('Building Materials')}
//             >
//               <span className="font-semibold">Building Materials</span>
//               <span>{expandedCategory === 'Building Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
//             </div>
//             {expandedCategory === 'Building Materials' && (
//               <ul className="pl-6 mt-2 space-y-2">
//                 {['steel', 'wood', 'ironsheets', 'cement'].map((material) => (
//                   <li
//                     key={material}
//                     className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
//                       selectedCategory === material
//                         ? 'bg-[#F8B612] text-white font-semibold'
//                         : 'hover:bg-[#F8B612] hover:text-white text-black'
//                     }`}
//                     onClick={() => handleCategoryClick(material)}
//                   >
//                     {material}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>

//           {/* Finishing Materials */}
//           <li>
//             <div 
//               className="flex justify-between items-center cursor-pointer px-4 py-2"
//               onClick={() => toggleCategory('Finishing Materials')}
//             >
//               <span className="font-semibold">Finishing Materials</span>
//               <span>{expandedCategory === 'Finishing Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
//             </div>
//             {expandedCategory === 'Finishing Materials' && (
//               <ul className="pl-6 mt-2 space-y-2">
//                 {['paint', 'tiles'].map((material) => (
//                   <li
//                     key={material}
//                     className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
//                       selectedCategory === material
//                         ? 'bg-[#F8B612] text-white font-semibold'
//                         : 'hover:bg-[#F8B612] hover:text-white text-black'
//                     }`}
//                     onClick={() => handleCategoryClick(material)} 
//                   >
//                     {material}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>

//           {/* Hardware and Tools */}
//           <li>
//             <div 
//               className="flex justify-between items-center cursor-pointer px-4 py-2"
//               onClick={() => toggleCategory('Hardware and Tools')}
//             >
//               <span className="font-semibold">Hardware and Tools</span>
//               <span>{expandedCategory === 'Hardware and Tools' ? <FaChevronUp /> : <FaChevronDown />}</span>
//             </div>
//             {expandedCategory === 'Hardware and Tools' && (
//               <ul className="pl-6 mt-2 space-y-2">
//                 {['carpentry'].map((material) => (
//                   <li
//                     key={material}
//                     className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
//                       selectedCategory === material
//                         ? 'bg-[#F8B612] text-white font-semibold'
//                         : 'hover:bg-[#F8B612] hover:text-white text-black'
//                     }`}
//                     onClick={() => handleCategoryClick(material)} 
//                   >
//                     {material}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         </ul>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;



"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; 
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

interface SidebarProps {
  onCategorySelect?: (category: string) => void; 
  selectedCategory?: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, selectedCategory }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const router = useRouter(); 
  const pathname = usePathname(); 

  const getCategoryFromMaterial = (material: string) => {
    const materialCategories: { [key: string]: string } = {
      'steel': 'Building Materials',
      'wood': 'Building Materials',
      'ironsheets': 'Building Materials',
      'cement': 'Building Materials',
      'paint': 'Finishing Materials',
      'tiles': 'Finishing Materials',
      'carpentry': 'Hardware and Tools',
    };
    return materialCategories[material] || null;
  };

  useEffect(() => {
    const materialFromPath = pathname.split('/').pop()?.replace(/([A-Z])/g, ' $1').trim();
    const category = materialFromPath ? getCategoryFromMaterial(materialFromPath) : null;
    if (category) {
      setExpandedCategory(category);
    }
  }, [pathname]);

  const toggleCategory = (category: string | null) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleCategoryClick = (material: string) => {
    if (onCategorySelect) {
      onCategorySelect(material); 
    }
    router.push(`/pwa/${material.replace(' ', '')}`);
  };

  return (
    <div>
      {/* Sidebar */}
      <aside 
        className="fixed top-0 left-0 h-full w-52 md:w-64 lg:w-64 xl:w-72  p-4 bg-white shadow-md z-40 transition-transform xl:mt-40 mt-32 md:mt-40 lg:mt-40 xl:text-xl"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-900">All Categories</h3>
        <ul className="space-y-3">
          {/* Building Materials */}
          <li>
            <div 
              className="flex justify-between items-center cursor-pointer px-4 py-2"
              onClick={() => toggleCategory('Building Materials')}
            >
              <span className="font-semibold">Building Materials</span>
              <span>{expandedCategory === 'Building Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {expandedCategory === 'Building Materials' && (
              <ul className="pl-6 mt-2 space-y-2">
                {['steel', 'wood', 'ironsheets', 'cement'].map((material) => (
                  <li
                    key={material}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                      selectedCategory === material
                        ? 'bg-[#F8B612] text-white font-semibold'
                        : 'hover:bg-[#F8B612] hover:text-white text-black'
                    }`}
                    onClick={() => handleCategoryClick(material)}
                  >
                    {material}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Finishing Materials */}
          <li>
            <div 
              className="flex justify-between items-center cursor-pointer px-4 py-2"
              onClick={() => toggleCategory('Finishing Materials')}
            >
              <span className="font-semibold">Finishing Materials</span>
              <span>{expandedCategory === 'Finishing Materials' ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {expandedCategory === 'Finishing Materials' && (
              <ul className="pl-6 mt-2 space-y-2">
                {['paint', 'tiles'].map((material) => (
                  <li
                    key={material}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                      selectedCategory === material
                        ? 'bg-[#F8B612] text-white font-semibold'
                        : 'hover:bg-[#F8B612] hover:text-white text-black'
                    }`}
                    onClick={() => handleCategoryClick(material)} 
                  >
                    {material}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Hardware and Tools */}
          <li>
            <div 
              className="flex justify-between items-center cursor-pointer px-4 py-2"
              onClick={() => toggleCategory('Hardware and Tools')}
            >
              <span className="font-semibold">Hardware and Tools</span>
              <span>{expandedCategory === 'Hardware and Tools' ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {expandedCategory === 'Hardware and Tools' && (
              <ul className="pl-6 mt-2 space-y-2">
                {['carpentry'].map((material) => (
                  <li
                    key={material}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                      selectedCategory === material
                        ? 'bg-[#F8B612] text-white font-semibold'
                        : 'hover:bg-[#F8B612] hover:text-white text-black'
                    }`}
                    onClick={() => handleCategoryClick(material)} 
                  >
                    {material}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;