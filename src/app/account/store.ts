import { IncomeSource } from "@/lib/types";
import { Expense } from "@/lib/types";
import { Session } from "better-auth";
import { create } from "zustand";

export const useStore = create((set) => ({
  session: null,
  setSession: (session: Session) => set({ session }),
  view: "home",
  setView: (view: string) => set({ view }),
  incomeSources: [],
  setIncomeSources: (incomeSources: IncomeSource[]) => set({ incomeSources }),
  expenses: [],
  setExpenses: (expenses: Expense[]) => set({ expenses }),
  budget: {},
  setBudget: (budget: any) => set({ budget }),
  accountInfo: [],
  setAccountInfo: (accountInfo: any) => set({ accountInfo }),
}));
