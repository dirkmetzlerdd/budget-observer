import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import CreateNewPurchaseGroup from "~/@/components/createNewPurchaseGroup";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
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

  console.log(data);
  return (
    <div className="flex">
      <CreateNewPurchaseGroup />
    </div>
  );
}
