import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import { Category, Expense } from "@/lib/types";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Pencil } from "lucide-react";

export default function MonthlyBudget() {
  const budget = useStore((state: any) => state.budget);
  const setView = useStore((state: any) => state.setView);
  const expenses = useStore((state: any) => state.expenses);

  const [categories, setCategories] = useState<Category[]>(budget.categories);

  useEffect(() => {
    setCategories(budget.categories);
  }, [budget.categories]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">Monthly Budget</CardTitle>
        <Button variant="outline" size="icon" onClick={() => setView("budget")}>
          <Pencil className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {budget.categories?.length === 0 ? (
          <p>No budget set</p>
        ) : (
          <div className="flex flex-col gap-4">
            {categories?.map((category: Category, index: number) => {
              const categoryExpenses = expenses
                .filter((expense: Expense) =>
                  expense.categories.some(
                    (c: Category) => c.name === category.name
                  )
                )
                .reduce(
                  (acc: number, curr: Expense) => acc + parseFloat(curr.amount),
                  0
                );
              const categoryAmount = parseFloat(category.amount ?? "0");

              return (
                <div key={index}>
                  <div className="flex  items-end justify-between">
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs">
                      ${categoryExpenses.toFixed(2)} / $
                      {categoryAmount.toFixed(2)}
                    </p>
                  </div>
                  <Progress
                    value={
                      categoryAmount
                        ? (categoryExpenses / categoryAmount) * 100
                        : 0
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
