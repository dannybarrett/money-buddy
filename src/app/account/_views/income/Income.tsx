import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import { IncomeSource } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
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
import { stringToCurrency } from "@/lib/utils";

export default function Income() {
  const incomeSources = useStore((state: any) => state.incomeSources);
  const setIncomeSources = useStore((state: any) => state.setIncomeSources);

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
        <h1>Income</h1>
        <AddIncomeButton />
      </header>
      {incomeSources.length > 0 ? (
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
            {incomeSources.map((incomeSource: IncomeSource) => (
              <TableRow key={incomeSource.id}>
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
                  incomeSources
                    .reduce(
                      (acc: number, income: IncomeSource) =>
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
