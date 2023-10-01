import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import TransactionsTable from "~/@/components/transactionsTable";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { OutletContext } from "~/types/main";

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
  const transactionData = await supabase
    .from("transaction")
    .select()
    .eq("owner_id", session?.user.id);

  const groupData = await supabase
    .from("purchaseGroup")
    .select()
    .eq("owner_id", session?.user.id);

  return json({ transactions: transactionData.data, groups: groupData.data });
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
