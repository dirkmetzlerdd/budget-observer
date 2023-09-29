import { Outlet } from "@remix-run/react";
import { SideMenu } from "~/@/components/sideMenu";
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { parseCSVFile } from "~/@/lib/csvParser.server";
import path from "path";
import { fileURLToPath } from "url";

export const action = async ({ request }: ActionFunctionArgs) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fileUploadHandler = unstable_createFileUploadHandler({
    directory: `${__dirname}/tmpUploads`,
    file: ({ filename }) => filename,
  });

  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler,
  );
  const uploadedFile = formData.get("upload");

  // @ts-ignore
  console.log("FILEPATH:", uploadedFile?.filepath);
  console.log(`DIRNAME: ${__dirname}`);

  // @ts-ignore
  const res = await parseCSVFile(uploadedFile?.filepath);
  console.log(res);
  return redirect("/board/charts");
};

export default function Board() {
  return (
    <div className="flex">
      <SideMenu />
      <div className="m-6">
        <Outlet />
      </div>
    </div>
  );
}
