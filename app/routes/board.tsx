import { Outlet } from "@remix-run/react";
import { SideMenu } from "~/@/components/sideMenu";

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
