import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

interface PopularTrainingChartProps {
  className?: string;
}

// Data topik pelatihan paling populer
const labels: string[] = [
  "Digital Marketing",
  "Leadership",
  "Technical Support",
  "Sales Skills",
];
const values: number[] = [234, 198, 187, 156];

const data = {
  labels,
  datasets: [
    {
      label: "Jumlah Peserta",
      data: values,
      backgroundColor: [
        "rgba(59, 130, 246, 0.9)", // biru
        "rgba(234, 88, 12, 0.9)", // oranye
        "rgba(16, 185, 129, 0.9)", // hijau
        "rgba(168, 85, 247, 0.9)", // ungu
      ],
      borderRadius: 8,
    },
  ],
};

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Topik Pelatihan Paling Populer",
      font: {
        size: 16,
      },
    },
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed.y || 0;
          return `${label}: ${value} peserta`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Jumlah Peserta",
      },
    },
  },
};

const PopularTrainingChart: React.FC<PopularTrainingChartProps> = ({
  className = "h-96 w-full",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">
          {/* Topik Pelatihan Paling Populer */}
        </h3>
        <span className="text-sm text-gray-500">
          Total Peserta: {values.reduce((a, b) => a + b, 0)}
        </span>
      </div>

      <div className="relative h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PopularTrainingChart;
