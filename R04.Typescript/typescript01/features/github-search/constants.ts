/**
 * @file constants.ts
 * @description Constantes centralizadas para la funcionalidad de GitHub Search.
 * Cumple con Clean Code y DRY eliminando magic strings y números mágicos hardcodeados.
 */

/**
 * Parámetros globales y de infraestructura para la integración con GitHub API.
 */
export const GITHUB_CONFIG = {
  /** URL base oficial de la REST API de GitHub */
  API_BASE_URL: "https://api.github.com",
  /** Nombre de usuario predeterminado cargado en el arranque o SSR inicial */
  DEFAULT_USER: "vercel",
  /** Lista inmutable de usuarios populares para sugerencias en el buscador */
  SUGGESTED_USERS: ["vercel", "shadcn", "torvalds", "antfu", "leerob"] as const,
  /** Parámetros de paginación para la lista de repositorios */
  PAGINATION: {
    /** Número de elementos cargados por cada paso de paginación progresiva */
    DEFAULT_PAGE_SIZE: 24,
  },
  /** Parámetros de la memoria caché LRU */
  CACHE: {
    /** Cantidad máxima de entradas conservadas en memoria */
    CAPACITY: 30,
    /** Tiempo de vida útil en milisegundos (5 minutos) */
    TTL_MS: 5 * 60 * 1000,
  },
  /** Parámetros de configuración del Circuit Breaker */
  CIRCUIT_BREAKER: {
    /** Identificador del circuito */
    NAME: "github-api-circuit",
    /** Número de fallos consecutivos antes de abrir el circuito */
    FAILURE_THRESHOLD: 3,
    /** Tiempo de espera en milisegundos antes del estado HALF_OPEN (15s) */
    RESET_TIMEOUT_MS: 15_000,
    /** Éxitos requeridos en HALF_OPEN para cerrar nuevamente el circuito */
    SUCCESS_THRESHOLD: 2,
  },
  /** Parámetros de resiliencia y reintentos de red */
  NETWORK: {
    /** Intentos máximos de reintento ante fallos transitorios 5xx */
    RETRIES: 2,
    /** Retardo base en milisegundos para backoff */
    BASE_DELAY_MS: 400,
    /** Retardo máximo en milisegundos */
    MAX_DELAY_MS: 4000,
    /** Tiempo límite antes de abortar la petición por timeout */
    TIMEOUT_MS: 8000,
  },
  /** Parámetros de presentación y UX/UI */
  UI: {
    /** Cantidad mínima de estrellas para considerar un repositorio como popular */
    POPULAR_STAR_THRESHOLD: 50,
    /** Umbral a partir del cual las métricas usan notación compacta (ej. 100K) */
    COMPACT_METRICS_THRESHOLD: 100_000,
    /** Cantidad de tarjetas de esqueleto mostradas durante la carga de métricas */
    SKELETON_METRICS_COUNT: 4,
    /** Clave de persistencia para el tema en localStorage */
    STORAGE_THEME_KEY: "theme",
  },
} as const;

/**
 * Mapeo cromático oficial de lenguajes de programación a clases de Tailwind CSS.
 * Cada entrada define el color de fondo y el efecto de resplandor (glow).
 */
export const LANGUAGE_COLOR_MAP: Record<string, { bg: string; glow: string }> = {
  TypeScript: { bg: "bg-blue-500", glow: "shadow-[0_0_8px_rgba(59,130,246,0.6)]" },
  JavaScript: { bg: "bg-amber-400", glow: "shadow-[0_0_8px_rgba(251,191,36,0.6)]" },
  HTML: { bg: "bg-orange-500", glow: "shadow-[0_0_8px_rgba(249,115,22,0.6)]" },
  CSS: { bg: "bg-violet-500", glow: "shadow-[0_0_8px_rgba(139,92,246,0.6)]" },
  Python: { bg: "bg-sky-400", glow: "shadow-[0_0_8px_rgba(56,189,248,0.6)]" },
  Go: { bg: "bg-cyan-500", glow: "shadow-[0_0_8px_rgba(6,182,212,0.6)]" },
  Rust: { bg: "bg-amber-600", glow: "shadow-[0_0_8px_rgba(217,119,6,0.6)]" },
  Ruby: { bg: "bg-rose-500", glow: "shadow-[0_0_8px_rgba(244,63,94,0.6)]" },
  Java: { bg: "bg-amber-700", glow: "shadow-[0_0_8px_rgba(180,83,9,0.6)]" },
  "C++": { bg: "bg-pink-500", glow: "shadow-[0_0_8px_rgba(236,72,153,0.6)]" },
  C: { bg: "bg-slate-500", glow: "shadow-[0_0_8px_rgba(100,116,139,0.6)]" },
  PHP: { bg: "bg-indigo-400", glow: "shadow-[0_0_8px_rgba(129,140,248,0.6)]" },
  Swift: { bg: "bg-orange-600", glow: "shadow-[0_0_8px_rgba(234,88,12,0.6)]" },
  Kotlin: { bg: "bg-purple-500", glow: "shadow-[0_0_8px_rgba(168,85,247,0.6)]" },
  Shell: { bg: "bg-emerald-500", glow: "shadow-[0_0_8px_rgba(16,185,129,0.6)]" },
};
