import { useState } from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({
  dataSet,
  title,
}: {
  dataSet: Array<any>;
  title: string;
}) {
  const [chartData, _] = useState({
    labels: dataSet.map((data) => data.name),
    datasets: [
      {
        label: "$",
        data: dataSet.map((data) => data.amount),
        backgroundColor: dataSet.map((item) => item.color),
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });

  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
        }}
      />
    </div>
  );
}
