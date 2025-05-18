import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeTitle(title: string) {
  return title
    .split(" ")
    .map((word, index) => {
      const lowercaseWords = [
        "the",
        "and",
        "or",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
      ];
      return index === 0 || !lowercaseWords.includes(word.toLowerCase())
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase();
    })
    .join(" ");
}

export function stringToCurrency(string: string) {
  return parseFloat(string).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
