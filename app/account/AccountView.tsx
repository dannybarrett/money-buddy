'use client'

import { useSearchParams } from "next/navigation"
import IncomeView from "./Income"
import ExpensesView from "./Expenses"
import Overview from "./Overview"

export default function AccountView() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view')

  if (view === 'income') return <IncomeView />

  if (view === 'expenses') return <ExpensesView />

  return <Overview />
}