import React, { useState, useMemo } from "react";
import { Star, GitFork, Calendar, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { type GitHubRepo } from "../api/githubSchema";

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
  TypeScript: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
  JavaScript: "bg-yellow-400 dark:bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
  HTML: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]",
  CSS: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]",
  Python: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]",
  Go: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
  Rust: "bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]",
  Ruby: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  Java: "bg-amber-700 shadow-[0_0_8px_rgba(180,83,9,0.5)]",
  "C++": "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]",
  C: "bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.5)]",
  PHP: "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]",
  Swift: "bg-orange-600 shadow-[0_0_8px_rgba(234,88,12,0.5)]",
  Kotlin: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]",
  Shell: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
};

/**
 * @component RepoList
 * @description Componente premium desacoplado que renderiza la lista de repositorios del usuario.
 * Proporciona capacidades dinámicas en tiempo real en el lado del cliente:
 * 1. Filtrado de texto reactivo sobre nombres de repositorio y descripciones.
 * 2. Filtrado dinámico por lenguaje de programación detectado de manera exclusiva.
 * 3. Total adaptabilidad a Light Theme y Dark Theme mediante variables CSS y clases `glass-input` y `glass-panel`.
 * 
 * @lifecycle Ciclo de Vida del Componente:
 * - **Montaje (Mounting)**: Recibe el prop `repos`. Genera la lista única de lenguajes disponibles con un `useMemo` inicial.
 * - **Renderizado Reactivo (Re-renders)**: Cada vez que el usuario escribe en el buscador de repositorios o cambia la
 *   selección del lenguaje, los estados locales `filterQuery` y `selectedLanguage` se actualizan.
 * - **Optimización Computacional**: `filteredRepos` recalcula las coincidencias optimizadamente mediante un `useMemo`
 *   para evitar demoras en perfiles con gran cantidad de repositorios.
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
        <h3 className="text-lg font-bold text-theme-primary tracking-tight flex items-center gap-2">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/75 bg-clip-text text-transparent transition-colors duration-500">
            Repositorios populares
          </span>
          <span className="rounded-full border border-violet-500/10 dark:border-white/10 bg-violet-500/5 dark:bg-white/5 px-2.5 py-0.5 text-xs font-bold text-violet-600 dark:text-cyan-400 shadow-sm transition-colors duration-500">
            {repos.length}
          </span>
        </h3>

        {/* Panel de filtros interactivos en tiempo real */}
        <div className={`w-full sm:w-auto sm:flex sm:items-center sm:gap-2 ${languages.length > 2 ? 'grid grid-cols-2 gap-2' : 'flex'}`}>
          
          {/* Filtro de texto por nombre y descripción */}
          <div className="relative flex items-center group w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-muted group-focus-within:text-violet-600 dark:group-focus-within:text-cyan-400 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Filtrar por nombre..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="glass-input w-full rounded-xl py-1.5 pl-9 pr-4 text-xs placeholder-slate-400/50 dark:placeholder-white/20 backdrop-blur-md outline-none transition-all duration-300 sm:w-48"
            />
          </div>

          {/* Filtro de dropdown para lenguaje (solo si hay más de 2 lenguajes en total) */}
          {languages.length > 2 && (
            <div className="relative flex items-center group w-full sm:w-auto">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted pointer-events-none group-focus-within:text-violet-600 dark:group-focus-within:text-cyan-400 transition-colors duration-300" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="glass-input w-full appearance-none rounded-xl py-1.5 pl-9 pr-8 text-xs outline-none backdrop-blur-md cursor-pointer transition-all duration-300 sm:w-36"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-slate-50 dark:bg-[#0f0e1a] text-slate-900 dark:text-white text-xs">
                    {lang === "All" ? "Cualquier leng." : lang}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted pointer-events-none group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors duration-300" />
            </div>
          )}
        </div>
      </div>

      {/* Listado en Cuadrícula Responsiva */}
      {filteredRepos.length === 0 ? (
        <div className="rounded-2xl border border-[var(--meta-border)] bg-[var(--meta-bg)] p-12 text-center backdrop-blur-md transition-colors duration-500">
          <p className="text-sm text-theme-muted font-medium">No se encontraron repositorios que coincidan con la búsqueda.</p>
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
                className="group relative flex flex-col justify-between rounded-xl border border-[var(--meta-border)] bg-[var(--meta-bg)] hover:bg-[var(--meta-hover-bg)] p-3.5 sm:p-4.5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] shadow-lg hover:shadow-[0_10px_25px_var(--glow-1)] overflow-hidden"
              >
                {/* Línea sutil de brillo en la parte superior visible en hover */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="space-y-2.5">
                  {/* Encabezado: Nombre del Repo y Enlace Externo */}
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-theme-primary tracking-tight group-hover:text-violet-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        {repo.name}
                      </a>
                    </h4>
                    <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[9px] font-bold text-violet-600 dark:text-violet-300 uppercase tracking-wide flex-shrink-0">
                      Público
                    </span>
                  </div>

                  {/* Descripción corta */}
                  <p className="text-xs text-theme-secondary line-clamp-2 leading-relaxed min-h-[2rem] transition-colors duration-500">
                    {repo.description || "Sin descripción proporcionada."}
                  </p>
                </div>

                {/* Fila inferior de estadísticas y metadatos */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-y-2 text-[9px] min-[400px]:text-[10px] font-semibold text-theme-muted border-t border-[var(--meta-border)] pt-2.5 transition-colors duration-500">
                  {/* Estadísticas de lenguaje, estrellas y forks */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {repo.language && (
                      <div className="flex items-center gap-1 bg-slate-900/[0.02] dark:bg-white/2 px-1.5 py-0.5 rounded-full border border-[var(--meta-border)] max-w-[85px] sm:max-w-none transition-colors duration-500">
                        <span className={`h-2 w-2 rounded-full ${langColorClass} shadow-sm flex-shrink-0`} />
                        <span className="text-[8.5px] font-bold text-theme-muted truncate">{repo.language}</span>
                      </div>
                    )}

                    {/* Estrellas */}
                    <div className="flex items-center gap-1 group/star cursor-pointer hover:text-yellow-500 transition-colors">
                      <Star className="h-3.5 w-3.5 text-yellow-500/80 group-hover/star:scale-125 transition-transform" />
                      <span>{repo.stargazers_count}</span>
                    </div>

                    {/* Forks */}
                    <div className="flex items-center gap-1 group/fork cursor-pointer hover:text-violet-600 dark:hover:text-cyan-400 transition-colors">
                      <GitFork className="h-3.5 w-3.5 text-violet-500/60 dark:text-cyan-400/80 group-hover/fork:scale-125 transition-transform" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Fecha de actualización */}
                  <div className="flex items-center gap-1 text-[8.5px] min-[400px]:text-[9px] font-medium text-theme-muted flex-shrink-0 transition-colors duration-500">
                    <Calendar className="h-3 w-3" />
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
