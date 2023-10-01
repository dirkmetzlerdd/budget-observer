import { ActionFunctionArgs, json } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { CsvUpload } from "~/@/components/uploadButton";
import { OutletContext } from "~/types/main";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log(await request.json());
  console.log(params);
  return json({});
};

export default function Upload() {
  const outletContext = useOutletContext<OutletContext>();

  return (
    <div className="">
      <CsvUpload outletContext={outletContext} />
    </div>
  );
}
