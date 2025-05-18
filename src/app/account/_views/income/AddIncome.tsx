import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addIncomeSource } from "../../actions";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store";
import { SheetClose } from "@/components/ui/sheet";
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
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" name="name" />
      <Label htmlFor="amount">Amount</Label>
      <Input type="number" id="amount" name="amount" />
      <Label htmlFor="date">Date</Label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full"
      />
      <SheetClose asChild>
        <Button type="submit">Add Income Source</Button>
      </SheetClose>
    </form>
  );
}
