import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import AddIncome from "./AddIncome";
import { IncomeSource } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { deleteIncomeSource } from "../../actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EditIncome from "./EditIncome";

export default function Income() {
  const incomeSources = useStore((state: any) => state.incomeSources);
  const setIncomeSources = useStore((state: any) => state.setIncomeSources);

  return (
    <div className="flex flex-col gap-4 p-4">
      {incomeSources.length > 0 ? (
        incomeSources.map((incomeSource: IncomeSource) => (
          <Card key={incomeSource.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {incomeSource.name}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col items-start gap-2">
                      <Sheet>
                        <SheetTrigger
                          aria-describedby="add-income-source"
                          asChild
                        >
                          <Button variant="ghost">
                            <Pencil /> Edit
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side="bottom"
                          aria-description="Add Income Source"
                          className="h-5/6"
                        >
                          <SheetHeader>
                            <SheetTitle>Edit Income Source</SheetTitle>
                            <SheetDescription>
                              Edit the income source.
                            </SheetDescription>
                          </SheetHeader>
                          <EditIncome incomeSource={incomeSource} />
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="ghost"
                        onClick={async () => {
                          const oldIncomeSource = incomeSource;

                          setIncomeSources(
                            incomeSources.filter(
                              (income: IncomeSource) =>
                                income.id !== incomeSource.id
                            )
                          );

                          const result = await deleteIncomeSource(
                            incomeSource.id
                          );

                          if (!result?.success) {
                            setIncomeSources([
                              ...incomeSources,
                              oldIncomeSource,
                            ]);
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
                {incomeSource.date?.toLocaleDateString()}
              </CardDescription>
              <CardContent>
                <div>${parseFloat(incomeSource.amount).toFixed(2)}</div>
              </CardContent>
            </CardHeader>
          </Card>
        ))
      ) : (
        <>
          <div>No Income Sources. Add one below.</div>
        </>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full lg:w-fit">Add Income Source</Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          aria-description="Add Income Source"
          className="h-5/6"
        >
          <SheetHeader>
            <SheetTitle>Add Income Source</SheetTitle>
            <SheetDescription>
              Add a new income source to your account.
            </SheetDescription>
          </SheetHeader>
          <AddIncome />
        </SheetContent>
      </Sheet>
    </div>
  );
}
