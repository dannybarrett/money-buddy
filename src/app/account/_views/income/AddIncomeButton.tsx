import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddIncome from "./AddIncome";
import { Button } from "@/components/ui/button";

export default function AddIncomeButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-fit">Add Income</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        aria-description="Add Income Source"
        className="h-9/10 rounded-t-lg p-4 lg:p-8"
      >
        <SheetHeader className="text-center">
          <SheetTitle>Add Income Source</SheetTitle>
          <SheetDescription>
            Add a new income source to your account.
          </SheetDescription>
        </SheetHeader>
        <AddIncome />
      </SheetContent>
    </Sheet>
  );
}
