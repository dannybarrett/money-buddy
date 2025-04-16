"use client";

import { Radio, RadioGroup } from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { api } from "~/trpc/react";

export default function Income() {
  const { data: session } = useSession();
  const userId = session?.user.id || '';
  const { data } = api.income.getIncome.useQuery({ userId: userId })
  const { sources } = data || { sources: [] }

  const [incomeSources, setIncomeSources] = useState([...sources])
  
  const searchParams = useSearchParams();
  const add = searchParams.get("add") === "true";


  if (add) {
    return <AddIncome />;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1>Income sources</h1>
      {sources.length > 0 ? (
        <ul>
          {sources.map((source, index) => (
            <li key={index}>{source.name}</li>
          ))}
        </ul>
      ) : (
        <p>No income sources found.</p>
      )}
      <Link href="/account?view=income&add=true" className="btn-primary">Add Income</Link>
    </div>
  );
}

function AddIncome() {
  const [recurring, setRecurring] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <Link href="/account?view=income" className="btn-secondary">{`<-`} Back</Link>
      <h1>Add Income</h1>
      <form>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" required />
        </label>
        <label htmlFor="amount">
          Amount:
          <input type="number" name="amount" id="amount" required />
        </label>
        <fieldset>
          <legend>Recurring:</legend>
          <div className="flex gap-2 bg-green-500">
            <label htmlFor="recurring-yes" className="flex gap-1">
              <input type="radio" id="recurring-yes" name="recurring" value="yes" className="w-fit" onClick={() => setRecurring(true)} />
              Yes
            </label>
            <label htmlFor="recurring-no" className="flex gap-1">
              <input type="radio" id="recurring-no" name="recurring" value="no" className="w-fit" onClick={() => setRecurring(false)} />
              No
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  )
}