"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "./store";

export default function AccountNav() {
  const setView = useStore((state: any) => state.setView);

  return (
    <div>
      <Button onClick={() => setView("home")}>Home</Button>
      <Button onClick={() => setView("income")}>Income</Button>
      <Button onClick={() => setView("expenses")}>Expenses</Button>
      <Button onClick={() => setView("settings")}>Settings</Button>
    </div>
  );
}
