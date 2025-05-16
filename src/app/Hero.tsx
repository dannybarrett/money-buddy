import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="section-padding bg-gradient-to-br from-white to-money-buddy-light-gray p-4 lg:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Take control of your{" "}
              <span className="gradient-text">finances</span> with ease
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Money Buddy helps you track expenses, create budgets, and connect
              all your accounts in one place. No manual entry required (unless
              you want to).
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="cta-button" variant="secondary">
                Get started for free
              </Button>
              <Button variant="outline" className="secondary-button">
                Learn more
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-moneybuddy-teal text-white flex items-center justify-center text-xs font-medium">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-moneybuddy-navy text-white flex items-center justify-center text-xs font-medium">
                  KL
                </div>
                <div className="w-8 h-8 rounded-full bg-moneybuddy-coral text-white flex items-center justify-center text-xs font-medium">
                  MP
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium">
                  +
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Join 10,000+ users already saving money
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-[500px] bg-money-buddy-navy/5 rounded-2xl overflow-hidden relative animate animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-money-buddy-teal/10 to-money-buddy-coral/10" />
              <div className="absolute top-8 left-8 right-8 bottom-8 bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="h-14 bg-money-buddy-navy flex items-center px-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <div className="ml-4 text-white text-sm">
                    Money Buddy Dashboard
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-24 bg-money-buddy-light-gray rounded-lg mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-32 bg-money-buddy-teal/10 rounded-lg"></div>
                    <div className="h-32 bg-money-buddy-coral/10 rounded-lg"></div>
                  </div>
                  <div className="h-40 bg-money-buddy-navy/5 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
