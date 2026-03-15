import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: [string, string];
  values: [number, number];
  colors: [string, string];
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: { padding: 20, usePointStyle: true },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => `${ctx.label}: ₹${ctx.parsed.toLocaleString()}`,
      },
    },
  },
};

export default function PieChart({ labels, values, colors }: PieChartProps) {
  return (
    <div className="h-64">
      <Pie
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              borderWidth: 2,
              borderColor: "#ffffff",
            },
          ],
        }}
        options={pieOptions}
      />
    </div>
  );
}
