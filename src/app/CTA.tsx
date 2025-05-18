import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-money-buddy-teal to-money-buddy-navy text-white text-lg">
      <div className="container mx-auto flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl text-center">
          Ready to take control of your finances?
        </h2>
        <p className="text-white/80">
          Sign up for Money Buddy today and start your journey to financial
          freedom.
        </p>
        <Link href="/auth/signup" className="mt-8">
          <Button className="bg-white/90 text-money-buddy-navy text-xl py-6 px-12 hover:bg-money-buddy-coral">
            Get started for free
          </Button>
        </Link>
      </div>
    </section>
  );
}
