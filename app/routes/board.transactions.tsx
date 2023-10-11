import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import TransactionsTable from "~/@/components/transactionsTable";
import { Input } from "~/@/components/ui/input";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";
import { OutletContext } from "~/types/main";
import { Transaction, TransactionGroup } from "~/types/models";
import { XSquare } from "lucide-react";
import { Button } from "app/@/components/ui/button";

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
    .order("date")
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

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          className="max-w-[250px]"
          type="text"
          name="search"
          placeholder="Filter..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          className="bg-white border-2 hover:bg-slate-200  cursor-pointer transition ease-in-out duration-150"
          onClick={() => setSearch("")}
        >
          {" "}
          <XSquare color="#000000" />
        </Button>
      </div>

      <h1 className="mb-4 text-md font-bold">Transactions</h1>
      <TransactionsTable
        transactions={transactions.filter(
          (item: any) =>
            item.usage.includes(search) || item.partner.includes(search),
        )}
        groups={groups}
        outletContext={outletContext}
      />
    </div>
  );
}
