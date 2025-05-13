import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "../../store";
import { Button } from "@/components/ui/button";

export default function MonthlyBudget() {
  const budget = useStore((state: any) => state.budget);
  const setView = useStore((state: any) => state.setView);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent>
        {budget.categories?.length === 0 ? (
          <p>No budget set</p>
        ) : (
          <p>Budget set</p>
        )}
        <Button onClick={() => setView("budget")}>Create Budget</Button>
      </CardContent>
    </Card>
  );
}
