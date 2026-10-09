/**
 * @file constants.ts
 * @description Constantes centralizadas para la funcionalidad de GitHub Search.
 * Cumple con Clean Code y DRY eliminando magic strings y números mágicos hardcodeados.
 */

export const GITHUB_CONFIG = {
  API_BASE_URL: "https://api.github.com",
  DEFAULT_USER: "vercel",
  SUGGESTED_USERS: ["vercel", "shadcn", "torvalds", "antfu", "leerob"] as const,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 24,
  },
  CACHE: {
    CAPACITY: 30,
    TTL_MS: 5 * 60 * 1000, // 5 minutos
  },
  CIRCUIT_BREAKER: {
    NAME: "github-api-circuit",
    FAILURE_THRESHOLD: 3,
    RESET_TIMEOUT_MS: 15_000,
    SUCCESS_THRESHOLD: 2,
  },
  NETWORK: {
    RETRIES: 2,
    BASE_DELAY_MS: 400,
    MAX_DELAY_MS: 4000,
    TIMEOUT_MS: 8000,
  },
} as const;

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
