"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center p-4 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <header className="a:text-black">
        <Link href="/" className="flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-money-buddy-teal" />
          <span className="text-xl font-bold text-money-buddy-navy">
            Money<span className="text-money-buddy-teal">Buddy</span>
          </span>
        </Link>
      </header>
      <button onClick={() => setOpen(!open)} className="md:hidden">
        <Menu className="w-8 h-8 text-money-buddy-navy" />
      </button>
      {open && (
        <div className="absolute top-0 left-0 bg-white p-4 w-4/5 h-screen shadow md:hidden">
          <NavLinks setOpen={setOpen} />
        </div>
      )}
      <div className="hidden md:block">
        <NavLinks setOpen={setOpen} />
      </div>
    </nav>
  );
}

function NavLinks({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 ">
      <Link
        href="/#features"
        className="hover:text-money-buddy-teal"
        onClick={() => setOpen(false)}
      >
        Features
      </Link>
      <Link
        href="/#how-it-works"
        className="hover:text-money-buddy-teal"
        onClick={() => setOpen(false)}
      >
        How it works
      </Link>
      <Link
        href="/#testimonials"
        className="hover:text-money-buddy-teal"
        onClick={() => setOpen(false)}
      >
        Testimonials
      </Link>
      <Link
        href="/#pricing"
        className="hover:text-money-buddy-teal"
        onClick={() => setOpen(false)}
      >
        Pricing
      </Link>
      <div className="flex flex-col lg:flex-row gap-4">
        <Link href="/auth/login">
          <Button variant="outline" className="w-full md:w-fit">
            Login
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant="secondary" className="w-full md:w-fit">
            Sign up free
          </Button>
        </Link>
      </div>
    </div>
  );
}
