import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TransactionImport } from "~/types/models";
import DeleteTransactionImport from "./deleteTransactionImport";

export default function TransactionImportsTable({
  imports,
}: {
  imports: Array<TransactionImport> | null;
}) {
  return (
    <Table className="border rounded-md border-grey-300 mt-4 max-w-xl">
      <TableCaption>A list of your transaction imports.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Transactions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {imports?.map((transactionImport: TransactionImport) => (
          <TableRow key={transactionImport.id}>
            <TableCell className="font-medium">
              {transactionImport.id}
            </TableCell>
            <TableCell className="font-medium">
              date
              {/* {new Date(transactionImport.createdAt).toString()} */}
            </TableCell>
            <TableCell className="font-medium">
              {transactionImport.transactions}
            </TableCell>
            <TableCell className="font-medium">
              <DeleteTransactionImport transactionImport={transactionImport} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
