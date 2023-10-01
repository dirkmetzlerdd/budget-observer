import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TransactionsTable from "~/@/components/transactionsTable";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) {
    return redirect("/");
  }

  const { data } = await supabase
    .from("transaction")
    .select()
    .eq("owner_id", session?.user.id);

  return json({ data });
}

export default function Transactions() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="flex">
      <TransactionsTable data={data} />
    </div>
  );
}
