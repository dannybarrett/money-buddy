import { Input } from "@/components/ui/input";
import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Category } from "@/lib/types";
import { updateBudget } from "../../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeTitle } from "@/lib/utils";

export default function BudgetView() {
  const budget = useStore((state: any) => state.budget);
  const setBudget = useStore((state: any) => state.setBudget);
  const setView = useStore((state: any) => state.setView);
  const transactions = useStore((state: any) => state.transactions);
  const expenses = useStore((state: any) => state.expenses);
  const [categories, setCategories] = useState<Category[]>([
    ...budget.categories,
  ]);
  const [existingCategories, setExistingCategories] = useState<any>([]);

  useEffect(() => {
    const expenseCategories = expenses
      .filter((expense: any) => expense.category !== null)
      .map((expense: any) => expense.category);

    const transactionCategories = transactions
      .flatMap((item: any) => item.added)
      .filter((item: any) => item.amount > 0)
      .map((item: any) =>
        item.personal_finance_category.primary
          .toLowerCase()
          .replaceAll("-", " ")
          .replaceAll("_", " ")
      );

    setExistingCategories(
      Array.from(
        new Set(
          [...expenseCategories, ...transactionCategories].filter((c) =>
            categories.some((cat) => cat.name !== c)
          )
        )
      )
    );
  }, [transactions, expenses]);

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const name = formData.get("name");
  //   const amount = formData.get("amount");

  //   setCategories([
  //     ...categories,
  //     { name: (name as string).toLowerCase(), amount: amount as string },
  //   ]);

  //   (e.target as HTMLFormElement).reset();
  // }

  function handleSubmit(category: Category) {
    setCategories([
      ...categories,
      { name: category.name.toLowerCase(), amount: category.amount },
    ]);
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-8 max-w-2xl">
      <h1>Budget</h1>
      {categories.length === 0 ? (
        "No budget set! Add a category to get started."
      ) : (
        <div className="flex flex-col gap-4">
          {categories.map((category: any, index: number) => (
            <div
              key={category.name}
              className="grid grid-cols-[1fr_1fr_auto] gap-2"
            >
              <Input
                type="text"
                defaultValue={capitalizeTitle(category.name)}
                onChange={(event) => {
                  const updatedCategories = [...categories];
                  updatedCategories[index].name =
                    event.target.value.toLowerCase();
                  setCategories(updatedCategories);
                }}
              />
              <Input
                type="number"
                defaultValue={category.amount}
                onChange={(event) => {
                  const updatedCategories = [...categories];
                  updatedCategories[index].amount = event.target.value;
                  setCategories(updatedCategories);
                }}
              />
              <Button
                variant="destructive"
                className="w-fit"
                onClick={() => {
                  const updatedCategories = categories.filter(
                    (_, i) => i !== index
                  );
                  setCategories(updatedCategories);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
      <NewCategoryForm
        onSubmit={handleSubmit}
        existingCategories={existingCategories}
      />
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
        className="w-fit"
      >
        Save Budget
      </Button>
    </div>
  );
}

function NewCategoryForm({
  onSubmit,
  existingCategories,
}: {
  onSubmit: (category: Category) => void;
  existingCategories: any[];
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex gap-2">
      <Select
        name="name"
        value={name}
        onValueChange={(value) => setName(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {existingCategories.map((category: string) => (
            <SelectItem key={category} value={category}>
              {capitalizeTitle(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        name="amount"
        required={true}
        placeholder="Amount"
        onChange={(event) => setAmount(event.target.value)}
      />
      <Button
        type="submit"
        variant="secondary"
        className="w-fit min-w-21"
        onClick={() => onSubmit({ name, amount })}
      >
        Add
      </Button>
    </div>
  );
}
