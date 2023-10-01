import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import CreateNewPurchaseGroup from "~/@/components/createNewPurchaseGroup";
import PurchaseGroupsTable from "~/@/components/purchaseGroupsTable";
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
    .from("purchaseGroup")
    .select()
    .eq("owner_id", session?.user.id);

  return json({ groups: data });
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
  const formName = formData.get("formName");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const recipients = formData.get("recipients") as string;
  const color = formData.get("color") as string;

  if (formName === "createPurchaseGroup") {
    supabase.from("purchaseGroup").insert({
      name,
      description,
      color: color,
      // recipients: {},
      owner_id: userId,
    });
  }

  if (formName === "editPurchaseGroup") {
    const url = new URL(request.url);
    const groupid = url.searchParams.get("groupid");

    const { status, data } = await supabase
      .from("purchaseGroup")
      .update({
        name,
        description,
        // recipients: {},
        color: color,
      })
      .eq("id", groupid);
  }

  return json({});
};

export default function Purchasegroup() {
  const { groups } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-md font-bold">My Purchase Groups</h1>
      <CreateNewPurchaseGroup />
      <PurchaseGroupsTable data={groups} />
    </div>
  );
}
