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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
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
      'brick': 'Finishing Materials',
      'carpentry': 'Hardware and Tools',
    };
    return materialCategories[material] || null;
  };
  useEffect(() => {
    const materialFromPath = pathname.split('/').pop()?.replace(/([A-Z])/g, ' $1').trim();
    const category = materialFromPath ? getCategoryFromMaterial(materialFromPath) : null;
    if (category) {
      setExpandedCategory(category);
      setSelectedItem(materialFromPath || null);
    }
  }, [pathname]);
  const toggleCategory = (category: string | null) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  const handleCategoryClick = (material: string) => {
    setSelectedItem(material);
    if (onCategorySelect) {
      onCategorySelect(material);
    }
    router.push(`/pwa/${material.replace(' ', '')}`);
  };
  return (
    <div>
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full w-52 md:w-64 lg:w-64 xl:w-72 p-4 bg-white shadow-md z-40 transition-transform xl:mt-40 mt-32 md:mt-40 lg:mt-40 xl:text-xl"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-900 xl:ml-[20px] lg:ml-[15px]">All Categories</h3>
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
                      selectedItem === material || selectedCategory === material
                        ? 'bg-[#F8B612] text-white font-semibold'
                        : 'text-black'
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
                {['paint', 'tiles', 'brick'].map((material) => (
                  <li
                    key={material}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                      selectedItem === material || selectedCategory === material
                        ? 'bg-[#F8B612] text-white font-semibold'
                        : 'text-black'
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
                      selectedItem === material || selectedCategory === material
                        ? 'bg-[#F8B612] text-white font-semibold'
                        : 'text-black'
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