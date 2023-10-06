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

  const allTransactionImport: { data: Array<TransactionImport> | null } =
    await supabase
      .from(DbTables.TRANSACTION_IMPORT)
      .select()
      .eq("owner_id", session?.user.id);
  return json({ allTransactionImport: allTransactionImport });
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

  if (formName === "deleteTransactionImport") {
    const response = new Response();
    const supabase = createSupabaseServerClient({ request, response });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user.id) {
      return redirect("/");
    }
    const url = new URL(request.url);
    const transactionImportId = url.searchParams.get("transactionImport");

    await supabase
      .from(DbTables.TRANSACTION)
      .delete()
      .match({
        owner_id: session?.user.id,
        transactionId: transactionImportId,
      });
    await supabase
      .from(DbTables.TRANSACTION_IMPORT)
      .delete()
      .match({
        owner_id: session?.user.id,
        id: transactionImportId,
      });
  }
  return json({});
};

export default function Upload() {
  const outletContext = useOutletContext<OutletContext>();
  const { allTransactionImport } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <CsvUpload
        outletContext={outletContext}
        allTransactionImport={allTransactionImport.data}
      />
    </div>
  );
}
