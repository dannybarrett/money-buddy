"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Login() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({
      email: email as string,
      password: password as string,
      callbackURL: "/account",
    });

    if (error) {
      console.log(error);
    }

    if (data?.user) {
      redirect("/account");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label>Email</Label>
        <Input type="email" name="email" />
        <Label>Password</Label>
        <Input type="password" name="password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
