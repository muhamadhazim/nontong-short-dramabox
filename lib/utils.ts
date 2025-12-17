import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DramaCard } from "@/types/drama";

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

// Filter out dramas with invalid data and ensure unique IDs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterValidDramas(dramas: any[]): DramaCard[] {
  const seen = new Set();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return dramas.filter((d: any) => {
    if (!d.id || !d.title || !d.cover) return false;
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  }) as DramaCard[];
}
