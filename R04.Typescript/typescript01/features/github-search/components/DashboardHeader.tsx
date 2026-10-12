"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui";
import { GithubIcon } from "@/components/icons";
import SearchInput from "./SearchInput";

/**
 * Properties for the {@link DashboardHeader} component.
 */
export interface DashboardHeaderProps {
  /** Currently active user login handle. */
  currentUserLogin?: string;
  /** Fallback default username. */
  defaultUser: string;
  /** Active query loading indicator. */
  loading: boolean;
  /** Primary search submission callback. */
  onSearch: (username: string) => void;
  /** Quick recommendation chip click handler. */
  onQuickSearch: (username: string) => void;
  /** List of suggested usernames to render as quick-search pills. */
  suggestedUsers: readonly string[];
}

/**
 * Top branding and search header displaying title, subtitle, search input,
 * and quick-suggestion username chips.
 */
export const DashboardHeader = React.memo(function DashboardHeader({
  currentUserLogin,
  defaultUser,
  loading,
  onSearch,
  onQuickSearch,
  suggestedUsers,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto pt-2">
      <Badge variant="aurora" size="lg" className="gap-2 px-3.5 py-1 text-xs shadow-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
        </span>
        <GithubIcon className="h-3.5 w-3.5" />
        <span className="font-semibold tracking-wide">GitHub Explorer • Aurora Glass</span>
      </Badge>

      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
        Explora{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
          Desarrolladores
        </span>
      </h1>

      <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg leading-relaxed">
        Métricas en tiempo real, repositorios y perfiles con rendimiento optimizado en tiempo sublineal y diseño Aurora Glass.
      </p>

      <div className="w-full max-w-md pt-2 space-y-3">
        <SearchInput
          defaultValue={currentUserLogin ?? defaultUser}
          loading={loading}
          onSearch={onSearch}
        />

        {/* Chips de sugerencias interactivas rápidas */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs text-[var(--text-muted)] pt-1">
          <span className="text-[11px] font-medium flex items-center gap-1 text-[var(--text-muted)]">
            <Sparkles className="h-3 w-3 text-indigo-500" />
            Sugerencias:
          </span>
          {suggestedUsers.map((user) => (
            <button
              key={user}
              type="button"
              onClick={() => onQuickSearch(user)}
              disabled={loading}
              aria-label={`Buscar usuario @${user}`}
              className="rounded-full border border-[var(--glass-border-subtle)] bg-[var(--glass-bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)] backdrop-blur-md transition-[transform,border-color,color] duration-200 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900"
            >
              @{user}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
});
