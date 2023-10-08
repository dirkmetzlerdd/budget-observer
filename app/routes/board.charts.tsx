import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "~/@/components/pieChart";
import { getPieChartData } from "~/@/lib/pieChartData";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { Transaction, TransactionGroup } from "~/types/models";
import { DbTables } from "~/types/db";
import { useLoaderData } from "@remix-run/react";
import FromToDatePicker from "~/@/components/fromToDatePciker";
import ChartSummary from "~/@/components/chartSummary";
import { getUserId } from "~/@/lib/db";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const userId = await getUserId(supabase);

  if (!userId) return redirect("/");

  const url = new URL(request.url);
  const fromdate = url.searchParams.get("fromdate");
  const todate = url.searchParams.get("todate");

  let transactionData: { data: Array<Transaction> | null } = { data: null };

  if (fromdate && todate) {
    transactionData = await supabase
      .from(DbTables.TRANSACTION)
      .select("*")
      .lt("date", todate)
      .gt("date", fromdate)
      .eq("owner_id", userId);
  }

  if (!fromdate && todate) {
    transactionData = await supabase
      .from(DbTables.TRANSACTION)
      .select("*")
      .lt("date", todate)
      .eq("owner_id", userId);
  }

  if (fromdate && !todate) {
    transactionData = await supabase
      .from(DbTables.TRANSACTION)
      .select("*")
      .gt("date", fromdate)
      .eq("owner_id", userId);
  }

  if (!fromdate && !todate) {
    transactionData = await supabase
      .from(DbTables.TRANSACTION)
      .select("*")
      .eq("owner_id", userId);
  }

  const groupData: { data: Array<TransactionGroup> | null } = await supabase
    .from(DbTables.TRANSACTION_GROUP)
    .select()
    .eq("owner_id", userId);

  const expenses = getPieChartData(
    "expenses",
    transactionData.data as Transaction[],
    groupData.data as TransactionGroup[],
  );

  const spentTotal = expenses
    .map((item) => item.amount)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const income = getPieChartData(
    "income",
    transactionData.data as Transaction[],
    groupData.data as TransactionGroup[],
  );

  const incomeTotal = income
    .map((item) => item.amount)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  return json({
    expenses: expenses || [],
    income: income || [],
    spentTotal,
    incomeTotal,
  });
}

export default function Charts() {
  const { expenses, income, incomeTotal, spentTotal } =
    useLoaderData<typeof loader>();
  Chart.register(CategoryScale);

  return (
    <>
      <FromToDatePicker />
      <div className="rounded-md border flex flex-col justify-between px-2 my-4 pb-6 md:flex-row">
        <div className="flex-1">
          <PieChart
            dataSet={expenses}
            title="Expenses"
            summary={<ChartSummary text={`Spent: ${spentTotal}`} />}
          />
        </div>
        <div className="flex-1">
          <PieChart
            dataSet={income}
            title="Income"
            summary={<ChartSummary text={`Earned: ${incomeTotal}`} />}
          />
        </div>
      </div>
    </>
  );
}
