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

  const { data } = await supabase.from("purchaseGroup").select();

  return json({ groups: data });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  console.log(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const recipients = formData.get("recipients") as string;

  const { status, data } = await supabase
    .from("purchaseGroup")
    .insert({
      name,
      description,
      // recipients: {},
      owner_id: userId,
    })
    .select();

  // if (status !== 201 || !data || data?.length === 0) {
  //   return redirect("/");
  // }

  // const newModel: Model = data[0];

  // if (!newModel.id) {
  //   return redirect("/");
  // }

  return json({ data, status });
};

export default function Purchasegroup() {
  const data = useActionData<typeof action>();
  const { groups } = useLoaderData<typeof loader>();

  console.log(groups);
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-md font-bold">My Purchase Groups</h1>
      <CreateNewPurchaseGroup />
      <PurchaseGroupsTable data={groups} />
    </div>
  );
}
