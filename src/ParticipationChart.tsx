import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Tipe props untuk komponen
interface ParticipationChartProps {
  className?: string;
}

// Data partisipasi training
const labels: string[] = ["Jakarta", "Surabaya", "Bandung", "Medan"];
const values: number[] = [45, 28, 15, 12];

const data = {
  labels,
  datasets: [
    {
      label: "Partisipasi training (%)",
      data: values,
      backgroundColor: [
        "rgba(59, 130, 246, 0.9)", // biru
        "rgba(234, 88, 12, 0.9)", // oranye
        "rgba(16, 185, 129, 0.9)", // hijau
        "rgba(168, 85, 247, 0.9)", // ungu
      ],
      borderColor: [
        "rgba(255,255,255,0.9)",
        "rgba(255,255,255,0.9)",
        "rgba(255,255,255,0.9)",
        "rgba(255,255,255,0.9)",
      ],
      borderWidth: 2,
    },
  ],
};

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Aktivitas Pembelajaran per Cabang",
      font: {
        size: 16,
      },
    },
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 12,
        padding: 12,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed || 0;
          return `${label}: ${value}%`;
        },
      },
    },
  },
};

const ParticipationChart: React.FC<ParticipationChartProps> = ({
  className = "h-96 w-full",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {/* <h3 className="text-lg font-semibold">Aktivitas Pembelajaran per</h3> */}
        <h3></h3>
        <span className="text-sm text-gray-500">
          Total: {values.reduce((a, b) => a + b, 0)}%
        </span>
      </div>

      <div className="relative h-72">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ParticipationChart;
