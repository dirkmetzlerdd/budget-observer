import { Outlet } from "@remix-run/react";
import { SideMenu } from "~/@/components/sideMenu";
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
  console.log(uploadedFile?.filepath);

  // @ts-ignore
  console.log(await parseCSVFile(uploadedFile?.filepath));
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
