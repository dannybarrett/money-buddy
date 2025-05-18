"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      redirect("/account");
    }
  }, [session]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({
      email: email as string,
      password: password as string,
      callbackURL: "/account",
    });

    if (error) {
      setError(error.message || "Something went wrong");
    }

    if (data?.user) {
      redirect("/account");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full section-padding">
      <Card className="w-full max-w-md p-4 lg:p-8">
        <CardHeader className="p-0 text-center">
          <CardTitle>
            <h1 className="text-3xl">Login</h1>
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Enter your credentials to continue
          </CardDescription>
          <p className="text-rose-500 text-sm">{error}</p>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-8">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="someone@example.com"
              required={true}
              onChange={() => setError(null)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              required={true}
              onChange={() => setError(null)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
              </>
            )}
          </Button>
        </form>
      </Card>
      <Link href="/auth/signup">Don&apos;t have an account? Sign up</Link>
    </div>
  );
}
