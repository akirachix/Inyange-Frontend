import React from 'react';

type DashboardCardProps = {
  title: string;
  value: string | number;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="bg-[#263C5A] text-white shadow-lg rounded-lg pt-[70px] pb-[70px] pl-[140px] pr-[140px] nh:pt-[50px] nh:pb-[50px] nh:pl-[100px] nh:pr-[100px] nhm:pt-[60px] nhm:pb-[60px] nhm:pl-[120px] nhm:pr-[120px] flex flex-col items-center justify-center h-24 md:h-32 nh:h-20 nhm:h-28 w-48 md:w-60 nh:w-44 nhm:w-52 mx-auto">
      <h2 className="font-semibold mb-2 text-[20px] nh:text-[18px] nhm:text-[19px] whitespace-nowrap">{title}</h2>
      <p className="text-[19px] nh:text-[17px] nhm:text-[18px] whitespace-nowrap font-medium">{value}</p>
    </div>
  );
};

export default DashboardCard;
