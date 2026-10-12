"use client";

import React, { useMemo, useCallback } from "react";
import { Star, BookOpen, Users, CodeXml } from "lucide-react";
import { useGitHubSearch } from "./hooks";
import { type GitHubUser, type GitHubRepo } from "./api";
import {
  UserProfile,
  RepoList,
  ThemeToggle,
  BentoStatCard,
  ProfileSkeleton,
  RepoListSkeleton,
  DashboardHeader,
  DashboardFooter,
  DashboardErrorState,
  DashboardEmptyState,
} from "./components";
import { formatCompactNumber, calculateRepoStatistics } from "./lib/formatters";
import { GITHUB_CONFIG } from "./constants";
import {
  Card,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui";

/**
 * Properties for the {@link GitHubSearchDashboard} orchestrator component.
 */
export interface GitHubSearchDashboardProps {
  /** Optional pre-fetched user profile passed down from SSR. */
  initialUser?: GitHubUser | null;
  /** Optional pre-fetched repositories passed down from SSR. */
  initialRepos?: GitHubRepo[];
}

/**
 * Main dashboard view composing hero search header, Bento grid metrics,
 * user profile sidebar, interactive repository list, and toast alerts.
 *
 * @example
 * ```tsx
 * <GitHubSearchDashboard initialUser={user} initialRepos={repos} />
 * ```
 */
export function GitHubSearchDashboard({
  initialUser = null,
  initialRepos = [],
}: GitHubSearchDashboardProps = {}) {
  const {
    currentUser,
    repos,
    loading,
    error,
    clearError,
    searchUser,
  } = useGitHubSearch({
    initialUser,
    initialRepos,
    defaultUser: GITHUB_CONFIG.DEFAULT_USER,
  });

  // Métricas acumuladas usando función pura desacoplada (SRP)
  const stats = useMemo(() => calculateRepoStatistics(repos), [repos]);

  // Lista declarativa de métricas Bento (DRY y Open/Closed Principle)
  const bentoMetrics = useMemo(() => {
    if (!currentUser) return [];

    return [
      {
        id: "stars",
        label: "Estrellas",
        value:
          stats.totalStars >= GITHUB_CONFIG.UI.COMPACT_METRICS_THRESHOLD
            ? formatCompactNumber(stats.totalStars)
            : stats.totalStars.toLocaleString("es-ES"),
        subtitle: "Total acumulado",
        icon: (
          <Star
            className="h-3.5 w-3.5 fill-amber-500/30 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          />
        ),
        iconBgColor: "bg-amber-500/10 text-amber-500",
        hoverBorderColor: "hover:border-amber-500/40",
        tooltipTitle: `Total acumulado de estrellas: ${stats.totalStars.toLocaleString("es-ES")}`,
      },
      {
        id: "repos",
        label: "Repositorios",
        value:
          currentUser.public_repos >= GITHUB_CONFIG.UI.COMPACT_METRICS_THRESHOLD
            ? formatCompactNumber(currentUser.public_repos)
            : currentUser.public_repos.toLocaleString("es-ES"),
        subtitle: "Públicos indexados",
        icon: (
          <BookOpen
            className="h-3.5 w-3.5 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          />
        ),
        iconBgColor: "bg-indigo-500/10 text-indigo-500",
        hoverBorderColor: "hover:border-indigo-500/40",
        tooltipTitle: `Repositorios públicos: ${currentUser.public_repos.toLocaleString("es-ES")}`,
      },
      {
        id: "followers",
        label: "Seguidores",
        value:
          currentUser.followers >= GITHUB_CONFIG.UI.COMPACT_METRICS_THRESHOLD
            ? formatCompactNumber(currentUser.followers)
            : currentUser.followers.toLocaleString("es-ES"),
        subtitle: "En comunidad",
        icon: (
          <Users
            className="h-3.5 w-3.5 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          />
        ),
        iconBgColor: "bg-emerald-500/10 text-emerald-500",
        hoverBorderColor: "hover:border-emerald-500/40",
        tooltipTitle: `Seguidores en comunidad: ${currentUser.followers.toLocaleString("es-ES")}`,
      },
      {
        id: "top-lang",
        label: "Lenguaje Top",
        value: stats.topLang,
        subtitle: "Predominante",
        icon: (
          <CodeXml
            className="h-3.5 w-3.5 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          />
        ),
        iconBgColor: "bg-cyan-500/10 text-cyan-500",
        hoverBorderColor: "hover:border-cyan-500/40",
        tooltipTitle: `Lenguaje predominante: ${stats.topLang}`,
      },
    ];
  }, [currentUser, stats]);

  const handleQuickSearch = useCallback(
    (user: string) => {
      searchUser(user);
    },
    [searchUser]
  );

  return (
    <ToastProvider swipeDirection="right">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 space-y-10 relative">
        {/* Iluminación ambiental Aurora ligera sin sobrecargar la GPU */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10 select-none opacity-50 dark:opacity-70">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
          <div className="absolute top-20 -right-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)]" />
          <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
        </div>

        {/* Botón flotante de tema */}
        <div className="fixed top-5 right-5 z-50">
          <ThemeToggle />
        </div>

        {/* Notificación Toast para errores de red o cuota */}
        {error && (
          <Toast
            variant="destructive"
            open={!!error}
            onOpenChange={(open) => {
              if (!open) clearError();
            }}
          >
            <div className="grid gap-1">
              <ToastTitle>Aviso de GitHub API</ToastTitle>
              <ToastDescription>{error}</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        )}
        <ToastViewport />

        {/* Cabecera Hero y buscador */}
        <DashboardHeader
          currentUserLogin={currentUser?.login}
          defaultUser={GITHUB_CONFIG.DEFAULT_USER}
          loading={loading}
          onSearch={searchUser}
          onQuickSearch={handleQuickSearch}
          suggestedUsers={GITHUB_CONFIG.SUGGESTED_USERS}
        />

        {/* BENTO GRID ASIMÉTRICO DINÁMICO */}
        <main className="min-h-[32rem]" aria-busy={loading} aria-live="polite">
          {loading ? (
            <>
              <span className="sr-only" role="status">
                Cargando información del desarrollador y sus repositorios...
              </span>
              <div className="grid gap-6 lg:grid-cols-12 items-start" aria-hidden="true">
                <div className="lg:col-span-4">
                  <ProfileSkeleton />
                </div>
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array.from({ length: GITHUB_CONFIG.UI.SKELETON_METRICS_COUNT }).map((_, i) => (
                      <Card
                        key={i}
                        className="h-24 skeleton-shimmer rounded-[var(--radius-xl)]"
                      />
                    ))}
                  </div>
                  <RepoListSkeleton />
                </div>
              </div>
            </>
          ) : currentUser ? (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Columna Izquierda: Perfil vertical */}
              <div className="lg:col-span-4 lg:sticky lg:top-6">
                <UserProfile user={currentUser} />
              </div>

              {/* Columna Derecha: Bento Stats + Repositorios */}
              <div className="lg:col-span-8 space-y-6 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {bentoMetrics.map((metric) => (
                    <BentoStatCard key={metric.id} {...metric} />
                  ))}
                </div>

                <Card className="p-5 sm:p-6 rounded-[var(--radius-2xl)]">
                  <RepoList repos={repos} />
                </Card>
              </div>
            </div>
          ) : error ? (
            <DashboardErrorState
              error={error}
              defaultUser={GITHUB_CONFIG.DEFAULT_USER}
              onRetry={handleQuickSearch}
            />
          ) : (
            <DashboardEmptyState />
          )}
        </main>

        {/* Footer Minimalista */}
        <DashboardFooter />
      </div>
    </ToastProvider>
  );
}
