import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ViewHandler from "./_views/ViewHandler";
import { getBudget, getExpenses, getIncomeSources } from "./actions";
import AccountNav from "./Nav";
import { Suspense } from "react";
import { getAccountInfo, getTransactions } from "./plaid-actions";
export default async function Account() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/auth/login");
  }

  const incomeSources = await getIncomeSources();
  const expenses = await getExpenses();
  const budget = await getBudget();
  const accountInfo = await getAccountInfo();
  const transactions = await getTransactions();

  // return <div>test</div>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-full min-h-screen max-w-screen grid grid-rows-[1fr_auto] lg:grid-cols-[auto_1fr] relative">
        <AccountNav className="sticky top-0 h-screen hidden lg:flex" />
        <ViewHandler
          state={{
            view: "home",
            session: session.session,
            incomeSources: incomeSources ?? [],
            expenses: expenses ?? [],
            budget: budget ?? null,
            accountInfo: accountInfo ?? [],
            transactions: transactions ?? [],
          }}
        />
      </div>
      <AccountNav className="sticky bottom-0 lg:hidden" />
    </Suspense>
  );
}
