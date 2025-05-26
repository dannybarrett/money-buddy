import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { Expense, IncomeSource } from "@/lib/types";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Landmark,
  PiggyBank,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Overview() {
  const incomeSources = useStore((state: any) => state.incomeSources);
  const expenses = useStore((state: any) => state.expenses);
  const transactions = useStore((state: any) => state.transactions);
  const accountInfo = useStore((state: any) => state.accountInfo);
  const setView = useStore((state: any) => state.setView);
  const [balance, setBalance] = useState(0);
  const [currentIncome, setCurrentIncome] = useState(0);
  const [currentExpenses, setCurrentExpenses] = useState(0);

  useEffect(() => {
    setCurrentIncome(
      incomeSources.reduce(
        (acc: number, curr: IncomeSource) => acc + parseFloat(curr.amount),
        0
      )
    );

    setCurrentExpenses(
      expenses.reduce(
        (acc: number, curr: Expense) => acc + parseFloat(curr.amount),
        0
      ) +
        transactions
          .flatMap((item: any) => item.added)
          .filter((item: any) => item.amount > 0)
          .reduce((acc: number, curr: any) => acc + parseFloat(curr.amount), 0)
    );

    setBalance(
      accountInfo
        .map((bank: any) =>
          bank.accounts.reduce(
            (acc: number, curr: any) => acc + parseFloat(curr.balances.current),
            0
          )
        )
        .reduce((acc: number, curr: number) => acc + curr, 0)
    );
  }, [accountInfo, incomeSources, expenses, transactions]);

  const cards = [
    {
      name: "Balance",
      value: balance,
      view: "home",
      icon: (
        <Landmark className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
    {
      name: "Income",
      value: currentIncome,
      view: "income",
      icon: (
        <BanknoteArrowUp className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
    {
      name: "Expenses",
      value: currentExpenses,
      view: "expenses",
      icon: (
        <BanknoteArrowDown className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
    {
      name: "Savings",
      value: currentIncome - currentExpenses,
      view: "home",
      icon: (
        <PiggyBank className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.name}>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl">{card.name}</CardTitle>
            <button onClick={() => setView(card.view)}>{card.icon}</button>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {card.value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
