import { Label } from "@radix-ui/react-label";
import { Form } from "@remix-run/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { extractTransactions } from "../lib/csvParser";
import { OutletContext } from "~/types/main";

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

        const transactions = extractTransactions(arr)
          .map((line) => line.split(";"))
          .map((line) => {
            return {
              date: new Date(line[0]),
              recipient: line[2],
              bookingType: line[3],
              usage: line[4],
              amount: parseFloat(line[5]), // TODO FORMAT!!
              owner_id: outletContext.session.user.id,
            };
          });

        (async function () {
          const { status, data } = await outletContext.supabase
            .from("transaction")
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
