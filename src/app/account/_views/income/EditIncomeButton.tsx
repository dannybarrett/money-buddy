import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { IncomeSource } from "@/lib/types";
import EditIncome from "./EditIncome";

export default function EditIncomeButton({
  incomeSource,
}: {
  incomeSource: IncomeSource;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        aria-description="Edit Income"
        className="h-9/10 rounded-t-lg p-4 lg:p-8"
      >
        <SheetHeader className="text-center">
          <SheetTitle>Edit Income</SheetTitle>
          <SheetDescription>Update your income source.</SheetDescription>
        </SheetHeader>
        <EditIncome incomeSource={incomeSource} />
      </SheetContent>
    </Sheet>
  );
}
