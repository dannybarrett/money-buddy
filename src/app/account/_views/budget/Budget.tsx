import { Input } from "@/components/ui/input";
import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Category } from "@/lib/types";
import { updateBudget } from "../../actions";
export default function BudgetView() {
  const budget = useStore((state: any) => state.budget);
  const setBudget = useStore((state: any) => state.setBudget);
  const setView = useStore((state: any) => state.setView);
  const [categories, setCategories] = useState<Category[]>([
    ...budget.categories,
  ]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const amount = formData.get("amount");
    setCategories([
      ...categories,
      { name: name as string, amount: amount as string },
    ]);

    (e.target as HTMLFormElement).reset();
  }
  return (
    <div>
      <h1>Budget</h1>
      {categories.length === 0
        ? "No budget set! Add a category to get started."
        : categories.map((category: any) => (
            <div key={category.id} className="flex gap-2">
              <p>{category.name}</p>
              <p>${category.amount}</p>
            </div>
          ))}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          name="name"
          required={true}
          placeholder="Category Name"
        />
        <Input
          type="number"
          name="amount"
          required={true}
          placeholder="Amount"
        />
        <Button type="submit" variant="secondary">
          Add Category
        </Button>
      </form>
      <Button
        onClick={async () => {
          const newBudget = { ...budget, categories: categories };
          setBudget(newBudget);
          const response = await updateBudget(newBudget);
          if (response?.success) {
            setView("home");
          } else {
            console.error("Failed to update budget");
          }
        }}
      >
        Save Budget
      </Button>
    </div>
  );
}
