'use client'

import { useSearchParams } from "next/navigation"
import IncomeView from "./IncomeView"
import ExpensesView from "./ExpensesView"

export default function AccountView() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view')

  if (view === 'income') return <IncomeView />

  if (view === 'expenses') return <ExpensesView />

  return (
    <div>
      overview
    </div>
  )
}