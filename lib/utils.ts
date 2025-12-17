import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeData(text: string): string {
  try {
    if (typeof window === 'undefined') {
      return Buffer.from(encodeURIComponent(text)).toString('base64');
    }
    return btoa(encodeURIComponent(text));
  } catch (e) {
    return '';
  }
}

export function decodeData(encoded: string): string {
  try {
    if (typeof window === 'undefined') {
      return decodeURIComponent(Buffer.from(encoded, 'base64').toString('utf-8'));
    }
    return decodeURIComponent(atob(encoded));
  } catch (e) {
    return 'Drama';
  }
}
