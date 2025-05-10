import { JSX } from "solid-js";

export function Button({
  children,
  ...props
}: { children: JSX.Element } & JSX.IntrinsicElements["button"]) {
  return (
    <button
      class="rounded-full bg-gradient-to-b from-sky-600 to-blue-700 px-4 py-2 font-medium text-white hover:from-sky-500 hover:to-blue-600 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 transition duration-200 ease-in-out"
      {...props}
    >
      {children}
    </button>
  );
}
