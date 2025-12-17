import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    
    const variants = {
      primary: "bg-nongton-red hover:bg-nongton-red/90 text-white shadow-lg hover:shadow-nongton-red/50",
      secondary: "bg-zinc-800/50 hover:bg-zinc-800/70 text-white",
      ghost: "hover:bg-zinc-800/50 text-white hover:text-nongton-red",
      icon: "rounded-full hover:bg-zinc-800/50 text-white hover:text-nongton-red"
    };
    
    const sizes = {
      sm: variant === "icon" ? "p-1.5" : "px-3 py-1.5 text-xs rounded-md gap-1.5",
      md: variant === "icon" ? "p-2" : "px-4 py-2 text-sm rounded-md gap-2",
      lg: variant === "icon" ? "p-3" : "px-6 py-3 text-base rounded-md gap-2"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className={cn(
          size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5"
        )} />}
        {children}
        {Icon && iconPosition === "right" && <Icon className={cn(
          size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5"
        )} />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
