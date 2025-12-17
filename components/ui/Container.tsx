import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
  noPadding?: boolean;
}

export default function Container({ 
  children, 
  className,
  size = "md",
  noPadding = false
}: ContainerProps) {
  const sizes = {
    sm: "max-w-screen-sm",   // 640px - mobile focused
    md: "max-w-screen-md",   // 768px - tablet
    lg: "max-w-7xl",         // 1280px - desktop
    full: "max-w-full"
  };

  return (
    <div className={cn(
      "mx-auto w-full",
      sizes[size],
      !noPadding && "px-4 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  );
}
