import { JSX } from "solid-js";

export function Card({
  children,
  class: className,
}: {
  children: JSX.Element;
  class?: string;
}) {
  return (
    <div class={`rounded-lg p-8 grid gap-8 border ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: JSX.Element }) {
  return <div class="grid gap-2 text-center">{children}</div>;
}

export function CardBody({ children }: { children: JSX.Element }) {
  return <div class="grid gap-4">{children}</div>;
}
