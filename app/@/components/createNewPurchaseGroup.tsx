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

export default function CreateNewPurchaseGroup() {
  return (
    <section className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-3" />
            new purchase group
          </Button>
        </DialogTrigger>
        <Form
          method="POST"
          className="flex flex-col justify-center items-center w-full max-w-xl"
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogDescription>
                Create your new purchase group.
              </DialogDescription>
            </DialogHeader>
            <section className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" placeholder="Name" />
            </section>
            <section className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Input type="text" name="description" placeholder="Description" />
            </section>
            <section className="flex flex-col gap-3">
              <Label htmlFor="emrecipientsail">Recipients</Label>
              <Input type="text" name="recipients" placeholder="recipients" />
            </section>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>{" "}
        </Form>
      </Dialog>
    </section>
  );
}
