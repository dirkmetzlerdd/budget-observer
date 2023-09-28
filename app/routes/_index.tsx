import { Label } from "@radix-ui/react-label";
import {
  unstable_parseMultipartFormData,
  type MetaFunction,
  unstable_createFileUploadHandler,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { Input } from "app/@/components/ui/input";
import { Button } from "~/@/components/ui/button";
import { parseCSVFile } from "~/@/lib/csvParser.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const fileUploadHandler = unstable_createFileUploadHandler({
  directory: "./tmpUploads",
  file: ({ filename }) => filename,
});

export async function loader({ request, params }: LoaderFunctionArgs) {
  parseCSVFile("/my/path");
  return json({});
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler,
  );
  const uploadedFile = formData.get("upload");

  // @ts-ignore
  parseCSVFile(uploadedFile?.filepath);
  return {};
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="bg-sltae-300 p-4">
        <Form method="post" encType="multipart/form-data">
          <div className="max-w-md">
            <Label htmlFor="budgetFile">File:</Label>
            <Input id="budgetFile" type="file" name="upload" />
          </div>
          <Button className="mt-2" type="submit">Upload</Button>
        </Form>
        <Outlet />
      </div>
    </div>
  );
}
