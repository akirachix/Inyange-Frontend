// "use client";
// import React from "react";
// import BarChartComponent from "../components/Barchart/barchart";
// import DashboardCard from "../components/DashboardCard/DashboardCard";
// import Layout from "../components/Layout";
// import { MaterialData } from "../utils/types";

// const DashboardPage: React.FC = () => {
//   const [materials, setMaterials] = React.useState<MaterialData[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);
//   const [selectedTimeframe, setSelectedTimeframe] =
//     React.useState("last6Months");
//   const [selectedTopBrands, setSelectedTopBrands] = React.useState("top5");

//   React.useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await fetch("/api/orders");
//         if (!response.ok) throw new Error("Failed to fetch materials");
//         const data = await response.json();
//         setMaterials(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//         setLoading(false);
//       }
//     };

//     fetchMaterials();
//   }, []);

//   // Calculate total inventory value
//   const totalInventoryValue = materials.reduce((sum, material) => {
//     return sum + material.price * material.quantity;
//   }, 0);

//   // Calculate the number of unique brands
//   const uniqueBrandsSet = new Set(
//     materials.map((material) => material.brand_name)
//   );
//   const uniqueBrandsCount = uniqueBrandsSet.size;

//   // Get current date and calculate dates for filtering
//   const currentDate = new Date();

//   // Initialize inventory data for selected months
//   const getMonthsForDisplay = () => {
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const months = [];
//     const numMonths = selectedTimeframe === "last6Months" ? 6 : 12;

//     for (let i = numMonths - 1; i >= 0; i--) {
//       const monthIndex = (currentDate.getMonth() - i + 12) % 12;
//       months.push(monthNames[monthIndex]);
//     }
//     return months;
//   };

//   const inventoryData = getMonthsForDisplay().map((month) => ({
//     month,
//     revenue: 0,
//   }));

//   // Prepare and sort brands data
//   const getBrandsData = () => {
//     const brandMap: { [key: string]: number } = {};

//     materials.forEach((material) => {
//       const brand = material.brand_name;
//       if (brand) {
//         brandMap[brand] = (brandMap[brand] || 0) + material.quantity;
//       }
//     });

//     // Convert to array and sort by quantity
//     const sortedBrands = Object.entries(brandMap)
//       .map(([brand, count]) => ({ brand, count }))
//       .sort((a, b) => b.count - a.count);

//     // Filter based on selection
//     const limit = selectedTopBrands === "top5" ? 5 : 10;
//     return sortedBrands.slice(0, limit);
//   };

//   // Populate monthly data (example distribution)
//   materials.forEach((material) => {
//     const monthIndex = Math.floor(
//       Math.random() * (selectedTimeframe === "last6Months" ? 6 : 12)
//     );
//     inventoryData[monthIndex].revenue += material.price * material.quantity;
//   });

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data: {error}</div>;

//   return (
//     <Layout>
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-[70px]">
//         <div className="flex justify-center">
//           <h1 className="text-center text-xl md:text-4xl font-bold mt-8 mb-4">
//             Dashboard
//           </h1>
//         </div>

//         <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
//           <DashboardCard
//             title="Total Inventory Value"
//             value={`KES ${totalInventoryValue.toLocaleString()}`}
//           />
//           <DashboardCard
//             title="Unique Brands"
//             value={uniqueBrandsCount.toLocaleString()}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
//           {/* Monthly Inventory Chart */}
//           <div className="flex flex-col">
//             <div className="mb-4 flex justify-end">
//               <select
//                 value={selectedTimeframe}
//                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//                 className="p-2 border rounded-md"
//               >
//                 <option value="last6Months">Last 6 Months</option>
//                 <option value="last12Months">Last 12 Months</option>
//               </select>
//             </div>
//             <BarChartComponent
//               data={inventoryData}
//               xAxisKey="month"
//               barDataKey="revenue"
//               title="Inventory Value Distribution"
//               yAxisLabel="Inventory value"
//               barColor="#577399"
//             />
//           </div>

//           <div className="flex flex-col">
//             <div className="mb-4 flex justify-end">
//               <select
//                 value={selectedTopBrands}
//                 onChange={(e) => setSelectedTopBrands(e.target.value)}
//                 className="p-2 border rounded-md"
//               >
//                 <option value="top5">Top 5 Brands</option>
//                 <option value="top10">Top 10 Brands</option>
//               </select>
//             </div>
//             <BarChartComponent
//               data={getBrandsData()}
//               xAxisKey="brand"
//               barDataKey="count"
//               title="Top Brands by Inventory"
//               yAxisLabel="Items in stock"
//               barColor="#577399"
//               // isSecondChart={true}
//             />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default DashboardPage;


// "use client";
// import React from "react";
// import BarChartComponent from "../components/Barchart/barchart";
// import DashboardCard from "../components/DashboardCard/DashboardCard";
// import Layout from "../components/Layout";
// import { MaterialData } from "../utils/types";

// const DashboardPage: React.FC = () => {
//   const [materials, setMaterials] = React.useState<MaterialData[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await fetch('https://buildmart-42eabdb55b17.herokuapp.com/api/materials/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch materials');
//         }
//         const data = await response.json();
//         setMaterials(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//         setLoading(false);
//       }
//     };

//     fetchMaterials();
//   }, []);

//   // Calculate total inventory value
//   const totalInventoryValue = materials.reduce((sum, material) => {
//     return sum + (material.price * material.quantity);
//   }, 0);

//   // Calculate the number of unique brands
//   const uniqueBrandsSet = new Set(
//     materials.map((material) => material.brand_name)
//   );
//   const uniqueBrandsCount = uniqueBrandsSet.size;

//   // Month names for data visualization
//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "April",
//     "May",
//     "June",
//     "July",
//     "Aug",
//     "Sept",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   // Initialize inventory data for each month
//   const inventoryData = monthNames.map((month) => ({
//     month,
//     revenue: 0, // keeping the key as revenue for compatibility with existing BarChart
//   }));

//   // Prepare data for brands inventory
//   const brandsData: { brand: string; count: number }[] = [];
//   const brandMap: { [key: string]: number } = {};

//   // Process materials data
//   materials.forEach((material) => {
//     // Count inventory per brand
//     const brand = material.brand_name;
//     if (brand) {
//       brandMap[brand] = (brandMap[brand] || 0) + material.quantity;
//     }

//     // Distribute inventory value across months (example distribution)
//     // You might want to adjust this based on your actual requirements
//     const monthIndex = Math.floor(Math.random() * 12);
//     inventoryData[monthIndex].revenue += material.price * material.quantity;
//   });

//   // Populate brandsData with counts
//   for (const brand in brandMap) {
//     brandsData.push({
//       brand,
//       count: brandMap[brand],
//     });
//   }

//   // Handle loading and error states
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data: {error}</div>;

//   return (
//     <Layout>
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-[70px]">
//         <div className="flex justify-center">
//           <h1 className="text-center text-xl md:text-4xl font-bold mt-8 mb-4">
//             Dashboard
//           </h1>
//         </div>

//         <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 ">
//           <DashboardCard
//             title="Total Inventory Value"
//             value={`KES ${totalInventoryValue.toLocaleString()}`}
//           />
//           <DashboardCard
//             title="Unique Brands"
//             value={uniqueBrandsCount.toLocaleString()}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10 ">
//           <BarChartComponent
//             data={inventoryData}
//             xAxisKey="month"
//             barDataKey="revenue"
//             title="Inventory Value Distribution"
//             yAxisLabel="Inventory value per month"
//             yAxisLabelFontSize="40px"
//             barColor="#577399"
//           />
//           <BarChartComponent
//             data={brandsData}
//             xAxisKey="brand"
//             barDataKey="count"
//             title="Items per Brand"
//             yAxisLabel="Number of items"
//             yAxisLabelFontSize="40px"
//             barColor="#577399"
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default DashboardPage;


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
  const [currentBrandGroup, setCurrentBrandGroup] = React.useState(0);
  const BRANDS_PER_GROUP = 10; // Number of brands to show per group
  const MAX_BRANDS = 100; // Maximum number of brands to handle

  React.useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('https://buildmart-42eabdb55b17.herokuapp.com/api/materials/');
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
  const uniqueBrandsSet = new Set(
    materials.map((material) => material.brand_name)
  );
  const uniqueBrandsCount = uniqueBrandsSet.size;

  // Month names for data visualization
  const monthNames = [
    "Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  // Initialize inventory data for each month
  const inventoryData = monthNames.map((month) => ({
    month,
    revenue: 0,
  }));

  // Prepare data for brands inventory with grouping
  const prepareBrandsData = () => {
    const brandMap: { [key: string]: number } = {};

    // Process materials data
    materials.forEach((material) => {
      const brand = material.brand_name;
      if (brand) {
        brandMap[brand] = (brandMap[brand] || 0) + material.quantity;
      }
    });

    // Convert to array and sort by count
    const sortedBrands = Object.entries(brandMap)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, MAX_BRANDS); // Limit to maximum brands

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

  const { currentGroupData, totalGroups, totalBrands } = prepareBrandsData();

  // Generate group ranges for dropdown
  const getGroupRangeLabel = (groupIndex: number) => {
    const startRange = groupIndex * BRANDS_PER_GROUP + 1;
    const endRange = Math.min((groupIndex + 1) * BRANDS_PER_GROUP, totalBrands);
    return `Brands ${startRange}-${endRange}`;
  };

  // Process monthly inventory data
  materials.forEach((material) => {
    const monthIndex = Math.floor(Math.random() * 12);
    inventoryData[monthIndex].revenue += material.price * material.quantity;
  });

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
          <BarChartComponent
            data={inventoryData}
            xAxisKey="month"
            barDataKey="revenue"
            title="Inventory Distribution per month"
            yAxisLabel="Inventory value per month"
            yAxisLabelFontSize="40px"
            barColor="#577399"
          />
          <div className="flex flex-col">
            <div className="mb-4 flex xl:ml-[500px] items-center gap-4 xl:text-[16px]">
              <select 
                value={currentBrandGroup}
                onChange={(e) => setCurrentBrandGroup(Number(e.target.value))}
                className="p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: totalGroups }, (_, i) => (
                  <option key={i} value={i}>
                    {getGroupRangeLabel(i)}
                  </option>
                ))}
              </select>
             
            </div>
            <BarChartComponent
              data={currentGroupData}
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