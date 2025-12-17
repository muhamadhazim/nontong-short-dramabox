import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({ 
  icon: Icon, 
  title, 
  action,
  className = "" 
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-3 sm:mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-nongton-red" />}
        <h2 className="text-base sm:text-lg md:text-xl font-bold">{title}</h2>
      </div>
      {action}
    </div>
  );
}
