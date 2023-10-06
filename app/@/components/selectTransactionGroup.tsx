import { DbTables } from "~/types/db";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { OutletContext } from "~/types/main";
import { TransactionGroup } from "~/types/models";
import ColorPopover from "./colorPopover";

export default function SelectTransactionGroup({
  transactionId,
  groups,
  transactionGroupId,
  outletContext,
}: {
  transactionId: string;
  transactionGroupId: string;
  groups: Array<TransactionGroup>;
  outletContext: OutletContext;
}) {
  const update = (value: string) => {
    const id = groups.find((group) => group.name === value)?.id;

    (async function () {
      await outletContext.supabase
        .from(DbTables.TRANSACTION)
        .update({ transactionGroupId: id })
        .eq("id", transactionId);
    })();
  };

  return (
    <Select
      onValueChange={update}
      defaultValue={
        groups.find((group) => group.id === transactionGroupId)?.name
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Group</SelectLabel>
          {groups.map((group) => (
            <SelectItem
              key={group.id}
              value={group.name}
              className="flex flex-row"
            >
              <span
                className="p-1 mr-2"
                style={{
                  backgroundColor: group.color,
                }}
              ></span>
              {group.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
