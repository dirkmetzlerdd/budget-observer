import { Link, useMatches } from "@remix-run/react";
import { LogIn, Receipt, User } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function MainHeader({
  session,
  signOut,
}: {
  session: Session | null;
  signOut: () => void;
}) {
  const matches = useMatches();
  const userAvatarUrl = "https://github.com/dirkmetzlerdd.png";
  return (
    <header className="flex justify-between items-center bg-slate-50 p-2 pr-3 border-b border-slate-200">
      <Link
        to="/"
        className="font-bold p-2 pl-3 pr-3 flex items-center bg-[#9fd3c7] rounded-md text-[#142d4c]"
      >
        <Receipt className="mr-2 h-8 w-8 hover:scale-110 transition-all duration-200" />{" "}
        b.obs
      </Link>
      <section className="flex gap-5 items-center"></section>
      <span className="flex justify-center">
        {!session ? (
          <Link to="/signin" className="pr-4">
            <LogIn />
          </Link>
        ) : (
          <Avatar>
            <AvatarImage
              src={userAvatarUrl}
              className="rounded-full border-2 border-[#9fd3c7]"
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        )}
      </span>
    </header>
  );
}
