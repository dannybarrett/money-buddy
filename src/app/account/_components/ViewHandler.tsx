'use client'

import Income from "../_views/Income";
import Expenses from "../_views/Expenses";
import Account from "../_views/Account";
import { useSearchParams } from "next/navigation";

export default function ViewHandler() {
  
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "account";

  switch (view) {
    case "income": return <Income />; 
    case "expenses": return <Expenses />;
    default: return <Account />;
  }
}