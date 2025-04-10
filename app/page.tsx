import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Nav />
      Money buddy
    </div>
  );
}

export function Nav() {
  return (
    <nav className="p-4">
      <ul className="flex justify-evenly">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
      </ul>
    </nav>
  )
}