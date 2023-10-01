import { Form } from "@remix-run/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateNewPurchaseGroup() {
  const [isOpen, toggleIsOpen] = useState(false);

  return (
    <section>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => toggleIsOpen(!isOpen)}>
            <Plus className="mr-3" />
            new purchase group
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              Create your new purchase group.
            </DialogDescription>
          </DialogHeader>
          <Form method="POST" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" placeholder="Name" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Input type="text" name="description" placeholder="Description" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="emrecipientsail">Recipients</Label>
              <Input type="text" name="recipients" placeholder="recipients" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="emrecipientsail">Color</Label>
              <Input type="text" name="color" placeholder="color" />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                name="formName"
                value={"createPurchaseGroup"}
                onClick={() => toggleIsOpen(!isOpen)}
              >
                Create
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
