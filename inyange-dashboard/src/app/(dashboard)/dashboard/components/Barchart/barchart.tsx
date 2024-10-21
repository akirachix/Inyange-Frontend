import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface BarChartData {
  [key: string]: string | number;  
}

interface BarChartComponentProps {
  data: BarChartData[];
  xAxisKey: string;
  barDataKey: string;
  title: string;
  barColor?: string;
  yAxisLabelFontSize?: string;
  yAxisLabel?: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data, xAxisKey, barDataKey, title, barColor = '#8884D8', yAxisLabel,
}) => {
  
  const yAxisTickFormatter = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value.toFixed(0); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 md:mb-8 text-[20px]">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 50, left: 15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#666' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={yAxisTickFormatter}  
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#666' }}
            tickLine={false}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              offset: -10,
              style: { textAnchor: 'middle', fill: '#666', fontSize: '17px' },
            }}
          />
          <Tooltip />
          <Bar dataKey={barDataKey} fill={barColor} barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
