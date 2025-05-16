"use server";

import { db } from "@/db";
import { plaidAccessToken } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  CountryCode,
  Products,
} from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});
const client = new PlaidApi(configuration);

export async function createLinkToken() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return;
  }

  if (!session.user.id) {
    return;
  }

  const request = {
    user: {
      client_user_id: session.user.id,
    },
    client_name: "Money Buddy Dev",
    products: [Products.Auth, Products.Transactions],
    language: "en",
    redirect_uri: "http://localhost:3000/",
    country_codes: [CountryCode.Us],
  };

  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    return createTokenResponse.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create link token",
    };
  }
}

export async function exchangePublicToken(publicToken: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return;
  }

  if (!session.user.id) {
    return;
  }

  const request = {
    public_token: publicToken,
  };

  try {
    const exchangeTokenResponse = await client.itemPublicTokenExchange(request);
    const accessToken = exchangeTokenResponse.data.access_token;
    const itemId = exchangeTokenResponse.data.item_id;

    await db.insert(plaidAccessToken).values({
      accessToken,
      itemId,
      userId: session.user.id,
    });

    return { success: true, message: "Successfully exchanged public token" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to exchange public token",
    };
  }
}

export async function deleteAccessToken(id: string) {
  await db.delete(plaidAccessToken).where(eq(plaidAccessToken.id, id));
}

export async function getAccountInfo() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return null;
  }

  if (!session.user.id) {
    return null;
  }

  const accessTokens = await db
    .select()
    .from(plaidAccessToken)
    .where(eq(plaidAccessToken.userId, session.user.id));

  if (accessTokens.length === 0) {
    return null;
  }

  const accountInfo = [];

  try {
    for (const accessToken of accessTokens) {
      const response = await client.accountsGet({
        access_token: accessToken.accessToken,
      });

      accountInfo.push({ ...response.data, id: accessToken.id });
    }

    return accountInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTransactions() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return null;
  }

  if (!session.user.id) {
    return null;
  }

  const accessTokens = await db
    .select()
    .from(plaidAccessToken)
    .where(eq(plaidAccessToken.userId, session.user.id));

  if (accessTokens.length === 0) {
    return null;
  }

  const transactions = [];
  console.log("access token length", accessTokens.length);

  try {
    for (const accessToken of accessTokens) {
      // const endDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
      // const startDate = `${
      //   parseInt(new Date(endDate).getFullYear().toString()) - 1
      // }-${new Date().getMonth()}-${new Date().getDate()}`;

      // The transactionsSync endpoint requires a cursor for pagination
      // For initial sync, we need to set cursor to null explicitly
      const response = await client.transactionsSync({
        access_token: accessToken.accessToken,
        cursor: undefined,
      });

      transactions.push(response.data);
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return transactions;
}
