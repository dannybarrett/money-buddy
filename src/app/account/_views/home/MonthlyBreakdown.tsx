import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

function getMonthName(monthIndex: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
}

export default function MonthlyBreakdown() {
  const incomeSources = useStore((state: any) => state.incomeSources);
  const transactions = useStore((state: any) => state.transactions);
  const expenses = useStore((state: any) => state.expenses);
  const currentMonth = new Date().getMonth();

  const negativeTransactions = transactions.flatMap((item: any) =>
    item.added.filter((item: any) => item.amount > 0)
  );

  const positiveTransactions = transactions.flatMap((item: any) =>
    item.added.filter((item: any) => item.amount < 0)
  );

  const currentIncome: any[] = [...incomeSources, ...positiveTransactions];
  const currentExpenses: any[] = [...expenses, ...negativeTransactions];

  const data = () => {
    const financeData = [];
    for (let i = 0; i < 6; i++) {
      const index = (i + 12) % 12;

      const monthIncome = currentIncome.filter((item: any) => {
        const itemMonth = new Date(item.date).getMonth();

        if (itemMonth === currentMonth - index) {
          return item.amount;
        }
      });

      const monthExpenses = currentExpenses.filter((item: any) => {
        const itemMonth = new Date(item.date).getMonth();

        if (itemMonth === currentMonth - index) {
          return item.amount;
        }
      });

      const getTotalMonthIncome = () => {
        let total = 0;
        monthIncome.forEach((item: any) => {
          total += parseFloat(item.amount);
        });
        return total;
      };

      const getTotalMonthExpenses = () => {
        let total = 0;
        monthExpenses.forEach((item: any) => {
          total += parseFloat(item.amount);
        });
        return total;
      };

      financeData.push({
        name: getMonthName((currentMonth - index + 12) % 12),
        income: getTotalMonthIncome(),
        expenses: getTotalMonthExpenses(),
        savings: getTotalMonthIncome() - getTotalMonthExpenses(),
      });
    }
    return financeData;
  };

  const config = {
    income: {
      label: "Income",
      color: "green",
    },
    expenses: {
      label: "Expenses",
      color: "red",
    },
    savings: {
      label: "Savings",
      color: "blue",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="h-[150px] lg:h-[400px] w-full"
        >
          <BarChart data={data().reverse()}>
            <XAxis dataKey="name" />
            <YAxis name="amount" />
            <Bar dataKey="income" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="expenses" fill="var(--chart-2)" radius={4} />
            <Bar dataKey="savings" fill="var(--chart-3)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
