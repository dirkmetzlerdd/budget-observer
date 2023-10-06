import { Label } from "@radix-ui/react-label";
import { Form, useSearchParams } from "@remix-run/react";
import { Input } from "./ui/input";
import { extractTransactions } from "../lib/csvParser";
import { OutletContext } from "~/types/main";
import { DbTables } from "~/types/db";
import { TransactionGroup, TransactionImport } from "~/types/models";
import { switchDayAndMonth } from "../lib/dates";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { useEffect, useState } from "react";

export function CsvUpload({
  outletContext,
  allGroupsImport,
}: {
  outletContext: OutletContext;
  allGroupsImport: TransactionImport[] | null;
}) {
  // const [isOpen, toggleIsOpen] = useState(false);
  // const [_, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   if (isOpen) {
  //     const params = new URLSearchParams();
  //     params.set("groupid", group.id);
  //     setSearchParams(params);
  //   }
  // }, [isOpen]);

  function getDetectedGroupId(
    allGroups: Array<TransactionGroup>,
    transactionPartner: string,
  ) {
    let count = 0;
    let detectedId = undefined;
    allGroups.forEach((group) => {
      group.partners.forEach((grouppartner) => {
        if (
          transactionPartner.toLowerCase().includes(grouppartner.toLowerCase())
        ) {
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
            .insert({ owner_id: outletContext?.session?.user.id })
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

          await outletContext.supabase
            .from(DbTables.TRANSACTION_IMPORT)
            .update({ transactions: transactions.length })
            .match({
              id: newTransactionImport.data
                ? newTransactionImport.data[0].id
                : null,
            });
          window.location.reload();
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
      <div className="border rounded-md border-grey-300 mt-4">
        <Table>
          <TableCaption>A list of your transaction groups.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Transactions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allGroupsImport?.map((groupsImport) => (
              <TableRow key={groupsImport.id}>
                <TableCell className="font-medium">{groupsImport.id}</TableCell>
                <TableCell className="font-medium">
                  {groupsImport.transactions}
                </TableCell>
                {/* <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      // onClick={() => toggleIsOpen(!isOpen)}
                    >
                      <Trash2 size={18} className="cursor-pointer" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogDescription>
                        Delete <strong>{"group.name"}</strong>
                      </DialogDescription>
                    </DialogHeader>
                    <Form method="POST" className="flex flex-col gap-4">
                      Are you absolutely sure?
                      <DialogFooter>
                        <Button
                          type="submit"
                          name="formName"
                          value={"deleteTransactionGroup"}
                          // onClick={() => toggleIsOpen(!isOpen)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </Form>
                  </DialogContent>
                </Dialog> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
