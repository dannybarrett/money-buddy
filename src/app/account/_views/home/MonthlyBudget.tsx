import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import { Category, Expense } from "@/lib/types";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

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
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent>
        {budget.categories?.length === 0 ? (
          <p>No budget set</p>
        ) : (
          <div>
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
                  <div className="flex justify-between">
                    <p>{category.name}</p>
                    <p>
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
        <Button onClick={() => setView("budget")}>Create Budget</Button>
      </CardContent>
    </Card>
  );
}
