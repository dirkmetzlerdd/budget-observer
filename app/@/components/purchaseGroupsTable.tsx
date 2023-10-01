import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/@/components/ui/table";
import EditNewPurchaseGroup from "./editPurchaseGroup";

export default function PurchaseGroupsTable({ data }: { data: any }) {
  return (
    <div className="border rounded-md border-grey-300 mt-4">
      <Table>
        <TableCaption>A list of your purchase groups.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Recepients</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((group: any) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>
                {group.description}
                ID:
                {group.id}
              </TableCell>
              <TableCell>{group.color}</TableCell>
              <TableCell>{group.recepients}</TableCell>
              <TableCell className="flex gap-4">
                <EditNewPurchaseGroup group={group} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
