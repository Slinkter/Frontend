import React, { type ReactNode } from "react";
import { Card } from "@/components/ui";

/**
 * Properties for the {@link BentoStatCard} component.
 */
export interface BentoStatCardProps {
  /** Uppercase label text displayed at the top of the stat card. */
  label: string;
  /** Primary metric value (number or element). */
  value: ReactNode;
  /** Descriptive secondary explanation displayed under the value. */
  subtitle: string;
  /** Decorative icon node. */
  icon: ReactNode;
  /** Tailwind classes configuring icon badge background and text colors. */
  iconBgColor?: string;
  /** Tailwind classes for hover border styling. */
  hoverBorderColor?: string;
  /** Optional HTML title tooltip on value hover. */
  tooltipTitle?: string;
}

/**
 * Bento-style compact metric card displaying key metrics, icons, and captions.
 *
 * @example
 * ```tsx
 * <BentoStatCard
 *   label="Stars"
 *   value="1.2k"
 *   subtitle="Across repositories"
 *   icon={<Star className="w-4 h-4" />}
 * />
 * ```
 */
export const BentoStatCard = React.memo(function BentoStatCard({
  label,
  value,
  subtitle,
  icon,
  iconBgColor = "bg-indigo-500/10 text-indigo-500",
  hoverBorderColor = "hover:border-indigo-500/40",
  tooltipTitle,
}: BentoStatCardProps) {
  return (
    <Card
      className={`p-4 flex flex-col justify-between ${hoverBorderColor} hover:shadow-lg hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 rounded-[var(--radius-xl)] group min-w-0`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`flex items-center justify-center h-7 w-7 rounded-[var(--radius-lg)] ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-3 min-w-0">
        <div
          className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-mono tabular-nums truncate"
          title={tooltipTitle}
        >
          {value}
        </div>
        <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
          {subtitle}
        </p>
      </div>
    </Card>
  );
});
