import { Form, useSearchParams } from "@remix-run/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "app/@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TransactionGroup } from "~/types/models";

export default function DeleteTransactionGroup({
  group,
}: {
  group: TransactionGroup;
}) {
  const [isOpen, toggleIsOpen] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams();
      params.set("groupid", group.id);
      setSearchParams(params);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={group.name === "Other"}
          variant="outline"
          onClick={() => toggleIsOpen(!isOpen)}
        >
          <Trash2 size={18} className="cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Delete <strong>{group.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form method="POST" className="flex flex-col gap-4">
          Are you absolutely sure?
          <DialogFooter>
            <Button
              type="submit"
              name="formName"
              value={"deleteTransactionGroup"}
              onClick={() => toggleIsOpen(!isOpen)}
            >
              Delete
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
