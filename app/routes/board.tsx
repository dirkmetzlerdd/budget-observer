import { Outlet, useOutletContext } from "@remix-run/react";
import { SideMenu } from "~/@/components/sideMenu";
import { OutletContext } from "~/types/main";

export default function Board() {
  const outletContext = useOutletContext<OutletContext>();

  return (
    <div className="flex h-full">
      <SideMenu />
      <div className="w-full p-4">
        <Outlet context={outletContext} />
      </div>
    </div>
  );
}
