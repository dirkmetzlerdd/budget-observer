import { Pie } from "react-chartjs-2";

export default function PieChart({ chartData }: { chartData: any }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Costs",
            },
          },
        }}
      />
    </div>
  );
}
