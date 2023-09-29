import { CsvUploadButton } from "~/@/components/uploadButton";
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { parseCSVFile } from "~/@/lib/csvParser.server";

export const fileUploadHandler = unstable_createFileUploadHandler({
  directory: "./tmpUploads",
  file: ({ filename }) => filename,
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler,
  );
  const uploadedFile = formData.get("upload");

  // @ts-ignore
  parseCSVFile(uploadedFile?.filepath);
  return redirect("/");
};

export default function Upload() {
  return (
    <div>
      <CsvUploadButton />
    </div>
  );
}
