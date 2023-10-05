import { Label } from "@radix-ui/react-label";
import { Form } from "@remix-run/react";
import { Input } from "./ui/input";
import { extractTransactions } from "../lib/csvParser";
import { OutletContext } from "~/types/main";
import { DbTables } from "~/types/db";
import { TransactionGroup } from "~/types/models";
import { switchDayAndMonth } from "../lib/dates";

export function CsvUpload({ outletContext }: { outletContext: OutletContext }) {
  function getDetectedGroupId(
    allGroups: Array<TransactionGroup>,
    transactionPartner: string,
  ) {
    let count = 0;
    let detectedId = undefined;
    allGroups.forEach((group) => {
      group.partners.forEach((grouppartner) => {
        if (transactionPartner.includes(grouppartner)) {
          detectedId = group.id;
          ++count;
        }
      });
    });

    if (count > 1) return undefined;
    return detectedId;
  }

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

          const allGroups = await outletContext.supabase
            .from(DbTables.TRANSACTION_GROUP)
            .select()
            .eq("owner_id", outletContext.session.user.id);

          const defaultGroup = allGroups.data?.find(
            (item) => item.name === "Other",
          );

          const defaultId = defaultGroup.id ? defaultGroup.id : null;

          const transactions = extractTransactions(arr)
            .map((line) => line.split(";"))
            .map((line) => {
              const detectedGroupId = getDetectedGroupId(
                allGroups.data as TransactionGroup[],
                line[2],
              );

              return {
                date: new Date(switchDayAndMonth(line[0])),
                partner: line[2],
                bookingType: line[3],
                usage: line[4],
                amount: parseFloat(
                  line[5].replaceAll(".", "").replaceAll(",", "."),
                ),
                owner_id: outletContext.session.user.id,
                transactionGroupId: detectedGroupId || defaultId,
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
