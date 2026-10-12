import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Properties for the {@link Input} component.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional icon or element anchored to the left of the input field.
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional icon or action element anchored to the right of the input field.
   */
  rightIcon?: React.ReactNode;
}

/**
 * Styled text input supporting leading/trailing adornment icons and glassmorphism.
 *
 * @example
 * ```tsx
 * <Input
 *   placeholder="Search..."
 *   leftIcon={<Search className="w-4 h-4" />}
 *   value={query}
 *   onChange={(e) => setQuery(e.target.value)}
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {leftIcon && (
          <div
            className="pointer-events-none absolute left-3.5 flex items-center justify-center text-[var(--text-muted)]"
            aria-hidden="true"
          >
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-[var(--radius-lg)] border border-[var(--input-border)] bg-[var(--input-bg)] px-3.5 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] backdrop-blur-md transition-all duration-200 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-[var(--input-focus-border)] focus:ring-4 focus:ring-[var(--input-focus-glow)] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div
            className="absolute right-3.5 flex items-center justify-center text-[var(--text-muted)]"
            aria-hidden="true"
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
