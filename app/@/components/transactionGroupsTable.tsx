import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/@/components/ui/table";
import EditTransactionGroup from "./editTransactionGroup";
import { TransactionGroup } from "~/types/models";
import DeleteTransactionGroup from "./deleteTransactionGroup";

export default function TransactionGroupsTable({
  groups,
}: {
  groups: Array<TransactionGroup>;
}) {
  return (
    <div className="border rounded-md border-grey-300 mt-4">
      <Table>
        <TableCaption>A list of your transaction groups.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead align="center">Color</TableHead>
            <TableHead>Partners</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>{group.description}</TableCell>
              <TableCell align="center" className="w-[50px]">
                <div
                  className="w-[20px] h-[20px] rounded-full"
                  style={{
                    backgroundColor: group.color,
                  }}
                ></div>
              </TableCell>
              <TableCell>{group.partners.join(", ")}</TableCell>
              <TableCell className="flex gap-4">
                <EditTransactionGroup group={group} />
                <DeleteTransactionGroup group={group} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
