import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "~/@/components/pieChart";
import { getPieChartData } from "~/@/lib/pieChartData";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { Transaction, TransactionGroup } from "~/types/models";
import { DbTables } from "~/types/db";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/@/lib/db";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const userId = await getUserId(supabase);

  if (!userId) return redirect("/");

  const transactionData: { data: Array<Transaction> | null } = await supabase
    .from(DbTables.TRANSACTION)
    .select()
    .eq("owner_id", userId);

  const groupData: { data: Array<TransactionGroup> | null } = await supabase
    .from(DbTables.TRANSACTION_GROUP)
    .select()
    .eq("owner_id", userId);

  const expenses = getPieChartData(
    "expenses",
    transactionData.data as Transaction[],
    groupData.data as TransactionGroup[],
  );

  const income = getPieChartData(
    "income",
    transactionData.data as Transaction[],
    groupData.data as TransactionGroup[],
  );

  return json({ expenses: expenses || [], income: income || [] });
}

export default function Charts() {
  const { expenses, income } = useLoaderData<typeof loader>();
  Chart.register(CategoryScale);

  return (
    <div className="rounded-md border flex justify-between px-2 pb-6">
      <div className="w-[45%]">
        <PieChart dataSet={expenses} title="Expenses" />
      </div>
      <div className="w-[45%]">
        <PieChart dataSet={income} title="Income" />
      </div>
    </div>
  );
}
