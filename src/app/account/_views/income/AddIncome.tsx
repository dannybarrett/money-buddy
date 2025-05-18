import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addIncomeSource } from "../../actions";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store";
import { SheetClose } from "@/components/ui/sheet";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
export default function AddIncome() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const incomeSources = useStore((state: any) => state.incomeSources);
  const setIncomeSources = useStore((state: any) => state.setIncomeSources);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const amount = formData.get("amount");

    const query = await addIncomeSource({
      name: name as string,
      amount: amount as string,
      date: date?.toISOString() as string,
      category: null,
    });

    if (query?.success) {
      setIncomeSources([...incomeSources, query.incomeSource]);
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
          placeholder="Salary"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          placeholder="150.00"
          step="0.01"
          required={true}
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
        <Button type="submit">Add Income Source</Button>
      </SheetClose>
    </form>
  );
}
