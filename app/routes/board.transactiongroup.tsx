import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CreateTransactionGroup from "~/@/components/createTransactionGroup";
import TransactionGroupsTable from "~/@/components/transactionGroupsTable";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";
import { TransactionGroup } from "~/types/models";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) {
    return redirect("/");
  }

  const { data }: { data: Array<TransactionGroup> | null } = await supabase
    .from(DbTables.TRANSACTION_GROUP)
    .select()
    .eq("owner_id", session?.user.id);

  return json({ groups: data || [] });
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const formName = formData.get("formName") as string;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const partners = formData.get("partners") as string;
  const color = formData.get("color") as string;

  if (formName === "createTransactionGroup") {
    await supabase.from(DbTables.TRANSACTION_GROUP).insert({
      name,
      description,
      color,
      partners: [partners],
      owner_id: userId,
    });
  }

  if (formName === "editTransactionGroup") {
    const url = new URL(request.url);
    const groupid = url.searchParams.get("groupid");

    await supabase
      .from(DbTables.TRANSACTION_GROUP)
      .update({
        name,
        description,
        partners: [partners],
        color: color,
      })
      .eq("id", groupid);
  }

  if (formName === "deleteTransactionGroup") {
    const url = new URL(request.url);
    const groupid = url.searchParams.get("groupid");

    await supabase.from(DbTables.TRANSACTION_GROUP).delete().eq("id", groupid);
  }

  return json({});
};

export default function TransactionGroups() {
  const { groups } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-md font-bold">My Transaction Groups</h1>
      <CreateTransactionGroup />
      <TransactionGroupsTable groups={groups} />
    </div>
  );
}
