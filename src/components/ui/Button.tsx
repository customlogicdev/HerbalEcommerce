import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "peach";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-cream hover:bg-primary-dark shadow-sm",
  secondary: "bg-beige text-primary hover:bg-primary-light hover:text-white",
  outline: "border border-primary/40 text-primary hover:bg-primary hover:text-cream",
  ghost: "text-primary hover:bg-beige",
  peach: "bg-peach text-charcoal hover:brightness-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-5 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/** Shared class generator so Links can reuse button styling without nesting. */
export function buttonStyles(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string
): string {
  return cn(base, variantClasses[variant], sizeClasses[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
