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
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-4 py-6 sm:py-10 md:py-16 space-y-6 sm:space-y-8 animate-in fade-in duration-700 relative">
      
      {/* Botón premium flotante de cambio de tema (Claro / Oscuro) */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Title Header */}
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 dark:border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.08)] dark:shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-violet-500/40 dark:hover:border-violet-500/50 hover:bg-violet-500/15 dark:hover:bg-violet-900/25 transition-all duration-300 group cursor-default select-none">
          <GithubIcon className="h-3.5 w-3.5 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-500" />
          <span>GitHub API Explorer</span>
        </div>
        <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight select-none">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent bg-gradient-animate transition-all duration-500">
            Busca Desarrolladores
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-theme-muted max-w-md leading-relaxed transition-colors duration-500">
          Explora perfiles de GitHub, sus métricas y repositorios más populares en tiempo real con tipado de extremo a extremo.
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
          <div className="mx-auto max-w-md rounded-2xl border border-red-500/20 dark:border-red-500/25 bg-red-500/5 dark:bg-red-950/20 p-6 backdrop-blur-xl text-center space-y-4 animate-in zoom-in-95 duration-300 shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-colors duration-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <AlertCircle className="h-6 w-6 text-red-400 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Error de Consulta</h3>
              <p className="text-xs text-slate-600 dark:text-white/65 leading-relaxed font-medium transition-colors duration-500">{error}</p>
            </div>
            <button
              onClick={() => searchUser("vercel")}
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4.5 py-2 text-xs font-semibold text-slate-700 dark:text-white/80 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-md select-none"
            >
              Restablecer a Vercel
            </button>
          </div>
        ) : currentUser ? (
          /* Success State: User found */
          <div className="grid gap-6 md:grid-cols-3 items-start animate-in fade-in slide-in-from-bottom-3 duration-500">
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
          <div className="text-center py-20 animate-in fade-in duration-300">
            <p className="text-sm text-theme-muted font-medium transition-colors duration-500">Busca un desarrollador para ver su perfil.</p>
          </div>
        )}
      </main>

      {/* Footer info banner */}
      <footer className="flex items-center justify-center gap-2 text-4xs font-bold text-slate-400/30 dark:text-white/20 pt-8 uppercase tracking-widest select-none transition-colors duration-500">
        <Terminal className="h-3.5 w-3.5 text-violet-500/30 dark:text-violet-500/50 transition-colors duration-500" />
        <span>Feature Based Architecture • React 19 • Tailwind v4 • Zod</span>
      </footer>
    </div>
  );
}
