import { Label } from "@radix-ui/react-label";
import { Form } from "@remix-run/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { extractTransactions } from "../lib/csvParser";
import { OutletContext } from "~/types/main";
import { DbTables } from "~/types/db";

export function CsvUpload({ outletContext }: { outletContext: OutletContext }) {
  function readCsv(input: React.ChangeEvent<HTMLInputElement>) {
    let file = input.target.files && input.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const result = reader.result;

      if (typeof result === "string") {
        const arr = result.split("\n");

        (async function () {
          const newTransactionImport = await outletContext.supabase
            .from(DbTables.TRANSACTION_IMPORT)
            .insert({})
            .select();

          const transactions = extractTransactions(arr)
            .map((line) => line.split(";"))
            .map((line) => {
              return {
                date: new Date(line[0]),
                partner: line[2],
                bookingType: line[3],
                usage: line[4],
                amount: parseFloat(line[5]), // TODO FORMAT!!
                owner_id: outletContext.session.user.id,
                transactionGroupId: 18, // GROUP OTHER
                transactionId: newTransactionImport.data
                  ? newTransactionImport.data[0].id
                  : null,
              };
            });

          const { status, data } = await outletContext.supabase
            .from(DbTables.TRANSACTION)
            .insert(transactions)
            .select();
        })();
      }
    };
  }

  return (
    <div className="bg-sltae-300">
      <Form method="post" action="/board" encType="multipart/form-data">
        <div className="max-w-md">
          <Label htmlFor="budgetFile">File:</Label>
          <Input id="budgetFile" type="file" name="upload" onChange={readCsv} />
        </div>
        {/* <Button className="mt-2" type="submit">
          Upload
        </Button> */}
      </Form>
    </div>
  );
}
