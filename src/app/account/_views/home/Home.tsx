import { authClient } from "@/lib/auth-client";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import MonthlyBreakdown from "./MonthlyBreakdown";
import MonthlyBudget from "./MonthlyBudget";
export default function Home() {
  const [session, setSession] = useState<any>({ name: "" });

  const { data, error } = authClient.useSession();
  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <header>
        <h1>Welcome back, {session.user?.name}!</h1>
        <p>
          This is your dashboard. Here you can see your income and expenses.
        </p>
      </header>
      <Overview />
      <MonthlyBreakdown />
      <MonthlyBudget />
    </div>
  );
}
