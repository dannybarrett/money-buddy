import { Expense } from "@/lib/types";
import { useStore } from "../../store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AddExpense from "./AddExpense";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import EditExpense from "./EditExpense";
import { deleteExpense } from "../../actions";

export default function Expenses() {
  const expenses = useStore((state: any) => state.expenses);
  const setExpenses = useStore((state: any) => state.setExpenses);

  return (
    <div className="flex flex-col gap-4 p-4">
      {expenses.length > 0 ? (
        expenses.map((expense: Expense) => (
          <Card key={expense.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {expense.name}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col items-start gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost">
                            <Pencil /> Edit
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side="bottom"
                          aria-description="Edit Expense"
                          className="h-5/6"
                        >
                          <SheetHeader>
                            <SheetTitle>Edit Expense</SheetTitle>
                            <SheetDescription>
                              Edit the expense.
                            </SheetDescription>
                          </SheetHeader>
                          <EditExpense expense={expense} />
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                          const oldExpense = expense;

                          setExpenses(
                            expenses.filter(
                              (expense: Expense) => expense.id !== expense.id
                            )
                          );

                          const result = await deleteExpense(expense.id);

                          if (!result?.success) {
                            setExpenses([...expenses, oldExpense]);
                          }
                        }}
                      >
                        <Trash /> Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardTitle>
              <CardDescription>
                {new Date(expense.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>${parseFloat(expense.amount).toFixed(2)}</div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No expenses found</div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full lg:w-fit">Add Expense</Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          aria-description="Add Expense"
          className="h-5/6"
        >
          <SheetHeader>
            <SheetTitle>Add Expense</SheetTitle>
            <SheetDescription>
              Add a new expense to your account.
            </SheetDescription>
          </SheetHeader>
          <AddExpense />
        </SheetContent>
      </Sheet>
    </div>
  );
}
