import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useOutletContext, useLoaderData } from "@remix-run/react";
import { CsvUpload } from "~/@/components/uploadButton";
import { OutletContext } from "~/types/main";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";
import { TransactionImport } from "~/types/models";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const allGroupsImport: { data: Array<TransactionImport> | null } =
    await supabase
      .from(DbTables.TRANSACTION_IMPORT)
      .select()
      .eq("owner_id", session?.user.id);
  return json({ allGroupsImport: allGroupsImport });
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  return json({});
};

export default function Upload() {
  const outletContext = useOutletContext<OutletContext>();
  const { allGroupsImport } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <CsvUpload
        outletContext={outletContext}
        allGroupsImport={allGroupsImport.data}
      />
    </div>
  );
}
