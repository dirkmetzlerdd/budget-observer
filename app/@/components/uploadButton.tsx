import { Label } from "@radix-ui/react-label";
import { Form, useSubmit } from "@remix-run/react";
import { Input } from "./ui/input";
import { OutletContext } from "~/types/main";

export function CsvUpload({ outletContext }: { outletContext: OutletContext }) {
  const submit = useSubmit();

  function readCsv(input: React.ChangeEvent<HTMLInputElement>) {
    const file = input.target.files && input.target.files[0];

    if (!file) return;
    if (file.type !== "text/csv") {
      console.log("UI ERROR: NOT CSV!"); // TODO: add a toast message
    }

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const result = reader.result;

      if (typeof result === "string") {
        const csv = result.split("\n");

        (async function () {
          submit(
            { body: JSON.stringify(csv) },
            { method: "post", action: "/board/upload" },
          );
        })();
      }
    };
  }

  return (
    <div className="bg-sltae-300">
      <Form method="post" encType="multipart/form-data">
        <div className="max-w-md">
          <Label htmlFor="budgetFile">File:</Label>
          <Input id="budgetFile" type="file" name="upload" onChange={readCsv} />
        </div>
      </Form>
    </div>
  );
}
