import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const buttonVariants = {
  primary:
    "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl",
  secondary: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
  luxury:
    "bg-gradient-to-r from-luxury-gold to-yellow-400 text-gray-900 shadow-lg",
  ghost:
    "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
};

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
