import React from 'react';

type DashboardCardProps = {

  title: string;
  value: string | number;

};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="bg-[#263C5A] text-white shadow-lg rounded-lg pt-[70px] pb-[70px] pl-[140px] pr-[140px] flex flex-col items-center justify-center h-24 md:h-32 w-48 md:w-60 mx-auto">
      <h2 className="font-semibold mb-2 text-[20px] whitespace-nowrap">{title}</h2>
      <p className="text-[19px] whitespace-nowrap font-medium">{value}</p>
    </div>
  );
};
export default DashboardCard;
