import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import TransactionImportsTable from "~/@/components/transactionImportsTable";
import { CsvUpload } from "~/@/components/uploadButton";
import { handleUploadedCsv } from "~/@/lib/csvParser.server";
import { getUserId } from "~/@/lib/db";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";
import { OutletContext } from "~/types/main";
import { TransactionImport } from "~/types/models";

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const userId = await getUserId(supabase);
  if (!userId) return redirect("/");

  const imports: { data: Array<TransactionImport> | null } = await supabase
    .from(DbTables.TRANSACTION_IMPORT)
    .select()
    .eq("owner_id", userId);

  return json({ imports });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const userId = await getUserId(supabase);
  if (!userId) return redirect("/");

  const form = await request.formData();
  const rawBody = form.get("body");
  const formName = form.get("formName") as string;

  if (formName === "deleteTransactionImport") {
    const url = new URL(request.url);
    const transactionImportId = url.searchParams.get("transactionImport");

    await supabase.from(DbTables.TRANSACTION).delete().match({
      owner_id: userId,
      transactionId: transactionImportId,
    });

    await supabase.from(DbTables.TRANSACTION_IMPORT).delete().match({
      owner_id: userId,
      id: transactionImportId,
    });
  }

  if (!rawBody) {
    return json({});
  }

  if (typeof rawBody !== "string") {
    throw json("Malformed JSON body: expected string body", { status: 400 });
  }

  try {
    const transactions = await handleUploadedCsv(supabase, JSON.parse(rawBody));
    const { status, data } = await supabase
      .from(DbTables.TRANSACTION)
      .insert(transactions)
      .select();

    return json({ status, data });
  } catch {
    throw json("Malformed JSON body: could not parse", { status: 400 });
  }
};

export default function Upload() {
  const outletContext = useOutletContext<OutletContext>();
  const { imports } = useLoaderData<typeof loader>();

  return (
    <>
      <CsvUpload outletContext={outletContext} />
      <TransactionImportsTable imports={imports.data} />
    </>
  );
}
