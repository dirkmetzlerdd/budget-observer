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
import { Transaction, TransactionGroup } from "~/types/models";

export default function TransactionsTable({
  transactions,
  groups,
  outletContext,
}: {
  transactions: Array<Transaction>;
  groups: Array<TransactionGroup>;
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
          {transactions.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium min-w-[180px]">
                {new Date(item.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <SelectTransactionGroup
                  transactionId={item.id}
                  transactionGroupId={item.transactionGroupId}
                  groups={groups}
                  outletContext={outletContext}
                />
              </TableCell>
              <TableCell>{item.partner}</TableCell>
              <TableCell>{item.usage}</TableCell>
              <TableCell className="text-right">{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
