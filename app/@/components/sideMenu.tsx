import { PieChart, Settings, Upload } from "lucide-react";
import { Link } from "@remix-run/react";

export function SideMenu() {
  return (
    <div className="flex flex-col w-[200px] h-full bg-slate-50">
      <Link
        to={"upload"}
        className="flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out delay-150 "
      >
        <Upload className="mr-2 h-4 w-4 " />
        <span>Upload</span>
      </Link>
      <Link
        to={"charts"}
        className="flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out delay-150 "
      >
        <PieChart className="mr-2 h-4 w-4 " />
        <span>Charts</span>
      </Link>
      <Link
        to={"settings"}
        className="flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out duration-150"
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </Link>
    </div>
  );
}
