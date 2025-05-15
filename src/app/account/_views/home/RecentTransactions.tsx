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
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <TableCell className="flex items-center gap-1">
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
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {showIndex < recentTransactions.length && (
          <Button onClick={() => setShowIndex(showIndex + 5)}>Show More</Button>
        )}
      </CardContent>
    </Card>
  );
}
