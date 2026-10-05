/**
 * @file formatters.ts
 * @description Utilidades defensivas de formateo, sanitización y prevención de desajustes SSR.
 */

/**
 * Formatea una fecha ISO de manera determinista forzando la zona horaria UTC.
 * Esto erradica por completo los desajustes de hidratación (SSR Hydration Errors)
 * entre el servidor Node.js y el navegador del cliente en cualquier zona horaria del mundo.
 */
export function formatDeterministicDate(
  isoDateString?: string | null,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  if (!isoDateString || typeof isoDateString !== "string") {
    return "N/A";
  }

  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    return "N/A";
  }

  try {
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
 * Formato compacto y seguro para conteos numéricos elevados (ej. 154.2K, 2.5M).
 * Previene el desbordamiento horizontal de texto en tarjetas y Bento blocks.
 */
export function formatCompactNumber(num?: number | null): string {
  if (num === null || num === undefined || typeof num !== "number" || isNaN(num)) {
    return "0";
  }

  if (num < 10000) {
    return num.toLocaleString("es-ES");
  }

  try {
    return new Intl.NumberFormat("es-ES", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(num);
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
 * Sanitiza y normaliza la entrada del usuario para búsquedas de GitHub:
 * - Elimina prefijos '@' accidentales (ej. '@vercel' -> 'vercel').
 * - Extrae el handle si el usuario pega una URL de GitHub (ej. 'https://github.com/torvalds' -> 'torvalds').
 * - Recorta espacios en blanco laterales.
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
 * Valida y formatea URLs externas para perfiles o sitios web.
 * Neutraliza vectores de ataque pseudo-protocolos como 'javascript:' o 'data:'.
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
