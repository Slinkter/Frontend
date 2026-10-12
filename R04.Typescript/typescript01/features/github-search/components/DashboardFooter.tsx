import React from "react";
import { Terminal } from "lucide-react";

/**
 * Footer component displaying system connectivity status and technology stack badges.
 */
export const DashboardFooter = React.memo(function DashboardFooter() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-8 pb-4 text-[11px] text-[var(--text-muted)]">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-medium">GitHub API Conectado</span>
        <span>•</span>
        <span className="font-mono text-[10px]">O(log n) Inverted Index</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1">
          <Terminal className="h-3 w-3" />
          <span>Next.js 16</span>
        </span>
        <span>•</span>
        <span>Tailwind CSS v4</span>
        <span>•</span>
        <span>Radix UI</span>
      </div>
    </footer>
  );
});
