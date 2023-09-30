import { PieChart, Settings, Upload } from "lucide-react";
import { NavLink } from "@remix-run/react";

export function SideMenu() {
  return (
    <div className="flex flex-col w-[200px] h-full bg-slate-50">
      <NavLink
        to={"upload"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center bg-slate-200 px-4 py-2 cursor-pointer"
            : "flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out delay-150"
        }
      >
        <Upload className="mr-2 h-4 w-4 " />
        <span>Upload</span>
      </NavLink>
      <NavLink
        to={"charts"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center bg-slate-200 px-4 py-2 cursor-pointer"
            : "flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out delay-150"
        }
      >
        <PieChart className="mr-2 h-4 w-4 " />
        <span>Charts</span>
      </NavLink>
      <NavLink
        to={"settings"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center bg-slate-200 px-4 py-2 cursor-pointer"
            : "flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out delay-150"
        }
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </NavLink>
    </div>
  );
}
