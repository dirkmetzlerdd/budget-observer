import { Link, useMatches } from "@remix-run/react";
import { LogIn, Receipt, User } from "lucide-react";
import { Session } from "@supabase/supabase-js";

export default function MainHeader({
  session,
  signOut,
}: {
  session: Session | null;
  signOut: () => void;
}) {
  const matches = useMatches();

  console.log(session);
  return (
    <header className="rounded-md flex justify-between items-center bg-slate-50 px-4">
      <Link
        to="/"
        className="font-bold m-2 p-2 pl-3 pr-3 flex items-center bg-[#9fd3c7] rounded-md text-[#142d4c]"
      >
        <Receipt className="mr-2 h-8 w-8 hover:scale-110 transition-all duration-200" />{" "}
        T.O.
      </Link>
      <section className="flex gap-5 items-center"></section>
      <span className="flex justify-center">
        {!session ? (
          <Link to="/signin" className="pr-4">
            <LogIn />
          </Link>
        ) : (
          <>
            <span className="mr-2">{session.user.email}</span> <User />
          </>
        )}
      </span>
    </header>
  );
}
