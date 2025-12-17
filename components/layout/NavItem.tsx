"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export default function NavItem({ href, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all duration-200 active:scale-95",
        isActive && "text-nongton-red"
      )}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors duration-200",
          isActive ? "text-nongton-red" : "text-nongton-gray"
        )}
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span
        className={cn(
          "text-[10px] font-medium transition-colors duration-200",
          isActive ? "text-nongton-red" : "text-nongton-gray"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
