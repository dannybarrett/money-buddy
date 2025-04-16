import ViewHandler from "./_components/ViewHandler";
import AccountNav from "./_components/AccountNav";
import Image from "next/image";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <SessionProvider session={session}>
    <main className="grid grid-rows-[auto_1fr_auto] h-screen w-full">
      <Image src="/account-circle.svg" alt="Account" width={24} height={24} className="justify-self-end m-4" />
      <div className="p-4">
        <ViewHandler />
      </div>
      <AccountNav />
    </main>
    </SessionProvider>
  )
}