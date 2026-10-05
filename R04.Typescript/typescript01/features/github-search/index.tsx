"use client";

import React, { useMemo, useCallback } from "react";
import { Terminal, Star, BookOpen, Users, CodeXml, Sparkles, AlertCircle } from "lucide-react";
import { useGitHubSearch } from "./hooks";
import { type GitHubUser, type GitHubRepo } from "./api";
import {
  SearchInput,
  UserProfile,
  RepoList,
  ThemeToggle,
  ProfileSkeleton,
  RepoListSkeleton,
} from "./components";
import { formatCompactNumber } from "./lib/formatters";
import {
  Card,
  Badge,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui";

const SUGGESTED_USERS = ["vercel", "shadcn", "torvalds", "antfu", "leerob"];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export interface GitHubSearchDashboardProps {
  initialUser?: GitHubUser | null;
  initialRepos?: GitHubRepo[];
}

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
    defaultUser: "vercel",
  });

  // Métricas acumuladas para los bloques Bento superiores
  const stats = useMemo(() => {
    if (!currentUser || repos.length === 0) {
      return { totalStars: 0, topLang: "N/A" };
    }
    const stars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

    const langCounts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });

    let topLang = "N/A";
    let maxCount = 0;
    for (const [lang, count] of Object.entries(langCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topLang = lang;
      }
    }

    return { totalStars: stars, topLang };
  }, [currentUser, repos]);

  const handleQuickSearch = useCallback(
    (user: string) => {
      searchUser(user);
    },
    [searchUser]
  );

  return (
    <ToastProvider swipeDirection="right">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 space-y-10 relative">
        
        {/* Orbes de iluminación ambiental Aurora (Fondos dinámicos de vidrio) */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10 select-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl animate-aurora" />
          <div className="absolute top-20 -right-32 h-[28rem] w-[28rem] rounded-full bg-purple-500/15 blur-3xl animate-aurora-slow" />
          <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        {/* Botón flotante de tema con micro-elevación */}
        <div className="fixed top-5 right-5 z-50">
          <ThemeToggle />
        </div>

        {/* Notificación Toast flotante para errores de red o cuota */}
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

        {/* Cabecera Hero Aurora */}
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
              defaultValue={currentUser?.login ?? "vercel"}
              loading={loading}
              onSearch={searchUser}
            />

            {/* Chips de sugerencias interactivas rápidas */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs text-[var(--text-muted)] pt-1">
              <span className="text-[11px] font-medium flex items-center gap-1 text-[var(--text-muted)]">
                <Sparkles className="h-3 w-3 text-indigo-500" />
                Sugerencias:
              </span>
              {SUGGESTED_USERS.map((user) => (
                <button
                  key={user}
                  type="button"
                  onClick={() => handleQuickSearch(user)}
                  disabled={loading}
                  aria-label={`Buscar usuario @${user}`}
                  className="rounded-full border border-[var(--glass-border-subtle)] bg-[var(--glass-bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)] backdrop-blur-md transition-all duration-200 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900"
                >
                  @{user}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* BENTO GRID ASIMÉTRICO DINÁMICO */}
        <main
          className="min-h-[32rem]"
          aria-busy={loading}
          aria-live="polite"
        >
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
                    {Array.from({ length: 4 }).map((_, i) => (
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
              
              {/* Módulo A (Columna Izquierda: Perfil vertical destacado) */}
              <div className="lg:col-span-4 lg:sticky lg:top-6">
                <UserProfile user={currentUser} />
              </div>

              {/* Módulos B y C (Columna Derecha: Bento Stats + Repositorios) */}
              <div className="lg:col-span-8 space-y-6 min-w-0">
                
                {/* Módulo B: Bloques Bento de Métricas Superiores */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Estrellas */}
                  <Card className="p-4 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-[var(--radius-xl)] group">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Estrellas
                      </span>
                      <div className="flex items-center justify-center h-7 w-7 rounded-[var(--radius-lg)] bg-amber-500/10 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-amber-500/30 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-3 min-w-0">
                      <div
                        className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-mono tabular-nums truncate"
                        title={`Total acumulado de estrellas: ${stats.totalStars.toLocaleString("es-ES")}`}
                      >
                        {stats.totalStars >= 100000
                          ? formatCompactNumber(stats.totalStars)
                          : stats.totalStars.toLocaleString("es-ES")}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                        Total acumulado
                      </p>
                    </div>
                  </Card>

                  {/* Repositorios */}
                  <Card className="p-4 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-[var(--radius-xl)] group min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Repositorios
                      </span>
                      <div className="flex items-center justify-center h-7 w-7 rounded-[var(--radius-lg)] bg-indigo-500/10 text-indigo-500">
                        <BookOpen className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-3 min-w-0">
                      <div
                        className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-mono tabular-nums truncate"
                        title={`Repositorios públicos: ${currentUser.public_repos.toLocaleString("es-ES")}`}
                      >
                        {currentUser.public_repos >= 100000
                          ? formatCompactNumber(currentUser.public_repos)
                          : currentUser.public_repos.toLocaleString("es-ES")}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                        Públicos indexados
                      </p>
                    </div>
                  </Card>

                  {/* Seguidores */}
                  <Card className="p-4 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-[var(--radius-xl)] group min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Seguidores
                      </span>
                      <div className="flex items-center justify-center h-7 w-7 rounded-[var(--radius-lg)] bg-emerald-500/10 text-emerald-500">
                        <Users className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-3 min-w-0">
                      <div
                        className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-mono tabular-nums truncate"
                        title={`Seguidores en comunidad: ${currentUser.followers.toLocaleString("es-ES")}`}
                      >
                        {currentUser.followers >= 100000
                          ? formatCompactNumber(currentUser.followers)
                          : currentUser.followers.toLocaleString("es-ES")}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                        En comunidad
                      </p>
                    </div>
                  </Card>

                  {/* Lenguaje Principal */}
                  <Card className="p-4 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-[var(--radius-xl)] group min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Lenguaje Top
                      </span>
                      <div className="flex items-center justify-center h-7 w-7 rounded-[var(--radius-lg)] bg-cyan-500/10 text-cyan-500">
                        <CodeXml className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-3 min-w-0">
                      <div
                        className="text-base sm:text-lg font-black text-[var(--text-primary)] truncate"
                        title={`Lenguaje predominante: ${stats.topLang}`}
                      >
                        {stats.topLang}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                        Predominante
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Módulo C: Cuadrícula Modular de Repositorios */}
                <Card className="p-5 sm:p-6 rounded-[var(--radius-2xl)]">
                  <RepoList repos={repos} />
                </Card>

              </div>
            </div>
          ) : error ? (
            <Card className="p-10 sm:p-12 text-center max-w-lg mx-auto rounded-[var(--radius-2xl)] space-y-4 border border-red-500/20 bg-[var(--glass-bg)] backdrop-blur-xl shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                <AlertCircle className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  No pudimos cargar el perfil
                </h2>
                <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                  {error} Comprueba que el usuario esté bien escrito o prueba con una de las sugerencias populares.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSearch("vercel")}
                  className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                >
                  Probar con @vercel
                </button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 sm:p-16 text-center max-w-md mx-auto rounded-[var(--radius-2xl)] space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Users className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Comienza a explorar
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Busca un desarrollador u organización de GitHub para desplegar sus métricas y repositorios en el Bento Grid interactivo.
              </p>
            </Card>
          )}
        </main>

        {/* Footer Minimalista de Alto Nivel */}
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
      </div>
    </ToastProvider>
  );
}
