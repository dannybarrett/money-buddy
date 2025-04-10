"use client";

import { Navbar, NavbarItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import homeIcon from './home.svg';
import walletIcon from './wallet.svg';
import shoppingBagIcon from './shopping-bag.svg';

export default function AccountNav() {
  return (
    <Navbar className="list-none flex justify-between w-full p-4 border-t-2">
      <NavbarItem className="bottom-nav-li">
        <Image src={homeIcon} alt="Overview" width={24} height={24} />
        <Link href="/account">Overview</Link>
      </NavbarItem>
      <NavbarItem className="bottom-nav-li">
        <Image src={walletIcon} alt="Income" width={24} height={24} />
        <Link href="/account?view=income">Income</Link>
      </NavbarItem>
      <NavbarItem className="bottom-nav-li">
      <Image src={shoppingBagIcon} alt="Expenses" width={24} height={24} />
        <Link href="/account?view=expenses">Expenses</Link>
      </NavbarItem>
    </Navbar>
  )
}