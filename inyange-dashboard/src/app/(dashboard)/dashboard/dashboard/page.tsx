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
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState("last6Months");
  const [selectedTopBrands, setSelectedTopBrands] = React.useState("top5");

  React.useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Failed to fetch materials");
        const data = await response.json();
        setMaterials(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Calculate total inventory value
  const totalInventoryValue = materials.reduce((sum, material) => {
    return sum + material.price * material.quantity;
  }, 0);

  // Calculate the number of unique brands
  const uniqueBrandsSet = new Set(
    materials.map((material) => material.brand_name)
  );
  const uniqueBrandsCount = uniqueBrandsSet.size;

  // Get current date and calculate dates for filtering
  const currentDate = new Date();

  // Initialize inventory data for selected months
  const getMonthsForDisplay = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const months = [];
    const numMonths = selectedTimeframe === "last6Months" ? 6 : 12;

    for (let i = numMonths - 1; i >= 0; i--) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      months.push(monthNames[monthIndex]);
    }
    return months;
  };

  const inventoryData = getMonthsForDisplay().map((month) => ({
    month,
    revenue: 0,
  }));

  // Prepare and sort brands data
  const getBrandsData = () => {
    const brandMap: { [key: string]: number } = {};

    materials.forEach((material) => {
      const brand = material.brand_name;
      if (brand) {
        brandMap[brand] = (brandMap[brand] || 0) + material.quantity;
      }
    });

    // Convert to array and sort by quantity
    const sortedBrands = Object.entries(brandMap)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count);

    // Filter based on selection
    const limit = selectedTopBrands === "top5" ? 5 : 10;
    return sortedBrands.slice(0, limit);
  };

  // Populate monthly data (example distribution)
  materials.forEach((material) => {
    const monthIndex = Math.floor(
      Math.random() * (selectedTimeframe === "last6Months" ? 6 : 12)
    );
    inventoryData[monthIndex].revenue += material.price * material.quantity;
  });

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
            title="Unique Brands"
            value={uniqueBrandsCount.toLocaleString()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
          {/* Monthly Inventory Chart */}
          <div className="flex flex-col">
            <div className="mb-4 flex justify-end">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="last6Months">Last 6 Months</option>
                <option value="last12Months">Last 12 Months</option>
              </select>
            </div>
            <BarChartComponent
              data={inventoryData}
              xAxisKey="month"
              barDataKey="revenue"
              title="Inventory Value Distribution"
              yAxisLabel="Inventory value"
              barColor="#577399"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex justify-end">
              <select
                value={selectedTopBrands}
                onChange={(e) => setSelectedTopBrands(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="top5">Top 5 Brands</option>
                <option value="top10">Top 10 Brands</option>
              </select>
            </div>
            <BarChartComponent
              data={getBrandsData()}
              xAxisKey="brand"
              barDataKey="count"
              title="Top Brands by Inventory"
              yAxisLabel="Items in stock"
              barColor="#577399"
              // isSecondChart={true}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
