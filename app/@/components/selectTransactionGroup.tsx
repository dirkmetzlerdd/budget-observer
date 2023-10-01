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

export default function SelectTransactionGroup({
  transactionId,
  groups,
  purchaseGroupId,
  outletContext,
}: {
  transactionId: string;
  purchaseGroupId: string;
  groups: any;
  outletContext: OutletContext;
}) {
  const update = (value: string) => {
    const id = groups.find((item) => item.name === value)?.id;

    (async function () {
      await outletContext.supabase
        .from("transaction")
        .update({ purchaseGroupId: id })
        .eq("id", transactionId);
    })();
  };

  return (
    <Select
      onValueChange={update}
      defaultValue={groups.find((group) => group.id === purchaseGroupId)?.name}
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
