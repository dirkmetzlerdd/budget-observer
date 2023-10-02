import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import TransactionsTable from "~/@/components/transactionsTable";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";
import { OutletContext } from "~/types/main";
import { Transaction, TransactionGroup } from "~/types/models";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) {
    return redirect("/");
  }

  // TODO Parallel request
  const transactionData: { data: Array<Transaction> | null } = await supabase
    .from(DbTables.TRANSACTION)
    .select()
    .eq("owner_id", session?.user.id);

  const groupData: { data: Array<TransactionGroup> | null } = await supabase
    .from(DbTables.TRANSACTION_GROUP)
    .select()
    .eq("owner_id", session?.user.id);

  return json({
    transactions: transactionData.data || [],
    groups: groupData.data || [],
  });
}

export default function Transactions() {
  const { transactions, groups } = useLoaderData<typeof loader>();
  const outletContext = useOutletContext<OutletContext>();

  return (
    <div className="flex">
      <TransactionsTable
        transactions={transactions}
        groups={groups}
        outletContext={outletContext}
      />
    </div>
  );
}
