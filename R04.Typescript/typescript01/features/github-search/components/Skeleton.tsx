import React from "react";
import { Card } from "@/components/ui";

export function ProfileSkeleton(): React.ReactElement {
  return (
    <Card className="p-6 flex flex-col items-center space-y-5 rounded-[var(--radius-2xl)]" aria-hidden="true">
      {/* Avatar skeleton */}
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full skeleton-shimmer" />

      {/* Título y handle */}
      <div className="text-center space-y-2 w-full">
        <div className="h-6 w-44 rounded-[var(--radius-md)] skeleton-shimmer mx-auto" />
        <div className="h-3.5 w-24 rounded-[var(--radius-md)] skeleton-shimmer mx-auto" />
      </div>

      {/* Bio skeleton */}
      <div className="w-full rounded-[var(--radius-xl)] border border-[var(--glass-border)] skeleton-shimmer h-16" />

      {/* Metadata items skeleton */}
      <div className="w-full space-y-2 border-t border-[var(--glass-border)] pt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-9 rounded-[var(--radius-lg)] skeleton-shimmer w-full"
          />
        ))}
      </div>

      {/* Stats skeleton */}
      <div className="w-full grid grid-cols-3 gap-1.5 rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-1.5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="h-16 rounded-[var(--radius-lg)] skeleton-shimmer"
          />
        ))}
      </div>
    </Card>
  );
}

export function RepoListSkeleton(): React.ReactElement {
  return (
    <div className="space-y-4" aria-hidden="true">
      {/* Header controls skeleton */}
      <div className="h-10 w-full rounded-[var(--radius-lg)] skeleton-shimmer" />

      {/* Repo cards skeleton */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="p-4 space-y-3 rounded-[var(--radius-xl)] border border-[var(--glass-border)]"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-32 rounded-[var(--radius-md)] skeleton-shimmer" />
              <div className="h-4 w-12 rounded-full skeleton-shimmer" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded-[var(--radius-sm)] skeleton-shimmer" />
              <div className="h-3 w-3/4 rounded-[var(--radius-sm)] skeleton-shimmer" />
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--glass-border)]">
              <div className="h-3.5 w-20 rounded-[var(--radius-sm)] skeleton-shimmer" />
              <div className="h-3.5 w-16 rounded-[var(--radius-sm)] skeleton-shimmer" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
