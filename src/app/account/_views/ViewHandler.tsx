"use client";

import Home from "./home/Home";
import Income from "./income/Income";
import Expenses from "./expenses/Expenses";
import { useEffect } from "react";
import { Session } from "better-auth";
import { IncomeSource, Expense, Budget } from "@/lib/types";
import { useStore } from "../store";
import BudgetView from "./budget/Budget";
import Settings from "./settings/Settings";
export default function ViewHandler({
  state,
}: {
  state: {
    view: string;
    session: Session | null;
    incomeSources: IncomeSource[];
    expenses: Expense[];
    budget: Budget | null;
    accountInfo: any;
    transactions: any;
  };
}) {
  const view = useStore((state: any) => state.view);
  const setIncomeSources = useStore((state: any) => state.setIncomeSources);
  const setSession = useStore((state: any) => state.setSession);
  const setExpenses = useStore((state: any) => state.setExpenses);
  const setBudget = useStore((state: any) => state.setBudget);
  const setAccountInfo = useStore((state: any) => state.setAccountInfo);
  const setTransactions = useStore((state: any) => state.setTransactions);
  useEffect(() => {
    const init = async () => {
      setIncomeSources(state.incomeSources);
      setExpenses(state.expenses);
      setSession(state.session);
      setBudget(state.budget);
      setAccountInfo(state.accountInfo);
      setTransactions(state.transactions);
    };
    init();
  }, [
    state,
    setIncomeSources,
    setExpenses,
    setSession,
    setBudget,
    setAccountInfo,
    setTransactions,
  ]);

  switch (view) {
    case "income":
      return <Income />;
    case "expenses":
      return <Expenses />;
    case "budget":
      return <BudgetView />;
    case "settings":
      return <Settings />;
    default:
      return <Home />;
  }
}
