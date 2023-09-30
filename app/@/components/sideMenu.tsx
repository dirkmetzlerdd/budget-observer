import {
  PieChart,
  Settings,
  Upload,
  ArrowRightLeft,
  ShoppingCart,
} from "lucide-react";
import { Link } from "@remix-run/react";

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
    linkTo: "purchaisegroup",
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

export function SideMenu() {
  return (
    <div className="flex flex-col w-[200px] bg-slate-50 pt-10 border-r border-slate-200">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.linkTo}
          className="flex items-center hover:bg-slate-200 px-8 py-3 cursor-pointer transition ease-in-out duration-200"
        >
          <item.icon className="mr-4 h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
