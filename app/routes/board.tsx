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

export const action = async ({ request }: ActionFunctionArgs) => {
  path.join(process.cwd(), "/tmpUploads");

  console.log(path);

  const fileUploadHandler = unstable_createFileUploadHandler({
    directory: `./tmpUploads`,
    file: ({ filename }) => filename,
  });

  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler,
  );
  const uploadedFile = formData.get("upload");

  // @ts-ignore
  // console.log("FILEPATH:", uploadedFile?.filepath);
  // console.log(`DIRNAME: ${__dirname}`);

  // path.join(process.cwd(), 'posts');
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
