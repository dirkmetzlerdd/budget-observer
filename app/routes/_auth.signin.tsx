import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { Label } from "app/@/components/ui/label";
import { Link, Form, useOutletContext, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useRef, useState } from "react";
import { OutletContext } from "~/types/main";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return redirect("/");
  }

  return json({ user: session?.user }, { headers: response.headers });
}

export const action = async () => {
  return redirect("/");
};

export default function Signin() {
  const [errorText, setErrorText] = useState("");
  const outletContext = useOutletContext<OutletContext>();

  const submit = useSubmit();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signIn = (event: any) => {
    (async function () {
      event.preventDefault();

      if (
        emailRef.current?.value &&
        passwordRef.current?.value &&
        outletContext
      ) {
        const data = await outletContext?.supabase?.auth?.signInWithPassword({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        });

        if (!data.error) {
          submit(null, { method: "post" });
        } else {
          setErrorText(data.error.message);
        }
      }
    })();
  };

  return (
    <Form
      method="POST"
      onSubmit={signIn}
      className="flex-col flex justify-center items-center w-full mt-7"
    >
      <div className="flex flex-col justify-center w-full max-w-lg bg-slate-50 p-4 gap-6 rounded-md">
        <section className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" ref={emailRef} />
        </section>
        <section className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </section>

        <section>
          <Button type="submit">Sign in</Button>{" "}
          <Link to="/signup" className="pl-4">
            Don't have an account?
          </Link>
        </section>
      </div>
    </Form>
  );
}
