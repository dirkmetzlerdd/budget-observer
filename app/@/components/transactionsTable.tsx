import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/@/components/ui/table";
import SelectTransactionGroup from "./selectTransactionGroup";
import { OutletContext } from "~/types/main";

export default function TransactionsTable({
  transactions,
  groups,
  outletContext,
}: {
  transactions: any;
  groups: any;
  outletContext: OutletContext;
}) {
  return (
    <div className="border rounded-md border-grey-300">
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.date}</TableCell>
              <TableCell>
                <SelectTransactionGroup
                  transactionId={item.id}
                  purchaseGroupId={item.purchaseGroupId}
                  groups={groups}
                  outletContext={outletContext}
                />
              </TableCell>
              <TableCell>{item.recipient}</TableCell>
              <TableCell>{item.usage}</TableCell>
              <TableCell className="text-right">{item.amount}</TableCell>
              {/* <TableCell className="text-right">
                <Pencil size={18} className="cursor-pointer" />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
