import { Label } from "@radix-ui/react-label";
import { Form } from "@remix-run/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function CsvUploadButton() {
  return (
    <div className="bg-sltae-300">
      <Form method="post" encType="multipart/form-data">
        <div className="max-w-md">
          <Label htmlFor="budgetFile">File:</Label>
          <Input
            id="budgetFile"
            type="file"
            name="upload"
            onInput={() => console.log("INPUT")}
            onSelect={() => console.log("HHHH")}
            onChange={() => console.log("CHANGE")}
          />
        </div>
        <Button className="mt-2" type="submit">
          Upload
        </Button>
      </Form>
    </div>
  );
}
