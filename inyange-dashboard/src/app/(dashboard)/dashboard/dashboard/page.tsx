"use client";
import React from "react";
import BarChartComponent from "../components/Barchart/barchart";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import Layout from "../components/Layout";
import { MaterialData } from "../utils/types";

const DashboardPage: React.FC = () => {
  const [materials, setMaterials] = React.useState<MaterialData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentMaterialGroup, setCurrentMaterialGroup] = React.useState(0);
  const MATERIALS_PER_GROUP = 10; // Number of materials to show per group
  const MAX_MATERIALS = 100; // Maximum number of materials to handle

  const [currentBrandGroup, setCurrentBrandGroup] = React.useState(0);
  const BRANDS_PER_GROUP = 10; // Number of brands to show per group

  React.useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/api/orders/');
        if (!response.ok) {
          throw new Error('Failed to fetch materials');
        }
        const data = await response.json();
        setMaterials(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Calculate total inventory value
  const totalInventoryValue = materials.reduce((sum, material) => {
    return sum + (material.price * material.quantity);
  }, 0);

  // Calculate the number of unique brands
  const uniqueBrandsSet = new Set(materials.map((material) => material.brand_name));
  const uniqueBrandsCount = uniqueBrandsSet.size;

  // Prepare data for materials inventory with grouping
  const prepareMaterialsData = () => {
    const materialMap: { [key: string]: number } = {};

    // Process materials data
    materials.forEach((material) => {
      const materialName = material.material_name.toLowerCase();
      if (materialName) {
        materialMap[materialName] = (materialMap[materialName] || 0) + (material.price * material.quantity);
      }
    });

    // Convert to array and sort by revenue
    const sortedMaterials = Object.entries(materialMap)
      .map(([material, revenue]) => ({ material, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, MAX_MATERIALS); // Limit to maximum materials

    // Group materials into chunks
    const groupCount = Math.ceil(sortedMaterials.length / MATERIALS_PER_GROUP);
    const groups = Array.from({ length: groupCount }, (_, i) =>
      sortedMaterials.slice(i * MATERIALS_PER_GROUP, (i + 1) * MATERIALS_PER_GROUP)
    );

    return {
      currentGroupData: groups[currentMaterialGroup] || [],
      totalGroups: groupCount,
      totalMaterials: sortedMaterials.length
    };
  };

  const { currentGroupData, totalGroups, totalMaterials } = prepareMaterialsData();

  // Prepare data for brand graph with grouping
  const prepareBrandsData = () => {
    const brandMap: { [key: string]: number } = {};

    materials.forEach((material) => {
      const brandName = material.brand_name;
      if (brandName) {
        brandMap[brandName] = (brandMap[brandName] || 0) + material.quantity;
      }
    });

    const sortedBrands = Object.entries(brandMap)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count);

    // Group brands into chunks
    const groupCount = Math.ceil(sortedBrands.length / BRANDS_PER_GROUP);
    const groups = Array.from({ length: groupCount }, (_, i) =>
      sortedBrands.slice(i * BRANDS_PER_GROUP, (i + 1) * BRANDS_PER_GROUP)
    );

    return {
      currentGroupData: groups[currentBrandGroup] || [],
      totalGroups: groupCount,
      totalBrands: sortedBrands.length
    };
  };

  const { currentGroupData: currentBrandData, totalGroups: totalBrandGroups, totalBrands } = prepareBrandsData();

  // Generate group ranges for dropdown
  const getMaterialGroupRangeLabel = (groupIndex: number) => {
    const startRange = groupIndex * MATERIALS_PER_GROUP + 1;
    const endRange = Math.min((groupIndex + 1) * MATERIALS_PER_GROUP, totalMaterials);
    return `Materials ${startRange}-${endRange}`;
  };

  const getBrandGroupRangeLabel = (groupIndex: number) => {
    const startRange = groupIndex * BRANDS_PER_GROUP + 1;
    const endRange = Math.min((groupIndex + 1) * BRANDS_PER_GROUP, totalBrands);
    return `Brands ${startRange}-${endRange}`;
  };

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-[70px]">
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-4xl font-bold mt-8 mb-4">
            Dashboard
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
          <DashboardCard
            title="Total Inventory Value"
            value={`KES ${totalInventoryValue.toLocaleString()}`}
          />
          <DashboardCard
            title="Total Brands"
            value={uniqueBrandsCount.toLocaleString()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-24">
          <div className="flex flex-col">
            <div className="mb-4 flex xl:ml-[500px] items-center gap-4 xl:text-[16px]">
              <select 
                value={currentMaterialGroup}
                onChange={(e) => setCurrentMaterialGroup(Number(e.target.value))}
                className="p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: totalGroups }, (_, i) => (
                  <option key={i} value={i}>
                    {getMaterialGroupRangeLabel(i)}
                  </option>
                ))}
              </select>
            </div>
            <BarChartComponent
              data={currentGroupData}
              xAxisKey="material"
              barDataKey="revenue"
              title="Inventory Distribution per Material"
              yAxisLabel="Inventory value per Material"
              yAxisLabelFontSize="40px"
              barColor="#577399"
            />
          </div>
          <div className="flex flex-col">
            <div className="mb-4 flex xl:ml-[500px] items-center gap-4 xl:text-[16px]">
              <select 
                value={currentBrandGroup}
                onChange={(e) => setCurrentBrandGroup(Number(e.target.value))}
                className="p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: totalBrandGroups }, (_, i) => (
                  <option key={i} value={i}>
                    {getBrandGroupRangeLabel(i)}
                  </option>
                ))}
              </select>
            </div>
            <BarChartComponent
              data={currentBrandData}
              xAxisKey="brand"
              barDataKey="count"
              title="Items per Brand"
              yAxisLabel="Number of items"
              yAxisLabelFontSize="40px"
              barColor="#577399"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
