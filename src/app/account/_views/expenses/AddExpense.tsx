import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { addExpense } from "../../actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { capitalizeTitle } from "@/lib/utils";
import { Expense } from "@/lib/types";

export default function AddExpense() {
  const expenses = useStore((state: any) => state.expenses);
  const setExpenses = useStore((state: any) => state.setExpenses);
  const transactions = useStore((state: any) => state.transactions);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<string[]>();

  useEffect(() => {
    const expenseCategories = expenses
      .map((expense: Expense) => expense.category)
      .filter((c: string) => c !== null);

    const transactionCategories = transactions
      .flatMap((transaction: any) => transaction.added)
      .map((transaction: any) =>
        transaction.personal_finance_category.primary
          .toLowerCase()
          .replaceAll("-", " ")
          .replaceAll("_", " ")
      );

    const uniqueCategories = Array.from(
      new Set([...expenseCategories, ...transactionCategories])
    ).sort();

    setAllCategories(uniqueCategories);
  }, [expenses, transactions]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const amount = formData.get("amount");

    const query = await addExpense({
      name: name as string,
      amount: amount as string,
      date: date?.toISOString() as string,
      category: category as string | null,
    });

    if (query?.success) {
      setExpenses([...expenses, query.expense]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Groceries"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <Input
            type="number"
            id="amount"
            name="amount"
            placeholder="150.00"
            step="0.01"
            required
            className="pl-5.25 relative"
          />
          <span className="absolute top-2 left-3 text-gray-500 text-sm">$</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{date?.toLocaleDateString()}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              {category ? capitalizeTitle(category) : "Select"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput
                id="category"
                name="category"
                placeholder="Housing"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setCategory(e.currentTarget.value.toLowerCase());
                    setCategoryOpen(false);
                  }
                }}
              />
              <CommandList>
                {allCategories?.map((c: string) => (
                  <CommandItem
                    key={c}
                    onSelect={() => {
                      setCategory(c);
                      setCategoryOpen(false);
                    }}
                  >
                    {c && capitalizeTitle(c)}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <SheetClose asChild>
        <Button type="submit">Add Expense</Button>
      </SheetClose>
    </form>
  );
}
