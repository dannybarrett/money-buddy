import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { Expense, IncomeSource } from "@/lib/types";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Landmark,
  PiggyBank,
} from "lucide-react";
export default function Overview() {
  const incomeSources = useStore((state: any) => state.incomeSources);
  const expenses = useStore((state: any) => state.expenses);

  const currentIncome = incomeSources.reduce(
    (acc: number, curr: IncomeSource) => acc + parseFloat(curr.amount),
    0
  );

  const currentExpenses = expenses.reduce(
    (acc: number, curr: Expense) => acc + parseFloat(curr.amount),
    0
  );

  const currentSavings = currentIncome - currentExpenses;

  const balance = 1600.0;

  const cards = [
    {
      name: "Balance",
      value: balance,
      icon: (
        <Landmark className="bg-indigo-500/10 text-indigo-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
    {
      name: "Income",
      value: currentIncome,
      icon: (
        <BanknoteArrowUp className="bg-emerald-500/10 text-emerald-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
    {
      name: "Expenses",
      value: currentExpenses,
      icon: (
        <BanknoteArrowDown className="bg-rose-500/10 text-rose-500 rounded-lg p-2.5 w-10 h-10" />
      ),
    },
    {
      name: "Savings",
      value: currentSavings,
      icon: (
        <PiggyBank className="bg-money-buddy-coral/10 text-money-buddy-coral rounded-lg p-2.5 w-10 h-10" />
      ),
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.name}>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl">{card.name}</CardTitle>
            {card.icon}
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
