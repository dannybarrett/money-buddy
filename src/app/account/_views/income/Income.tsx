import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import { IncomeSource } from "@/lib/types";
import { Filter, MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { deleteIncomeSource } from "../../actions";
import AddIncomeButton from "./AddIncomeButton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditIncomeButton from "./EditIncomeButton";
import { capitalizeTitle, stringToCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

export default function Income() {
  const incomeSources = useStore((state: any) => state.incomeSources);
  const setIncomeSources = useStore((state: any) => state.setIncomeSources);
  const transactions = useStore((state: any) => state.transactions);
  const [allIncome, setAllIncome] = useState<any[]>([]);
  const [ascending, setAscending] = useState(true);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  const [category, setCategory] = useState<string>("all");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const incomeCategories = incomeSources
      .map((income: any) => income.category)
      .filter((category: string) => category !== null);
    const transactionCategories = transactions
      .flatMap((transaction: any) => transaction.added)
      .filter((transaction: any) => transaction.amount < 0)
      .map((transaction: any) => transaction.personal_finance_category.primary);

    setAllCategories(
      Array.from(new Set([...incomeCategories, ...transactionCategories]))
    );
  }, [transactions, incomeSources]);

  useEffect(() => {
    const incomeFromTransactions = transactions
      .flatMap((transaction: any) => transaction.added)
      .filter((transaction: any) => transaction.amount < 0)
      .map((transaction: any) => ({
        ...transaction,
        amount: Math.abs(transaction.amount),
      }));

    setAllIncome(
      [...incomeFromTransactions, ...incomeSources]
        .filter((income: any) => {
          const incomeDate = new Date(income.date);
          return incomeDate >= startDate && incomeDate <= endDate;
        })
        .filter((income: any) => {
          if (category === "all") return true;
          return (
            income.category === category ||
            income.personal_finance_category?.primary === category
          );
        })
        .sort((a, b) =>
          ascending
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    );
  }, [
    incomeSources,
    transactions,
    ascending,
    startDate,
    endDate,
    category,
    allCategories,
  ]);

  async function handleDelete(id: string) {
    const query = await deleteIncomeSource(id);
    if (query?.success) {
      setIncomeSources(
        incomeSources.filter((income: IncomeSource) => income.id !== id)
      );
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-8 lg:gap-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1>Income</h1>
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
                <SheetTitle className="text-2xl">Filters</SheetTitle>
                <SheetDescription>Update your income filters.</SheetDescription>
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
                          {capitalizeTitle(category ?? "Uncategorized")}
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
        <AddIncomeButton />
      </header>
      {allIncome.length > 0 ? (
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
            {allIncome.map((incomeSource: any) => (
              <TableRow key={incomeSource.id ?? incomeSource.transaction_id}>
                <TableCell>{incomeSource.name}</TableCell>
                <TableCell>{stringToCurrency(incomeSource.amount)}</TableCell>
                <TableCell>
                  {new Date(incomeSource.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost">
                        <MoreHorizontal />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2 w-fit">
                      <EditIncomeButton incomeSource={incomeSource} />
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(incomeSource.id)}
                      >
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total Income</TableCell>
              <TableCell colSpan={3}>
                {stringToCurrency(
                  allIncome
                    .reduce(
                      (acc: number, income: any) =>
                        acc + parseFloat(income.amount),
                      0
                    )
                    .toString()
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <>
          <div>No Income Sources. Add one to get started!</div>
        </>
      )}
    </div>
  );
}
