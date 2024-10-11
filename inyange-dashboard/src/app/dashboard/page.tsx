"use client";
import React from 'react';
// import Layout from '../components/Layout';
import BarChartComponent from '../components/Barchart/barchart'; 
import DashboardCard from '../components/DashboardCard/DashboardCard';
import { useGetOrders } from '../../hooks/useGetOrders';

const DashboardPage: React.FC = () => {
  const { orders, loading, error } = useGetOrders();
  
 
  const totalRevenue = orders
    ? orders.reduce((sum, order) => {
        const cartItems = Object.values(order.cart_data);
        return sum + cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      }, 0)
    : 0;
  
  
  const brandsBoughtSet = new Set(orders.flatMap(order =>
    Object.values(order.cart_data).map(item => item.brand_name)
  ));
  const brandsBought = brandsBoughtSet.size;

  const monthNames = [
    "Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  
  const revenueData = monthNames.map(month => ({
    month,
    revenue: 0
  }));

  const brandsData: { brand: string; count: number }[] = [];
  const brandMap: { [key: string]: number } = {};

 
  orders.forEach(order => {
    const orderDate = new Date(order.order_date);
    const monthIndex = orderDate.getMonth();
    const cartItems = Object.values(order.cart_data);
    const orderTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

    if (monthIndex >= 0 && monthIndex < 12) {
      revenueData[monthIndex].revenue += orderTotal;
    }

   
    cartItems.forEach(item => {
      const brand = item.brand_name;
      if (brand) {
        brandMap[brand] = (brandMap[brand] || 0) + 1;
      }
    });
  });

 
  for (const brand in brandMap) {
    brandsData.push({ brand, count: brandMap[brand] });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
  
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-3xl font-bold mt-8 mb-4">Dashboard</h1>
        </div>

      
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 ">
          <DashboardCard title="Total Revenue" value={`KES ${totalRevenue.toLocaleString()}`} />
          <DashboardCard title="Brands Bought" value={brandsBought.toLocaleString()} />
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10 ">
          <BarChartComponent
            data={revenueData}
            xAxisKey="month"
            barDataKey="revenue"
            title="Total Revenue per Month"
            yAxisLabel="Total revenue per month"
            yAxisLabelFontSize="40px" 
            barColor="#577399"
          />
          <BarChartComponent
            data={brandsData}
            xAxisKey="brand"
            barDataKey="count"
            title="Number of Frequently Bought Brands"
            yAxisLabel='Number of brands bought'
            yAxisLabelFontSize="40px " 
            barColor="#577399"
          />
        </div>
      </div>
   
  );
};

export default DashboardPage;
