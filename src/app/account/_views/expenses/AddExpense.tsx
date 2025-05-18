import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { useStore } from "../../store";
import { addExpense } from "../../actions";

export default function AddExpense() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const expenses = useStore((state: any) => state.expenses);
  const setExpenses = useStore((state: any) => state.setExpenses);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const amount = formData.get("amount");

    const query = await addExpense({
      name: name as string,
      amount: amount as string,
      date: date?.toISOString() as string,
      categories: [],
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
            required
            className="pl-5.25 relative"
          />
          <span className="absolute top-2 left-3 text-gray-500 text-sm">$</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="date">Date</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
        />
      </div>
      <SheetClose asChild>
        <Button type="submit">Add Expense</Button>
      </SheetClose>
    </form>
  );
}
