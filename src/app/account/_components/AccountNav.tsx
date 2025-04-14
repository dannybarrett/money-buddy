'use client';

import { Navbar, NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AccountNav() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <Navbar className="flex">
      <NavbarItem className={`nav-tab ${view === 'account' ? 'bg-gray-800' : ''}`}>
        <Link href="/account?view=account" className="w-full text-center p-4">Account</Link>
      </NavbarItem>
      <NavbarItem className={`nav-tab ${view === 'income' ? 'bg-gray-800' : ''}`}>
        <Link href="/account?view=income" className="w-full text-center p-4">Income</Link>
      </NavbarItem>
      <NavbarItem className={`nav-tab ${view === 'expenses' ? 'bg-gray-800' : ''}`}>
        <Link href="/account?view=expenses" className="w-full text-center p-4">Expenses</Link>
      </NavbarItem>
    </Navbar>
  )
} 