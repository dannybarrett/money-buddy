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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import EditExpense from "./EditExpense";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpense } from "../../actions";

export default function Expenses() {
  const expenses = useStore((state: any) => state.expenses);
  const setExpenses = useStore((state: any) => state.setExpenses);
  const transactions = useStore((state: any) => state.transactions);

  const allExpenses = [
    ...expenses,
    ...transactions
      .flatMap((item: any) => item.added)
      .filter(
        (item: any) =>
          item.amount > 0 &&
          !expenses.some((expense: any) => expense.transaction_id === item.id)
      ),
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex justify-between items-center">
        <h1>Expenses</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Expense</Button>
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
      </header>
      {allExpenses.length > 0 ? (
        <Table>
          <TableCaption>Expenses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {allExpenses
              .filter(
                (expense) =>
                  new Date(expense.date).getMonth() === new Date().getMonth()
              )
              .sort(
                (a: any, b: any) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((expense: any) => (
                <TableRow key={expense.id || expense.transaction_id}>
                  <TableCell className="w-full lg:w-fit overflow-x-scroll max-w-[15ch] lg:max-w-none lg:overflow-x-hidden">
                    {expense.name}
                  </TableCell>
                  <TableCell>
                    ${parseFloat(expense.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
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
                                Edit the expense details.
                              </SheetDescription>
                            </SheetHeader>
                            <EditExpense
                              expense={expense}
                              transactionId={expense.transaction_id || null}
                            />
                          </SheetContent>
                        </Sheet>
                        <Button
                          variant="ghost"
                          onClick={async () => {
                            const result = await deleteExpense(expense.id);
                            if (result?.success) {
                              setExpenses(
                                expenses.filter((e: any) => e.id !== expense.id)
                              );
                            }
                          }}
                        >
                          <Trash /> Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell colSpan={3}>
                $
                {allExpenses
                  .reduce(
                    (acc: number, expense: any) =>
                      acc + parseFloat(expense.amount),
                    0
                  )
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          No expenses found.
        </p>
      )}
    </div>
  );
}
