import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import PieChart from "~/@/components/pieChart";
import { getPieChartData } from "~/@/lib/pieChartData";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { Transaction, TransactionGroup } from "~/types/models";
import { DbTables } from "~/types/db";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) {
    return redirect("/");
  }

  const transactionData: { data: Array<Transaction> | null } = await supabase
    .from(DbTables.TRANSACTION)
    .select()
    .eq("owner_id", session?.user.id);

  const groupData: { data: Array<TransactionGroup> | null } = await supabase
    .from(DbTables.TRANSACTION_GROUP)
    .select()
    .eq("owner_id", session?.user.id);

  const pieChartData = getPieChartData(
    transactionData.data as Transaction[],
    groupData.data as TransactionGroup[],
  );

  return json({ pieChartData: pieChartData || [] });
}

export default function Charts() {
  const { pieChartData } = useLoaderData<typeof loader>();

  Chart.register(CategoryScale);
  const [chartData, setChartData] = useState({
    labels: pieChartData.map((data) => data.name),
    datasets: [
      {
        label: "$",
        data: pieChartData.map((data) => data.amount),
        backgroundColor: pieChartData.map((item) => item.color),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="w-[50%]">
      <PieChart chartData={chartData} />
    </div>
  );
}
