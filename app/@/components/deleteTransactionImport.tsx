import { Form, useSearchParams } from "@remix-run/react";
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
import { TransactionImport } from "~/types/models";
import { Button } from "./ui/button";

export default function DeleteTransactionImport({
  transactionImport,
}: {
  transactionImport: TransactionImport;
}) {
  const [isOpen, toggleIsOpen] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams();
      params.set("transactionImport", transactionImport.id);
      setSearchParams(params);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => toggleIsOpen(!isOpen)}>
          <Trash2 size={18} className="cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Delete <strong>{transactionImport.id}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form method="POST" className="flex flex-col gap-4">
          Are you absolutely sure?
          <DialogFooter>
            <Button
              type="submit"
              name="formName"
              value={"deleteTransactionImport"}
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
