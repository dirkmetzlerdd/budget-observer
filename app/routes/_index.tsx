import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

import { Button } from "app/@/components/ui/button"

export default function Index() {
  return (
       <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
     
      <h1>Welcome to Remix</h1>
      <Button variant="destructive">Button</Button>
    </div>
  );
}
