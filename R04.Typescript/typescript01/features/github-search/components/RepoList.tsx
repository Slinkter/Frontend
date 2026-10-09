"use client";

import React, { useState, useMemo } from "react";
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
import { RepoSearchIndex } from "@/features/github-search/lib/RepoSearchIndex";
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

interface RepoListProps {
  repos: GitHubRepo[];
}

interface RepoCardProps {
  repo: GitHubRepo;
}

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
  const isPopular = repo.stargazers_count >= 50;

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] hover:border-indigo-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[var(--radius-xl)] min-w-0">
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
                className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

function RepoListComponent({ repos }: RepoListProps): React.ReactElement {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "forks">("updated");

  // 1. Construcción del índice de búsqueda sublineal O(log n + k)
  const searchIndex = useMemo(() => new RepoSearchIndex(repos), [repos]);

  // 2. Extraer lenguajes únicos
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) set.add(repo.language);
    });
    return ["All", ...Array.from(set)];
  }, [repos]);

  // 3. Pre-ordenamiento defensivo en O(n log n) con protección contra fechas inválidas
  const preSorted = useMemo(() => {
    const safeParseDate = (dateStr: string) => {
      const parsed = Date.parse(dateStr);
      return isNaN(parsed) ? 0 : parsed;
    };

    return {
      updated: [...repos].sort(
        (a, b) => safeParseDate(b.updated_at) - safeParseDate(a.updated_at)
      ),
      stars: [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count),
      forks: [...repos].sort((a, b) => b.forks_count - a.forks_count),
    };
  }, [repos]);

  // 4. Filtrado optimizado: índice invertido y filtro por lenguaje
  const filteredRepos = useMemo(() => {
    let result: GitHubRepo[];

    if (filterQuery.trim() === "") {
      result = preSorted[sortBy];
    } else {
      const matched = searchIndex.search(filterQuery);
      const safeParseDate = (dateStr: string) => {
        const parsed = Date.parse(dateStr);
        return isNaN(parsed) ? 0 : parsed;
      };

      result = matched.sort((a, b) => {
        if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
        if (sortBy === "forks") return b.forks_count - a.forks_count;
        return safeParseDate(b.updated_at) - safeParseDate(a.updated_at);
      });
    }

    if (selectedLanguage !== "All") {
      result = result.filter((r) => r.language === selectedLanguage);
    }

    return result;
  }, [searchIndex, filterQuery, selectedLanguage, sortBy, preSorted]);

  // 5. Carga progresiva y paginado para soportar 100+ repositorios de manera óptima
  const PAGE_SIZE = GITHUB_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;
  const [pageMultiplier, setPageMultiplier] = useState(1);
  const [prevFilterKey, setPrevFilterKey] = useState(`${filterQuery}:${selectedLanguage}:${sortBy}`);

  const currentFilterKey = `${filterQuery}:${selectedLanguage}:${sortBy}`;
  if (currentFilterKey !== prevFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setPageMultiplier(1);
  }

  const visibleCount = pageMultiplier * PAGE_SIZE;

  const displayedRepos = useMemo(() => {
    return filteredRepos.slice(0, visibleCount);
  }, [filteredRepos, visibleCount]);

  const resetFilters = () => {
    setFilterQuery("");
    setSelectedLanguage("All");
    setSortBy("updated");
  };

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
              onValueChange={(val) => setSortBy(val as "updated" | "stars" | "forks")}
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
          {filteredRepos.length > visibleCount && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageMultiplier((prev) => prev + 1)}
                className="gap-2 text-xs rounded-[var(--radius-lg)] hover:border-indigo-500/40 cursor-pointer"
              >
                <span>Mostrar más repositorios</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  (+{Math.min(PAGE_SIZE, filteredRepos.length - visibleCount)} de {filteredRepos.length - visibleCount} restantes)
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPageMultiplier(Math.ceil(filteredRepos.length / PAGE_SIZE))}
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
