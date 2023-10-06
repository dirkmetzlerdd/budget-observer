import { ActionFunctionArgs, json } from "@remix-run/node";
import { CsvUpload } from "~/@/components/uploadButton";
import { handleUploadedCsv } from "~/@/lib/csvParser.server";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";
import { DbTables } from "~/types/db";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const form = await request.formData();
  const rawBody = form.get("body");

  if (!rawBody) {
    throw json("Missing body", { status: 400 });
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
  return (
    <div className="">
      <CsvUpload />
    </div>
  );
}
