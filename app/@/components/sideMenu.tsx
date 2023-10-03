import { Separator } from "@radix-ui/react-select";
import { NavLink } from "@remix-run/react";
import {
  PieChart,
  Settings,
  Upload,
  ArrowRightLeft,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { Session } from "@supabase/supabase-js";

const navItems = [
  {
    linkTo: "upload",
    label: "Upload",
    icon: Upload,
  },
  {
    linkTo: "transactions",
    label: "Transactions",
    icon: ArrowRightLeft,
  },
  {
    linkTo: "transactiongroup",
    label: "Groups",
    icon: ShoppingCart,
  },
  {
    linkTo: "charts",
    label: "Charts",
    icon: PieChart,
  },
  {
    linkTo: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function SideMenu({
  session, // signOut,
}: {
  session: Session | null;
  // signOut: () => void;
}) {
  return (
    <div className="flex flex-col w-[200px] bg-slate-50 pt-10 border-r border-slate-200">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.linkTo}
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-slate-200 px-4 py-2 cursor-pointer"
              : "flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out duration-150"
          }
        >
          <item.icon className="mr-4 h-4 w-4" />
          <span>{item.label}</span>
        </NavLink>
      ))}

      {!session && (
        <>
          <Separator />
          <NavLink
            to="/signout"
            className="flex items-center hover:bg-slate-200 px-4 py-2 cursor-pointer transition ease-in-out duration-150"
          >
            <LogOut className="mr-4 h-4 w-4" />
            <span>Sing out</span>
          </NavLink>
        </>
      )}
    </div>
  );
}
