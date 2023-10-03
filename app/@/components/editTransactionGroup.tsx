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
import { Pencil, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TransactionGroup } from "~/types/models";

export default function EditTransactionGroup({
  group,
}: {
  group: TransactionGroup;
}) {
  const [partners, setPartners] = useState(group.partners);
  const [isOpen, toggleIsOpen] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams();
      params.set("groupid", group.id);
      setSearchParams(params);
    } else {
      setPartners(group.partners);
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
            {partners.map((partner, i) => {
              return (
                <div className="flex flex-row">
                  <Input type="text" name="partners" defaultValue={partner} />
                  <X
                    className="cursor-pointer h-full ml-2 transition-all duration-100 hover:scale-125 flex align-middle"
                    id={`${i}`}
                    size={20}
                    onClick={(e) => {
                      e.preventDefault();
                      setPartners(partners.filter((_, j) => i !== j));
                    }}
                  />
                </div>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setPartners([...partners, ""]);
              }}
            >
              <Plus className="mr-3" />
              add partner
            </Button>
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
