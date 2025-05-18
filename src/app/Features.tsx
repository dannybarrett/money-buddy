import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Landmark, PieChart } from "lucide-react";

export default function Features() {
  return (
    <section className="p-4 py-16 lg:p-16 lg:py-24">
      <div className="container mx-auto text-center pb-16 grid gap-4 justify-items-center">
        <h2 className="text-3xl">Powerful features to manage your money</h2>
        <p className="text-lg text-gray-600 max-w-[60ch]">
          Money Buddy gives you all the tools you need to take control of your
          finances and make smarter money decisions.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="gap-0 group shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="grid gap-8">
            <DollarSign className="w-10 h-10 text-money-buddy-teal p-2 bg-money-buddy-teal/10 rounded-lg" />
            <CardTitle>
              <h3 className="text-xl group-hover:text-money-buddy-teal transition-colors">
                Expense Tracking
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Automatically categorize and track all your expenses in one place
              without manual entry.
            </p>
          </CardContent>
        </Card>
        <Card className="gap-0 group shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="grid gap-8">
            <PieChart className="w-10 h-10 text-money-buddy-coral p-2 bg-money-buddy-coral/10 rounded-lg" />
            <CardTitle>
              <h3 className="text-xl group-hover:text-money-buddy-coral transition-colors">
                Budget Creation
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Create custom budgets based on your spending habits and financial
              goals.
            </p>
          </CardContent>
        </Card>
        <Card className="gap-0 group shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="grid gap-8">
            <Landmark className="w-10 h-10 text-indigo-400 p-2 bg-indigo-400/10 rounded-lg" />
            <CardTitle>
              <h3 className="text-xl group-hover:text-indigo-400 transition-colors">
                Bank Integration
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Securely connect your bank accounts through Plaid for real-time
              transaction syncing.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
