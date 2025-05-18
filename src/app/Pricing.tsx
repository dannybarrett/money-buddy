import { Button } from "@/components/ui/button";
import { Check, TicketPercent } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const features = [
    "Unlimited account connections",
    "Advanced expense tracking",
    "Custom budget templates",
    "12-month transaction history",
    "Recurring bill detection",
    "Spending insights and reports",
    "Financial goal setting",
    "24/7 priority support",
  ];

  return (
    <section id="pricing" className="section-padding grid gap-16">
      <div className="container mx-auto text-center grid gap-4">
        <h2 className="text-3xl">Simple, transparent pricing</h2>
        <p className="text-lg text-gray-600">
          One plan that works for all your financial needs. No hidden fees,
          cancel anytime.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="rounded-2xl p-8 border border-money-buddy-teal/50 bg-gradient-to-br from-money-buddy-teal/5 to-money-buddy-teal/10 shadow-lg relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-money-buddy-coral text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <TicketPercent className="h-4 w-4" />
            First Month Free
          </div>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Money Buddy Pro</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold">$7.99</span>
              <span className="text-gray-500 ml-1">per month</span>
            </div>
            <p className="text-gray-600">
              Everything you need to manage your finances
            </p>
          </div>
          <Link href="/auth/signup">
            <Button className="w-full mb-6 text-lg py-6">
              Get started for free
            </Button>
          </Link>

          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h4 className="font-semibold mb-4 text-moneybuddy-navy">
              What&apos;s included:
            </h4>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 flex-shrink-0 text-moneybuddy-teal" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            No credit card required to start your free trial
          </p>
        </div>
      </div>
    </section>
  );
}
