import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(...inputs));
}

export function safeJsonParse<T extends object = object>(
   jsonString: unknown
): T {
   if (typeof jsonString !== "string") {
      return {} as T;
   }

   try {
      return JSON.parse(jsonString) as T;
   } catch {
      return {} as T;
   }
}
