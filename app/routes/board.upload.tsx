import { CsvUploadButton } from "~/@/components/uploadButton";
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { parseCSVFile } from "~/@/lib/csvParser.server";

// export const fileUploadHandler = unstable_createFileUploadHandler({
//   directory: "./tmpUploads",
//   file: ({ filename }) => filename,
// });

// export async function loader({ request, params }: LoaderFunctionArgs) {
//   parseCSVFile("/my/path");
//   return json({});
// }

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await unstable_parseMultipartFormData(
//     request,
//     fileUploadHandler,
//   );
//   const uploadedFile = formData.get("upload");

//   // @ts-ignore
//   parseCSVFile(uploadedFile?.filepath);
//   return {};
// };

export default function Upload() {
  return (
    <div>
      <CsvUploadButton />
    </div>
  );
}
