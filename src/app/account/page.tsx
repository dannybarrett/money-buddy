import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ViewHandler from "./_views/ViewHandler";
import { getBudget, getExpenses, getIncomeSources } from "./actions";
import AccountNav from "./Nav";
import { Suspense } from "react";
import { getAccountInfo } from "./plaid-actions";
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountNav />
      <ViewHandler
        state={{
          view: "home",
          session: session.session,
          incomeSources: incomeSources ?? [],
          expenses: expenses ?? [],
          budget: budget ?? null,
          accountInfo: accountInfo ?? [],
        }}
      />
    </Suspense>
  );
}
