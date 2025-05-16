import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updateIncomeSource } from "../../actions";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store";
import { IncomeSource } from "@/lib/types";
import { SheetClose } from "@/components/ui/sheet";
export default function EditIncome({
  incomeSource,
}: {
  incomeSource: IncomeSource;
}) {
  const [date, setDate] = useState<Date | undefined>(incomeSource.date);
  const incomeSources = useStore((state: any) => state.incomeSources);
  const setIncomeSources = useStore((state: any) => state.setIncomeSources);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const amount = formData.get("amount");

    const query = await updateIncomeSource({
      id: incomeSource.id,
      name: name as string,
      amount: amount as string,
      date: date?.toISOString() as string,
      categories: [],
    });

    if (query?.success) {
      setIncomeSources(
        incomeSources.map((income: IncomeSource) =>
          income.id === incomeSource.id ? query.incomeSource : income
        )
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        id="name"
        name="name"
        defaultValue={incomeSource.name}
      />
      <Label htmlFor="amount">Amount</Label>
      <Input
        type="number"
        id="amount"
        name="amount"
        defaultValue={incomeSource.amount}
      />
      <Label htmlFor="date">Date</Label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={date}
        className="w-full"
      />
      <SheetClose asChild>
        <Button type="submit">Save Income Source</Button>
      </SheetClose>
    </form>
  );
}
