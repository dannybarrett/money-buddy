"use server";

import { db } from "@/db";
import { budget, expenses, income } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Category } from "@/lib/types";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

// INCOME

export async function getIncomeSources() {
  const session = await getSession();

  if (!session || !session.user) return;

  const incomeSources = await db
    .select()
    .from(income)
    .where(eq(income.userId, session.user.id));

  return incomeSources;
}

export async function addIncomeSource(values: {
  name: string;
  amount: string;
  date: string;
  categories: Category[];
}) {
  const session = await getSession();

  if (!session || !session.user) return;

  const newIncomeSource = await db
    .insert(income)
    .values({
      ...values,
      date: new Date(values.date),
      userId: session.user.id,
    })
    .returning();

  console.log("NEW INCOME SOURCE", newIncomeSource);

  return {
    success: newIncomeSource.length > 0,
    incomeSource: newIncomeSource[0],
  };
}

export async function updateIncomeSource(values: {
  id: string;
  name: string;
  amount: string;
  date: string;
  categories: Category[];
}) {
  const session = await getSession();

  if (!session || !session.user) return;

  const result = await db
    .update(income)
    .set({
      ...values,
      date: new Date(values.date),
    })
    .where(eq(income.id, values.id))
    .returning();

  return {
    success: result.length > 0,
    incomeSource: result[0],
  };
}

export async function deleteIncomeSource(id: string) {
  const session = await getSession();

  if (!session || !session.user) return;

  const query = await db.delete(income).where(eq(income.id, id));

  return {
    success: query?.rowCount && query.rowCount > 0,
  };
}

// EXPENSES

export async function getExpenses() {
  const session = await getSession();

  if (!session || !session.user) return;

  const result = await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, session.user.id));

  return result;
}

export async function addExpense(values: {
  name: string;
  amount: string;
  date: string;
  categories: Category[];
}) {
  const session = await getSession();

  if (!session || !session.user) return;

  const newExpense = await db
    .insert(expenses)
    .values({
      ...values,
      date: new Date(values.date),
      userId: session.user.id,
    })
    .returning();

  return {
    success: newExpense.length > 0,
    expense: newExpense[0],
  };
}

export async function updateExpense(values: {
  id: string;
  name: string;
  amount: string;
  date: string;
  categories: Category[];
  transactionId: string | null;
}) {
  const session = await getSession();

  if (!session || !session.user) return;

  const exists =
    values.transactionId &&
    (await db.$count(
      expenses,
      eq(expenses.transactionId, values.transactionId)
    ));

  if (exists) {
    const result = await db
      .update(expenses)
      .set({
        ...values,
        date: new Date(values.date),
      })
      .where(eq(expenses.id, values.id))
      .returning();

    return {
      success: result.length > 0,
      expense: result[0],
    };
  }

  const newExpense = await db
    .insert(expenses)
    .values({
      ...values,
      date: new Date(values.date),
      userId: session.user.id,
    })
    .returning();

  return {
    success: newExpense.length > 0,
    expense: newExpense[0],
  };
}

export async function deleteExpense(id: string) {
  const session = await getSession();

  if (!session || !session.user) return;

  const query = await db.delete(expenses).where(eq(expenses.id, id));

  return {
    success: query?.rowCount && query.rowCount > 0,
  };
}

export async function getBudget() {
  const session = await getSession();

  if (!session || !session.user) return;

  const result = await db
    .select()
    .from(budget)
    .where(eq(budget.userId, session.user.id));

  if (result.length === 0) {
    const newBudget = await db
      .insert(budget)
      .values({
        userId: session.user.id,
        categories: [],
      })
      .returning();

    return newBudget[0];
  }

  return result[0];
}

export async function updateBudget(values: { categories: Category[] }) {
  const session = await getSession();

  if (!session || !session.user) return;

  const result = await db
    .update(budget)
    .set({
      categories: values.categories,
    })
    .where(eq(budget.userId, session.user.id))
    .returning();

  return {
    success: result.length > 0,
    budget: result[0],
  };
}
