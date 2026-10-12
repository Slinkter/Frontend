/**
 * @file formatters.ts
 * @description Utilidades defensivas de formateo, sanitización y prevención de desajustes SSR.
 */

const defaultDateFormatter = new Intl.DateTimeFormat("es-ES", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const compactNumberFormatter = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

const standardNumberFormatter = new Intl.NumberFormat("es-ES");

/**
 * Formats an ISO 8601 date string deterministically forcing the UTC timezone.
 * Eradicates SSR hydration mismatch errors between server and client.
 *
 * @param isoDateString - Raw ISO date string (e.g. from GitHub API).
 * @param options - Optional Intl DateTime format options.
 * @returns Formatted date string in es-ES locale or "N/A" on invalid date.
 *
 * @example
 * ```ts
 * formatDeterministicDate("2020-01-15T00:00:00Z"); // "15 ene 2020"
 * ```
 */
export function formatDeterministicDate(
  isoDateString?: string | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!isoDateString || typeof isoDateString !== "string") {
    return "N/A";
  }

  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    return "N/A";
  }

  try {
    if (!options) {
      return defaultDateFormatter.format(date);
    }
    return new Intl.DateTimeFormat("es-ES", {
      ...options,
      timeZone: "UTC",
    }).format(date);
  } catch {
    // Respaldo determinista manual ante entornos con soporte ICU restringido
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  }
}

/**
 * Compact number formatting for high counts (e.g. 154.2k, 2.5M).
 * Prevents text overflow in stat badges and Bento cards.
 *
 * @param num - Raw integer or float to format.
 * @returns Compacted string representation or "0".
 *
 * @example
 * ```ts
 * formatCompactNumber(12500); // "12,5 mil" (or "12.5k")
 * ```
 */
export function formatCompactNumber(num?: number | null): string {
  if (num === null || num === undefined || typeof num !== "number" || isNaN(num)) {
    return "0";
  }

  if (num < 10000) {
    return standardNumberFormatter.format(num);
  }

  try {
    return compactNumberFormatter.format(num);
  } catch {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return String(num);
  }
}

/**
 * Sanitizes and normalizes user input for GitHub searches:
 * - Strips leading '@' handles (e.g. '@vercel' -> 'vercel').
 * - Extracts login handle from raw GitHub URLs.
 * - Trims extraneous whitespace.
 *
 * @param input - Raw text typed or pasted by the user.
 * @returns Cleaned username string.
 *
 * @example
 * ```ts
 * sanitizeUsernameInput("  @torvalds "); // "torvalds"
 * sanitizeUsernameInput("https://github.com/facebook"); // "facebook"
 * ```
 */
export function sanitizeUsernameInput(input: string): string {
  if (!input) return "";

  let cleaned = input.trim();

  // Si pegaron una URL de GitHub completa
  const urlMatch = cleaned.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  if (urlMatch && urlMatch[1]) {
    cleaned = urlMatch[1];
  }

  // Eliminar arroba(s) al inicio
  cleaned = cleaned.replace(/^@+/, "").trim();

  return cleaned;
}

/**
 * Validates and sanitizes external URLs for user profiles and links.
 * Blocks dangerous schemes such as `javascript:`, `data:`, or `vbscript:`.
 *
 * @param url - Candidate external URL.
 * @returns Safe HTTPS/HTTP URL string or null if unsafe/empty.
 *
 * @example
 * ```ts
 * getSafeExternalUrl("example.com"); // "https://example.com"
 * getSafeExternalUrl("javascript:alert(1)"); // null
 * ```
 */
export function getSafeExternalUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Bloquear esquemas maliciosos
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return null;
  }

  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return trimmed;
  }

  // Si no tiene esquema, asumir https://
  return `https://${trimmed}`;
}

/**
 * Aggregated statistics calculated from a repository collection.
 */
export interface RepoStatistics {
  /** Sum of stargazers across all repositories. */
  totalStars: number;
  /** Predominant programming language. */
  topLang: string;
}

/**
 * Pure function computing aggregate metrics from a list of repositories.
 *
 * @param repos - Array of repositories with stars count and language.
 * @returns Total star count and predominant primary language.
 */
export function calculateRepoStatistics(
  repos: Array<{ stargazers_count: number; language?: string | null }>
): RepoStatistics {
  if (!repos || repos.length === 0) {
    return { totalStars: 0, topLang: "N/A" };
  }

  let totalStars = 0;
  const langCounts: Record<string, number> = {};

  for (const repo of repos) {
    totalStars += repo.stargazers_count ?? 0;
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  }

  let topLang = "N/A";
  let maxCount = 0;
  for (const [lang, count] of Object.entries(langCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topLang = lang;
    }
  }

  return { totalStars, topLang };
}
