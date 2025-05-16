import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { useStore } from "../../store";
import { updateExpense } from "../../actions";
import { Expense } from "@/lib/types";

export default function EditExpense({
  expense,
  transactionId,
}: {
  expense: Expense;
  transactionId: string | null;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date(expense.date));
  const expenses = useStore((state: any) => state.expenses);
  const setExpenses = useStore((state: any) => state.setExpenses);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const amount = formData.get("amount");

    const query = await updateExpense({
      id: expense.id,
      name: name as string,
      amount: amount as string,
      date: date?.toISOString() as string,
      categories: [],
      transactionId: transactionId,
    });

    if (query?.success) {
      setExpenses(
        expenses.map((expense: Expense) => {
          if (expense.id === query.expense.id) {
            return query.expense;
          }
          return expense;
        })
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" name="name" defaultValue={expense.name} />
      <Label htmlFor="amount">Amount</Label>
      <Input
        type="number"
        id="amount"
        name="amount"
        defaultValue={expense.amount}
      />
      <Label htmlFor="date">Date</Label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={date}
        className="w-full"
      />
      <SheetClose asChild>
        <Button type="submit">Save Changes</Button>
      </SheetClose>
    </form>
  );
}
