import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updateIncomeSource } from "../../actions";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store";
import { IncomeSource } from "@/lib/types";
import { SheetClose } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      category: null,
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={incomeSource.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          defaultValue={incomeSource.amount}
          step="0.01"
        />
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
      <SheetClose asChild>
        <Button type="submit">Save Income Source</Button>
      </SheetClose>
    </form>
  );
}
