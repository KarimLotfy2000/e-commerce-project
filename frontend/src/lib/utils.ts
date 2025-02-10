import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
export function generateProductSlug(id: number, name?: string, brand?: string) {
  const safeBrand = brand
    ? brand.toLowerCase().replace(/\s+/g, "-")
    : "unknown";
  const safeName = name ? name.toLowerCase().replace(/\s+/g, "-") : "product";

  return `${id}-${safeBrand}-${safeName}`;
}
