import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { Label } from "app/@/components/ui/label";
import { Link, Form, useOutletContext, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { SyntheticEvent, useRef, useState } from "react";
import { OutletContext } from "~/types/main";
import { createSupabaseServerClient } from "~/@/lib/supabase.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  await supabase.auth.signOut();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    // console.log(session.access_token);
    // await supabase.auth.signOut();
    console.log(session.access_token, "ssssssssssss");
    return redirect("/");
  }
}
