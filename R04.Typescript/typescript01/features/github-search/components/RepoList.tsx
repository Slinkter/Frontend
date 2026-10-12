"use client";

import React from "react";
import {
  Star,
  GitFork,
  Calendar,
  Search,
  ArrowUpDown,
  ArrowUpRight,
  Sparkles,
  X,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { type GitHubRepo } from "@/features/github-search/api";
import { useRepoFilters, type SortOption } from "@/features/github-search/hooks";
import {
  formatDeterministicDate,
  formatCompactNumber,
} from "@/features/github-search/lib/formatters";
import { GITHUB_CONFIG, LANGUAGE_COLOR_MAP } from "@/features/github-search/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Badge,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
} from "@/components/ui";

/**
 * Properties for the {@link RepoList} component.
 */
export interface RepoListProps {
  /** Array of GitHub repositories to filter, sort, and render. */
  repos: GitHubRepo[];
}

/**
 * Properties for the internal {@link RepoCard} component.
 */
interface RepoCardProps {
  /** GitHub repository entity. */
  repo: GitHubRepo;
}

/**
 * Individual repository card displaying name, stars, forks, language pill,
 * and deterministic updated timestamp.
 */
const RepoCard = React.memo(function RepoCard({ repo }: RepoCardProps) {
  // Formateo determinista forzando UTC para evitar desajustes de hidratación SSR
  const formattedDate = formatDeterministicDate(repo.updated_at, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const langConfig = repo.language
    ? LANGUAGE_COLOR_MAP[repo.language] || {
        bg: "bg-slate-400",
        glow: "shadow-[0_0_8px_rgba(148,163,184,0.5)]",
      }
    : null;
  const isPopular = repo.stargazers_count >= GITHUB_CONFIG.UI.POPULAR_STAR_THRESHOLD;

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] hover:border-indigo-500/40 hover:shadow-xl hover:-translate-y-1 transition-[transform,border-color,background-color,box-shadow] duration-300 rounded-[var(--radius-xl)] min-w-0 [content-visibility:auto] [contain-intrinsic-size:auto_160px]">
      {/* Resplandor superior en hover */}
      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="p-4 space-y-2 min-w-0">
        <div className="flex items-start justify-between gap-2 min-w-0 w-full">
          <CardTitle className="text-sm font-bold tracking-tight truncate flex-1 min-w-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <a
              href={repo.html_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={repo.name}
              className="inline-flex items-center gap-1.5 truncate max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-sm"
            >
              <span className="truncate">{repo.name}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-[transform,opacity] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only"> (abre en una nueva pestaña)</span>
            </a>
          </CardTitle>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isPopular && (
              <Badge
                variant="aurora"
                size="sm"
                className="gap-1 uppercase text-[9px] font-bold text-amber-600 dark:text-amber-400 border-amber-500/30 shrink-0"
              >
                <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                <span>Top</span>
              </Badge>
            )}
            <Badge variant="secondary" size="sm" className="uppercase text-[9px] shrink-0">
              Público
            </Badge>
          </div>
        </div>

        <CardDescription className="line-clamp-2 text-xs min-h-[2rem] leading-relaxed break-words overflow-hidden">
          {repo.description?.trim() || "Sin descripción proporcionada para este repositorio."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-xs text-[var(--text-secondary)] mt-auto min-w-0 gap-2">
        <div className="flex items-center gap-2.5 min-w-0 shrink">
          {langConfig && repo.language && (
            <div
              className="flex items-center gap-1.5 max-w-[90px] sm:max-w-[110px] truncate shrink"
              title={`Lenguaje: ${repo.language}`}
            >
              <span
                className={`h-2 w-2 rounded-full shrink-0 ${langConfig.bg} ${langConfig.glow}`}
                aria-hidden="true"
              />
              <span className="text-[11px] font-medium truncate">{repo.language}</span>
            </div>
          )}

          <div
            className="flex items-center gap-1 text-[11px] font-mono tabular-nums text-[var(--text-secondary)] shrink-0"
            title={`Estrellas: ${repo.stargazers_count.toLocaleString("es-ES")}`}
          >
            <Star className="h-3 w-3 text-amber-500 fill-amber-500/20 shrink-0" aria-hidden="true" />
            <span>{formatCompactNumber(repo.stargazers_count)}</span>
          </div>

          <div
            className="flex items-center gap-1 text-[11px] font-mono tabular-nums text-[var(--text-muted)] shrink-0"
            title={`Forks: ${repo.forks_count.toLocaleString("es-ES")}`}
          >
            <GitFork className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>{formatCompactNumber(repo.forks_count)}</span>
          </div>
        </div>

        <div
          className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] shrink-0"
          title={`Última actualización: ${formattedDate}`}
        >
          <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
});

/**
 * High-performance repository list with inverted-index query filtering,
 * language segmentation, and progressive disclosure batching.
 */
function RepoListComponent({ repos }: RepoListProps): React.ReactElement {
  const {
    filterQuery,
    setFilterQuery,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy,
    languages,
    filteredRepos,
    displayedRepos,
    pageSize,
    hasMore,
    loadMore,
    showAll,
    resetFilters,
  } = useRepoFilters(repos);

  // Edge case: Usuario con 0 repositorios públicos en total
  if (repos.length === 0) {
    return (
      <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4">
        <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-500">
          <BookOpen className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h4 className="text-base font-bold text-[var(--text-primary)]">
            Sin repositorios públicos
          </h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Este desarrollador no tiene repositorios públicos disponibles en su perfil de GitHub en este momento.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de Filtros y Ordenamiento Bento */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--glass-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            Repositorios
          </h3>
          <Badge variant="aurora" size="default" className="font-mono text-xs">
            {filteredRepos.length === repos.length
              ? `${repos.length} total`
              : `${filteredRepos.length} de ${repos.length}`}
          </Badge>
        </div>

        {/* Controles accesibles: Input + Selects Radix */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Input de filtro instantáneo con botón de reset */}
          <div className="relative w-full sm:w-48">
            <Input
              placeholder="Filtrar por token..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-9 text-xs rounded-[var(--radius-lg)] pr-7"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Limpiar filtro"
                aria-label="Limpiar filtro"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Selector accesible de lenguaje */}
          {languages.length > 2 && (
            <div className="w-32 sm:w-36">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Lenguaje" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang === "All" ? "Todos los leng." : lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Selector accesible de ordenación */}
          <div className="w-32 sm:w-36">
            <Select
              value={sortBy}
              onValueChange={(val) => setSortBy(val as SortOption)}
            >
              <SelectTrigger>
                <div className="flex items-center gap-1.5 truncate">
                  <ArrowUpDown className="h-3 w-3 text-[var(--text-muted)] shrink-0" />
                  <SelectValue placeholder="Ordenar" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Recientes</SelectItem>
                <SelectItem value="stars">Más estrellas</SelectItem>
                <SelectItem value="forks">Más forks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid Bento Asimétrico de Tarjetas de Repositorio */}
      {filteredRepos.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500">
            <Search className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              No se encontraron repositorios
            </p>
            <p className="text-xs text-[var(--text-muted)] max-w-sm">
              No hay repositorios que coincidan con el filtro &quot;{filterQuery}&quot; o el lenguaje seleccionado.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="gap-1.5 text-xs rounded-[var(--radius-lg)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restablecer filtros</span>
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {displayedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          {/* Paginación progresiva para 100 repositorios */}
          {hasMore && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadMore}
                className="gap-2 text-xs rounded-[var(--radius-lg)] hover:border-indigo-500/40 cursor-pointer"
              >
                <span>Mostrar más repositorios</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  (+{Math.min(pageSize, filteredRepos.length - displayedRepos.length)} de {filteredRepos.length - displayedRepos.length} restantes)
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={showAll}
                className="text-xs rounded-[var(--radius-lg)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <span>Mostrar todos ({filteredRepos.length})</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const RepoList = React.memo(RepoListComponent);
export default RepoList;
