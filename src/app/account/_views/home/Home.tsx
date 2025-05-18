import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import MonthlyBreakdown from "./MonthlyBreakdown";
import MonthlyBudget from "./MonthlyBudget";
import RecentTransactions from "./RecentTransactions";
export default function Home() {
  const [session, setSession] = useState<any>({ name: "" });

  const { data } = authClient.useSession();
  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-4 lg:gap-8 p-4 lg:p-8">
      <header>
        <h1 className="text-3xl">Welcome back, {session.user?.name}!</h1>
        <p className="text-gray-600">
          This is your dashboard. Here you can see your income and expenses.
        </p>
      </header>
      <Overview />
      <div className="grid lg:grid-cols-[75fr_25fr] lg:gap-8 gap-4">
        <MonthlyBreakdown />
        <MonthlyBudget />
      </div>
      <RecentTransactions />
    </div>
  );
}
