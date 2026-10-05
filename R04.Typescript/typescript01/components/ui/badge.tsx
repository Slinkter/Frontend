import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 select-none",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-indigo-600 text-white shadow-xs hover:bg-indigo-500",
        secondary:
          "border border-[var(--meta-border)] bg-[var(--meta-bg)] text-[var(--meta-text)] backdrop-blur-sm",
        outline:
          "border border-[var(--glass-border)] text-[var(--text-primary)] backdrop-blur-sm hover:border-indigo-500/30",
        glass:
          "border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] backdrop-blur-md shadow-xs hover:border-[var(--glass-glow)]",
        aurora:
          "border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 text-indigo-600 dark:text-indigo-300 backdrop-blur-md shadow-xs hover:border-indigo-500/50",
        destructive:
          "border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400 backdrop-blur-sm",
        success:
          "border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 backdrop-blur-sm",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] px-2 py-0.5 font-medium tracking-wide",
        lg: "text-xs sm:text-sm px-3.5 py-1",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
