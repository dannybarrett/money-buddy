import AccountNav from "./AccountNav"

export default function AccountLayout({ children} : Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen">
      <main className="p-4">
        {children}
      </main>
      <AccountNav />
    </div>
  )
}
