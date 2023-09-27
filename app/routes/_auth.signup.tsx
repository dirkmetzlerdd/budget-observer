import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { Label } from "app/@/components/ui/label";
import { Form, Link } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const formData = await request.formData();

  const firstName = formData.get("first-name");
  const surname = formData.get("surname");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password");

  if (email && password && password === confirmPassword) {
    await supabase.auth.signUp({
      email,
      password,
    });
  }

  return redirect("/");
};

export default function Logout() {
  return (
    <Form
      method="POST"
      className="flex flex-col justify-center items-center w-full mt-7"
    >
      <div className="flex flex-col justify-center w-full max-w-lg bg-slate-50 p-4 gap-6 rounded-md">
        <section className="flex flex-col gap-3">
          <Label htmlFor="first-name">First Name</Label>
          <Input type="text" name="first-name" placeholder="First Name" />
        </section>
        <section className="flex flex-col gap-3">
          <Label htmlFor="surname">Surname</Label>
          <Input type="text" name="surname" placeholder="Surname" />
        </section>
        <section className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" />
        </section>
        <section className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" />
        </section>
        <section className="flex flex-col gap-3">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            type="confirm-password"
            name="confirm-password"
            placeholder="Password"
          />
        </section>
        <section>
          <Button type="submit">Sign up</Button>{" "}
          <Link to="/signin" className="pl-4">
            Already have an account?
          </Link>
        </section>
      </div>
    </Form>
  );
}
