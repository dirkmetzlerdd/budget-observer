import { Form } from "@remix-run/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CreateNewPurchaseGroup() {
  return (
    <Form
      method="POST"
      className="flex flex-col justify-center items-center w-full max-w-xl"
    >
      <div className="flex flex-col justify-center w-full p-4 gap-6 rounded-md">
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
        <section>
          <Button type="submit">Create</Button>{" "}
        </section>
      </div>
    </Form>
  );
}
