import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentTransactions() {
  const transactions = useStore((state: any) => state.transactions);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [showIndex, setShowIndex] = useState<number>(5);

  useEffect(() => {
    setRecentTransactions([
      ...transactions
        .map((transaction: any) => {
          return [...transaction.added];
        })
        .flat(transactions.length),
    ]);
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Table>
          {/* <TableCaption>Recent Transactions</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.slice(0, showIndex).map((transaction: any) => {
              return (
                <TableRow key={transaction.transaction_id}>
                  <TableCell className="flex items-center gap-1 max-w-[15ch] lg:max-w-full lg:overflow-auto overflow-scroll">
                    <img
                      src={transaction.personal_finance_category_icon_url}
                      alt={transaction.name}
                      width={16}
                      height={16}
                    />
                    {transaction.name}
                  </TableCell>
                  <TableCell
                    className={
                      transaction.amount > 0
                        ? "text-rose-500"
                        : "text-emerald-500"
                    }
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {showIndex < recentTransactions.length && (
          <Button
            onClick={() => setShowIndex(showIndex + 5)}
            className="w-full lg:w-fit"
          >
            Show More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
