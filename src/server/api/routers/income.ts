import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { incomeSources } from "~/server/db/schema";

export interface IncomeType {
  name: string;
  amount: number;
  recurring: boolean;
  recurringDates: string[];
}

interface IncomeReturnType {
  sources: IncomeType[];
}

export const incomeRouter = createTRPCRouter({
  getIncome: protectedProcedure.input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) : Promise<IncomeReturnType> => {
      const income = await ctx.db.query.incomeSources.findFirst({
        where: (income, { eq }) => eq(income.userId, input.userId),
      });

      if (!income) {
        await ctx.db.insert(incomeSources).values({
          userId: input.userId,
          sources: [],
        });
      }

      console.log('INCOME', income);

      return income ? {sources: income.sources} : { sources: []};
    }),
});