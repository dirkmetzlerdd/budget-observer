import { ReactNode, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({
  dataSet,
  title,
  summary,
}: {
  dataSet: Array<any>;
  title: string;
  summary: ReactNode;
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

  const emptyDataSet = {
    labels: ["No data"],
    datasets: [
      {
        label: "",
        data: [-1],
        backgroundColor: ["grey"],
        borderColor: "",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Pie
        data={dataSet.length ? chartData : emptyDataSet}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
        }}
      />
      {summary}
    </div>
  );
}
