import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Glassmorphic container card component.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] backdrop-blur-xl shadow-[var(--glass-shadow)] transition-all duration-300 ease-out",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * Header section of a {@link Card}, standardizing padding and title/description spacing.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 sm:p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Title heading component for {@link CardHeader}.
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base sm:text-lg font-bold leading-none tracking-tight text-[var(--text-primary)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Subtitle or descriptive text inside a {@link CardHeader}.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-[var(--text-muted)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Main body content section of a {@link Card}.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Footer section of a {@link Card}, useful for action buttons and secondary meta.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 sm:p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
