import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 dark:from-indigo-500 dark:to-indigo-600 dark:hover:from-indigo-400 dark:hover:to-indigo-500",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600",
        outline:
          "border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)] hover:border-indigo-500/40 shadow-xs",
        secondary:
          "bg-slate-100 dark:bg-slate-800 text-[var(--text-primary)] hover:bg-slate-200 dark:hover:bg-slate-700",
        ghost:
          "text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[var(--text-primary)]",
        link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline",
        glass:
          "bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)] hover:border-indigo-500/40 shadow-[var(--glass-shadow)] hover:shadow-[var(--glass-shadow-hover)]",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-[var(--radius-lg)]",
        sm: "h-8 px-3 text-xs rounded-[var(--radius-md)]",
        lg: "h-11 px-6 text-base rounded-[var(--radius-xl)]",
        icon: "h-9 w-9 p-0 rounded-[var(--radius-lg)]",
        "icon-sm": "h-7 w-7 p-0 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
