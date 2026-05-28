"use client";

import React from "react";
import { AlertCircle, Terminal } from "lucide-react";
import { useGitHubSearch } from "./hooks/useGitHubSearch";
import SearchInput from "./components/SearchInput";
import UserProfile from "./components/UserProfile";
import RepoList from "./components/RepoList";
import { ProfileSkeleton, RepoListSkeleton } from "./components/Skeleton";

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

import ThemeToggle from "./components/ThemeToggle";

export function GitHubSearchDashboard() {
  const {
    searchTerm,
    setSearchTerm,
    currentUser,
    repos,
    loading,
    error,
    validationError,
    setValidationError,
    searchUser,
  } = useGitHubSearch("vercel");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12 md:py-16 space-y-8 relative">
      
      {/* Botón flotante de cambio de tema */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Title Header */}
      <header className="flex flex-col items-center text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-3 py-1 text-xs font-medium text-slate-600 dark:text-zinc-400 select-none">
          <GithubIcon className="h-3.5 w-3.5" />
          <span>GitHub API Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight select-none text-slate-900 dark:text-zinc-50">
          Busca Desarrolladores
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md leading-relaxed">
          Explora perfiles de GitHub, sus métricas y repositorios más populares en tiempo real.
        </p>
      </header>

      {/* Search Bar Panel */}
      <div className="mx-auto max-w-lg w-full">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          validationError={validationError}
          setValidationError={setValidationError}
          loading={loading}
          onSearch={searchUser}
        />
      </div>

      {/* Main Content Layout Grid */}
      <main className="min-h-[30rem]">
        {loading ? (
          /* Loading State: Skeletons */
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <ProfileSkeleton />
            </div>
            <div className="md:col-span-2">
              <RepoListSkeleton />
            </div>
          </div>
        ) : error ? (
          /* Error State Panel */
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 p-6 text-center space-y-4 shadow-sm" role="alert" aria-live="assertive">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-900/20">
              <AlertCircle aria-hidden="true" className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-50 tracking-tight">Error de Consulta</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">{error}</p>
            </div>
            <button
              onClick={() => searchUser("vercel")}
              className="rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm select-none"
            >
              Restablecer a Vercel
            </button>
          </div>
        ) : currentUser ? (
          /* Success State: User found */
          <div className="grid gap-6 md:grid-cols-3 items-start">
            {/* Left side: Profile card (1/3 width) */}
            <div className="md:col-span-1 md:sticky md:top-6">
              <UserProfile user={currentUser} />
            </div>
            
            {/* Right side: Repo lists (2/3 width) */}
            <div className="md:col-span-2 rounded-2xl glass-panel p-4 sm:p-6">
              <RepoList repos={repos} />
            </div>
          </div>
        ) : (
          /* Fallback empty state */
          <div className="text-center py-20">
            <p className="text-sm text-slate-400 dark:text-zinc-600 font-medium">Busca un desarrollador para ver su perfil.</p>
          </div>
        )}
      </main>

      {/* Footer info banner */}
      <footer className="flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-400 dark:text-zinc-600 pt-8 uppercase tracking-widest select-none">
        <Terminal className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-600" />
        <span>Feature Based Architecture • React 19 • Tailwind v4 • Zod</span>
      </footer>
    </div>
  );
}
