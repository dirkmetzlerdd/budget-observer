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

export default function EditPurchaseGroup({ group }: { group: any }) {
  const [isOpen, toggleIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggle = () => {
    if (isOpen) {
      const params = new URLSearchParams();
      params.set("groupid", "");
      setSearchParams(params);
    } else {
      const params = new URLSearchParams();
      params.set("groupid", group.id);
      setSearchParams(params);
    }

    toggleIsOpen(!isOpen);
  };

  console.log(searchParams);
  return (
    <section>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={toggle}>
            <Pencil size={18} className="cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>Edit your purchase group.</DialogDescription>
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
                defaultValue={group.nadescriptionme}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="emrecipientsail">Recipients</Label>
              <Input
                type="text"
                name="recipients"
                placeholder="recipients"
                defaultValue={group.recipients}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="emrecipientsail">Color</Label>
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
                value={"editPurchaseGroup"}
                onClick={toggle}
              >
                Update
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
