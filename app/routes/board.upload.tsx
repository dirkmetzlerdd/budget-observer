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
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";
import { OutletContext } from "~/types/main";
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

  // console.log("allTransactionImport");
  // console.log(allTransactionImport);
  return json({ allTransactionImport });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const form = await request.formData();
  const rawBody = form.get("body");
  const formName = form.get("formName") as string;

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
  const { allTransactionImport } = useLoaderData<typeof loader>();

  return (
    <>
      <CsvUpload outletContext={outletContext} />
      <TransactionImportsTable imports={allTransactionImport.data} />
    </>
  );
}
