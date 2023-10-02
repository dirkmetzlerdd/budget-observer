import { Form, useSearchParams } from "@remix-run/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "app/@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { TransactionGroup } from "~/types/models";

export default function EditTransactionGroup({
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
        <Button variant="outline" onClick={() => toggleIsOpen(!isOpen)}>
          <Pencil size={18} className="cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>Edit your transaction group.</DialogDescription>
        </DialogHeader>
        <Form method="POST" className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={group.name}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              defaultValue={group.description}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="partners">Partners</Label>
            <Input
              type="text"
              name="partners"
              placeholder="partners"
              defaultValue={group.partners}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="color">Color</Label>
            <Input
              type="text"
              name="color"
              placeholder="color"
              defaultValue={group.color}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              name="formName"
              value={"editTransactionGroup"}
              onClick={() => toggleIsOpen(!isOpen)}
            >
              Update
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
