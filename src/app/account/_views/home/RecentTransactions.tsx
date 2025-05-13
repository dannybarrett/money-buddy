import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
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
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <div className="flex flex-col gap-4">
          {recentTransactions.slice(0, showIndex).map((transaction: any) => {
            return (
              <div key={transaction.transaction_id}>{transaction.name}</div>
            );
          })}
        </div> */}
        {showIndex < recentTransactions.length && (
          <Button onClick={() => setShowIndex(showIndex + 5)}>Show More</Button>
        )}
      </CardContent>
    </Card>
  );
}
