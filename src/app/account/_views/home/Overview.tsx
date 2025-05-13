import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { Expense, IncomeSource } from "@/lib/types";
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

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${currentIncome.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${currentExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${currentSavings.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
