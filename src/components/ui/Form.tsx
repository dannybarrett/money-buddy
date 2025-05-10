import { JSX } from "solid-js";

export function Form({
  onSubmit,
  children,
}: {
  onSubmit: (e: Event) => void;
  children: JSX.Element;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
      class="grid gap-4"
    >
      {children}
    </form>
  );
}

export function FormItem({ children }: { children: JSX.Element }) {
  return <div class="grid gap-1">{children}</div>;
}

export function Label({
  children,
  ...props
}: { children: JSX.Element } & JSX.IntrinsicElements["label"]) {
  return (
    <label class="text-xs font-medium text-sky-500" {...props}>
      {children}
    </label>
  );
}

export function Input({
  type = "text",
  ...props
}: { type?: string } & JSX.IntrinsicElements["input"]) {
  return (
    <input
      type={type}
      class="rounded-lg border p-2 focus:border-sky-600 focus:outline-none accent-sky-600"
      {...props}
    />
  );
}
