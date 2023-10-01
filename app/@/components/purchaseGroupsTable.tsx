import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/@/components/ui/table";
import { Pencil } from "lucide-react";

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
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                {item.description}
                ID:
                {item.id}
              </TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.recepients}</TableCell>
              <TableCell className="flex gap-4">
                <Pencil size={18} className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
