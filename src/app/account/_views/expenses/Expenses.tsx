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
import { Filter, MoreHorizontal } from "lucide-react";
import EditExpense from "./EditExpense";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpense } from "../../actions";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeTitle } from "@/lib/utils";

export default function Expenses() {
  const expenses = useStore((state: any) => state.expenses);
  const setExpenses = useStore((state: any) => state.setExpenses);
  const transactions = useStore((state: any) => state.transactions);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [ascending, setAscending] = useState<boolean>(true);
  const [category, setCategory] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const allExpenses = [
    ...expenses.filter((expense: any) => expense.transactionId === null),
    ...transactions
      .flatMap((item: any) => item.added)
      .filter((item: any) => item.amount > 0),
  ];

  useEffect(() => {
    setFilteredExpenses(
      allExpenses
        .filter(
          (expense: any) =>
            new Date(expense.date).getTime() >= startDate.getTime() &&
            new Date(expense.date).getTime() <= endDate.getTime() &&
            expense.amount > 0 &&
            (category === "all" ||
              expense.category?.toLowerCase().replaceAll("_", " ") ===
                category?.toLowerCase().replaceAll("_", " ") ||
              expense.personal_finance_category?.primary
                .toLowerCase()
                .replaceAll("_", " ") ===
                category?.toLowerCase().replaceAll("_", " "))
        )
        .sort((a: any, b: any) =>
          ascending
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    );

    const expenseCategories = expenses
      .filter((expense: any) => expense.category !== null)
      .map((expense: any) => expense.category);

    const transactionCategories = transactions
      .flatMap((item: any) => item.added)
      .filter((item: any) => item.amount > 0)
      .map((item: any) =>
        item.personal_finance_category.primary
          .toLowerCase()
          .replaceAll("-", " ")
          .replaceAll("_", " ")
      );

    const uniqueCategories = Array.from(
      new Set([...expenseCategories, ...transactionCategories])
    );

    setAllCategories(uniqueCategories);

    console.log(uniqueCategories);
  }, [startDate, endDate, ascending, expenses, transactions, category]);

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-8 lg:gap-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1>Expenses</h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="h-7/8 rounded-t-lg p-4 lg:p-8"
            >
              <SheetHeader className="text-center">
                <SheetTitle className="text-2xl">Filter Expenses</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 lg:gap-8 lg:max-w-md w-full mx-auto">
                <div className="grid grid-cols-2 gap-2 lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {new Date(startDate).toLocaleDateString()}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(day) => setStartDate(day || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {new Date(endDate).toLocaleDateString()}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(day) => setEndDate(day || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    defaultValue={category || "all"}
                    onValueChange={(value) => setCategory(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {allCategories.map((category: string) => (
                        <SelectItem key={category} value={category}>
                          {capitalizeTitle(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sort">Sort by</Label>
                  <Select
                    defaultValue={ascending ? "asc" : "desc"}
                    onValueChange={(value) => {
                      setAscending(value === "asc");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent onChange={(value) => console.log(value)}>
                      <SelectItem value="asc">Ascending</SelectItem>
                      <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Expense</Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            aria-description="Add Expense"
            className="h-9/10 rounded-t-lg p-4 lg:p-8"
          >
            <SheetHeader className="text-center">
              <SheetTitle className="text-2xl">Add Expense</SheetTitle>
              <SheetDescription>
                Add a new expense to your account.
              </SheetDescription>
            </SheetHeader>
            <AddExpense />
          </SheetContent>
        </Sheet>
      </header>
      {filteredExpenses.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense: any) => (
              <TableRow key={expense.id || expense.transaction_id}>
                <TableCell className="w-full lg:w-fit overflow-x-scroll max-w-[15ch] lg:max-w-none lg:overflow-x-hidden">
                  {expense.name}
                </TableCell>
                <TableCell>
                  {parseFloat(expense.amount).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
                    <PopoverContent className="flex flex-col w-fit items-start gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button className="w-full text-center">Edit</Button>
                        </SheetTrigger>
                        <SheetContent
                          side="bottom"
                          aria-description="Edit Expense"
                          className="h-5/6 rounded-t-lg p-4 lg:p-8"
                        >
                          <SheetHeader className="text-center">
                            <SheetTitle className="text-2xl">
                              Edit Expense
                            </SheetTitle>
                            <SheetDescription>
                              Edit the expense details.
                            </SheetDescription>
                          </SheetHeader>
                          <EditExpense
                            expense={expense}
                            transactionId={expense.transaction_id || null}
                            personalFinanceCategory={
                              expense.personal_finance_category?.primary
                                .toLowerCase()
                                .replaceAll("_", " ") || null
                            }
                          />
                        </SheetContent>
                      </Sheet>
                      {expense.transactionId === null && (
                        <Button
                          variant="destructive"
                          className="w-full text-center"
                          onClick={async () => {
                            const result = await deleteExpense(expense.id);
                            if (result?.success) {
                              setExpenses(
                                expenses.filter((e: any) => e.id !== expense.id)
                              );
                            }
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total Expenses</TableCell>
              <TableCell colSpan={3}>
                {filteredExpenses
                  .reduce(
                    (acc: number, expense: any) =>
                      acc + parseFloat(expense.amount),
                    0
                  )
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
