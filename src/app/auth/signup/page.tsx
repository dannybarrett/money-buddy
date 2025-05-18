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
import { useState } from "react";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const { data, error } = await authClient.signUp.email({
      name: `${firstName} ${lastName}`,
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
            <h1 className="text-3xl">Sign up</h1>
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Create a new account
          </CardDescription>
          <p className="text-rose-500 text-sm">{error}</p>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-8">
          <div className="flex flex-col gap-2">
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="John"
              required={true}
              onChange={() => setError(null)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Last Name (optional)</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Doe"
              onChange={() => setError(null)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
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
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create account</span>
              </>
            )}
          </Button>
        </form>
      </Card>
      <Link href="/auth/login">Already have an account? Login</Link>
    </div>
  );
}
