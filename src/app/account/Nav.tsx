"use client";

import { useStore } from "./store";
import { cn } from "@/lib/utils";
import { CreditCard, DollarSign, Home, Settings } from "lucide-react";
export default function AccountNav({ className }: { className?: string }) {
  const view = useStore((state: any) => state.view);
  const setView = useStore((state: any) => state.setView);
  const views = [
    {
      name: "Home",
      icon: <Home />,
    },
    {
      name: "Income",
      icon: <DollarSign />,
    },
    {
      name: "Expenses",
      icon: <CreditCard />,
    },
    {
      name: "Settings",
      icon: <Settings />,
    },
  ];

  return (
    <div
      className={cn(
        "bg-money-buddy-navy",
        "grid grid-cols-4 h-24",
        "lg:flex-col lg:py-8 lg:px-4 lg:gap-1 lg:bg-money-buddy-light-gray lg:shadow",
        className
      )}
    >
      {views.map((v) => (
        <button
          key={v.name}
          onClick={() => setView(v.name.toLowerCase())}
          className={cn(
            "text-white w-full h-full lg:h-fit flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 transition-all duration-300",
            "lg:text-money-buddy-navy lg:px-4 lg:pr-16 lg:py-3 lg:rounded-md lg:border lg:border-transparent lg:gap-4 lg:transition-background-color lg:duration-150",
            v.name.toLowerCase() === view &&
              "text-money-buddy-coral lg:border-money-buddy-navy lg:bg-money-buddy-navy lg:text-white lg:border lg:w-full "
          )}
        >
          {v.icon}
          {v.name}
        </button>
      ))}
    </div>
  );
}
