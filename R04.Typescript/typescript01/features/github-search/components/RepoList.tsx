import React, { useState, useMemo } from "react";
import { Star, GitFork, Calendar, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { type GitHubRepo } from "@/features/github-search/api/githubSchema";

/**
 * @interface RepoListProps
 * @description Propiedades para el componente de listado de repositorios.
 */
interface RepoListProps {
  /** Colección de repositorios descargados y validados de la API de GitHub */
  repos: GitHubRepo[];
}

/**
 * @description Mapa estático de colores de lenguajes de programación alineado a la paleta oficial de GitHub.
 * Utiliza variables de Tailwind CSS para garantizar contraste visual en temas claro y oscuro.
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  HTML: "bg-orange-500",
  CSS: "bg-violet-500",
  Python: "bg-sky-400",
  Go: "bg-cyan-500",
  Rust: "bg-amber-600",
  Ruby: "bg-red-500",
  Java: "bg-amber-700",
  "C++": "bg-pink-500",
  C: "bg-gray-500",
  PHP: "bg-indigo-400",
  Swift: "bg-orange-600",
  Kotlin: "bg-purple-500",
  Shell: "bg-emerald-500",
};

/**
 * @component RepoList
 * @description Componente premium desacoplado que renderiza la lista de repositorios del usuario.
 * Proporciona capacidades dinámicas en tiempo real en el lado del cliente:
 * 1. Filtrado de texto reactivo sobre nombres de repositorio y descripciones.
 * 2. Filtrado dinámico por lenguaje de programación detectado de manera exclusiva.
 * 
 * @param {RepoListProps} props Propiedades del listado de repositorios.
 * @returns {React.ReactElement} Interfaz interactiva de repositorios en cuadrícula responsiva.
 */
export default function RepoList({ repos }: RepoListProps): React.ReactElement {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // Extrae de forma única todos los lenguajes presentes en el set de repositorios
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) {
        set.add(repo.language);
      }
    });
    return ["All", ...Array.from(set)];
  }, [repos]);

  // Filtra los repositorios basándose en el query de búsqueda de texto y en la opción de lenguaje
  const filteredRepos = useMemo(() => {
    const query = filterQuery.toLowerCase();
    
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query));
      const matchesLang = selectedLanguage === "All" || repo.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }, [repos, filterQuery, selectedLanguage]);

  return (
    <div className="space-y-6">
      {/* Cabecera del Listado y Elementos de Filtro */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <span>Repositorios populares</span>
          <span className="rounded-full border border-[var(--meta-border)] bg-[var(--meta-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--text-secondary)] shadow-sm">
            {repos.length}
          </span>
        </h3>

        {/* Panel de filtros interactivos en tiempo real */}
        <div className={`w-full sm:w-auto sm:flex sm:items-center sm:gap-2 ${languages.length > 2 ? 'grid grid-cols-2 gap-2' : 'flex'}`}>
          
          {/* Filtro de texto por nombre y descripción */}
          <div className="relative flex items-center group w-full sm:w-auto">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <label htmlFor="repo-filter-input" className="sr-only">Filtrar repositorios por nombre</label>
            <input
              id="repo-filter-input"
              type="text"
              placeholder="Filtrar por nombre..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="glass-input w-full rounded-xl py-2 pl-9 pr-4 text-xs sm:text-sm placeholder-[var(--text-muted)] outline-none sm:w-48 min-h-[40px] sm:min-h-[34px]"
            />
          </div>

          {/* Filtro de dropdown para lenguaje (solo si hay más de 2 lenguajes en total) */}
          {languages.length > 2 ? (
            <div className="relative flex items-center group w-full sm:w-auto">
              <SlidersHorizontal aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
              <label htmlFor="repo-language-select" className="sr-only">Filtrar por lenguaje de programación</label>
              <select
                id="repo-language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="glass-input w-full appearance-none rounded-xl py-2 pl-9 pr-8 text-xs sm:text-sm outline-none cursor-pointer sm:w-36 min-h-[40px] sm:min-h-[34px]"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-[var(--card-bg)] text-[var(--text-primary)] text-xs">
                    {lang === "All" ? "Cualquier leng." : lang}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
            </div>
          ) : null}
        </div>
      </div>

      {/* Listado en Cuadrícula Responsiva */}
      {filteredRepos.length === 0 ? (
        <div className="rounded-2xl border border-[var(--meta-border)] bg-[var(--meta-bg)] p-12 text-center shadow-sm">
          <p className="text-sm text-[var(--text-muted)] font-medium">No se encontraron repositorios que coincidan con la búsqueda.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {filteredRepos.slice(0, 30).map((repo) => {
            const formattedDate = new Date(repo.updated_at).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const langColorClass = repo.language ? LANGUAGE_COLORS[repo.language] || "bg-gray-400" : "bg-gray-400";

            return (
              <div
                key={repo.id}
                className="group relative flex flex-col justify-between rounded-xl border border-[var(--meta-border)] bg-[var(--card-bg)] hover:bg-[var(--meta-hover-bg)] active:scale-[0.99] p-4 transition-all duration-200 shadow-sm"
              >
                <div className="space-y-2">
                  {/* Encabezado: Nombre del Repo y Enlace Externo */}
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-[var(--text-primary)] tracking-tight group-hover:text-[var(--text-accent)] transition-colors truncate">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        {repo.name}
                      </a>
                    </h4>
                    <span className="rounded-full border border-[var(--meta-border)] bg-[var(--meta-bg)] px-2 py-0.5 text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-wide flex-shrink-0">
                      Público
                    </span>
                  </div>

                  {/* Descripción corta */}
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed min-h-[2rem]">
                    {repo.description || "Sin descripción proporcionada."}
                  </p>
                </div>

                {/* Fila inferior de estadísticas y metadatos */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-y-2 text-xs font-semibold text-[var(--text-secondary)] border-t border-[var(--meta-border)] pt-2.5">
                  {/* Estadísticas de lenguaje, estrellas y forks */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${langColorClass} flex-shrink-0`} />
                        <span className="text-xs text-[var(--text-secondary)] truncate">{repo.language}</span>
                      </div>
                    )}

                    {/* Estrellas */}
                    <div className="flex items-center gap-1 text-[var(--text-secondary)]" aria-label={`${repo.stargazers_count} estrellas`}>
                      <Star aria-hidden="true" className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
                      <span>{repo.stargazers_count}</span>
                    </div>

                    {/* Forks */}
                    <div className="flex items-center gap-1 text-[var(--text-secondary)]" aria-label={`${repo.forks_count} bifurcaciones`}>
                      <GitFork aria-hidden="true" className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Fecha de actualización */}
                  <div className="flex items-center gap-1 text-xs font-normal text-[var(--text-muted)] flex-shrink-0">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                    <span>Act. {formattedDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
