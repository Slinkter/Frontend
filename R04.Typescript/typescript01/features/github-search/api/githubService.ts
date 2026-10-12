/**
 * @file githubService.ts
 * @description Capa de servicio desacoplada para la API de GitHub.
 * Integra validación estricta Zod, caché LRU O(1) con TTL, reintentos con backoff exponencial
 * con Full Jitter y protección mediante Circuit Breaker contra saturación de cuota y caídas de red.
 */

import { cache } from "react";
import {
  GitHubUserSchema,
  GitHubRepoSchema,
  GitHubRepoListSchema,
  GitHubApiErrorResponseSchema,
  type GitHubUser,
  type GitHubRepo,
  type GitHubRateLimitInfo,
} from "./githubSchema";
import { LRUCache } from "../lib/LRUCache";
import { CircuitBreaker, CircuitBreakerOpenError } from "../lib/CircuitBreaker";
import { fetchWithResilience } from "../lib/backoff";
import { GITHUB_CONFIG } from "../constants";

// ==========================================
// INTERFAZ DE SERVICIO (DIP - Dependency Inversion Principle)
// ==========================================

/**
 * Service contract interface for interacting with GitHub data resources.
 */
export interface IGitHubService {
  /**
   * Fetches user profile by username handle.
   *
   * @param username - GitHub login handle.
   * @param signal - Optional AbortSignal.
   * @returns User profile.
   */
  getUser(username: string, signal?: AbortSignal): Promise<GitHubUser>;

  /**
   * Fetches list of public repositories for a user.
   *
   * @param username - GitHub login handle.
   * @param signal - Optional AbortSignal.
   * @returns Array of repository items.
   */
  getUserRepos(username: string, signal?: AbortSignal): Promise<GitHubRepo[]>;
}

// ==========================================
// JERARQUÍA DE ERRORES TIPADOS (TYPE-SAFE)
// ==========================================

/**
 * Base domain error for GitHub API operations.
 */
export class GitHubApiError extends Error {
  /** HTTP status code if originated from an HTTP response. */
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

/**
 * Error thrown when a requested GitHub user or repository is not found (404).
 */
export class GitHubNotFoundError extends GitHubApiError {
  constructor(resource = "Usuario") {
    super(`${resource} de GitHub no encontrado.`, 404);
    this.name = "GitHubNotFoundError";
  }
}

/**
 * Error thrown when GitHub rate limit quota is exceeded (403 / 429).
 */
export class GitHubRateLimitError extends GitHubApiError {
  /** Parsed rate limit headers from the response. */
  public readonly rateLimitInfo?: GitHubRateLimitInfo;

  constructor(message: string, status = 403, rateLimitInfo?: GitHubRateLimitInfo) {
    super(message, status);
    this.name = "GitHubRateLimitError";
    this.rateLimitInfo = rateLimitInfo;
  }
}

/**
 * Error thrown when the circuit breaker enters the OPEN state.
 */
export class GitHubCircuitBreakerError extends GitHubApiError {
  /** Estimated milliseconds until retry is permitted. */
  public readonly retryAfterMs: number;

  constructor(message: string, retryAfterMs: number) {
    super(message, 503);
    this.name = "GitHubCircuitBreakerError";
    this.retryAfterMs = retryAfterMs;
  }
}

/**
 * Error thrown when incoming GitHub API data fails schema validation.
 */
export class GitHubValidationError extends GitHubApiError {
  /** Zod validation issue details. */
  public readonly validationIssues: unknown;

  constructor(message: string, validationIssues?: unknown) {
    super(message, 422);
    this.name = "GitHubValidationError";
    this.validationIssues = validationIssues;
  }
}

// ==========================================
// CONFIGURACIÓN Y CLIENTE DE LA API
// ==========================================

/**
 * Configuration options for customizing a {@link GitHubApiClient}.
 */
export interface GitHubApiClientOptions {
  /** Override base URL for GitHub API. */
  baseUrl?: string;
  /** Max cached entries for users and repos. */
  cacheCapacity?: number;
  /** Cache time-to-live in milliseconds. */
  cacheTtlMs?: number;
  /** Number of consecutive 5xx errors before tripping circuit breaker. */
  circuitBreakerFailureThreshold?: number;
  /** Cooldown time in ms before probing circuit recovery. */
  circuitBreakerResetTimeoutMs?: number;
  /** Maximum retry attempts with backoff. */
  retries?: number;
  /** Base delay in ms before exponential backoff. */
  baseDelayMs?: number;
  /** Individual request timeout in ms. */
  timeoutMs?: number;
}

/**
 * Resilient API client for GitHub REST endpoints.
 * Integrates Zod schema validation, LRU caching, exponential backoff with full jitter,
 * and circuit breaking.
 *
 * @example
 * ```ts
 * const client = new GitHubApiClient();
 * const user = await client.getUser("octocat");
 * const repos = await client.getUserRepos("octocat");
 * ```
 */
export class GitHubApiClient implements IGitHubService {
  private readonly baseUrl: string;
  private readonly userCache: LRUCache<string, GitHubUser>;
  private readonly reposCache: LRUCache<string, GitHubRepo[]>;
  private readonly circuitBreaker: CircuitBreaker;
  private readonly retries: number;
  private readonly baseDelayMs: number;
  private readonly timeoutMs: number;

  constructor(options: GitHubApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? GITHUB_CONFIG.API_BASE_URL;
    const cacheCapacity = options.cacheCapacity ?? GITHUB_CONFIG.CACHE.CAPACITY;
    const cacheTtlMs = options.cacheTtlMs ?? GITHUB_CONFIG.CACHE.TTL_MS;

    this.userCache = new LRUCache<string, GitHubUser>({
      capacity: cacheCapacity,
      defaultTtlMs: cacheTtlMs,
    });

    this.reposCache = new LRUCache<string, GitHubRepo[]>({
      capacity: cacheCapacity,
      defaultTtlMs: cacheTtlMs,
    });

    this.circuitBreaker = new CircuitBreaker({
      name: GITHUB_CONFIG.CIRCUIT_BREAKER.NAME,
      failureThreshold:
        options.circuitBreakerFailureThreshold ?? GITHUB_CONFIG.CIRCUIT_BREAKER.FAILURE_THRESHOLD,
      resetTimeoutMs:
        options.circuitBreakerResetTimeoutMs ?? GITHUB_CONFIG.CIRCUIT_BREAKER.RESET_TIMEOUT_MS,
      successThreshold: GITHUB_CONFIG.CIRCUIT_BREAKER.SUCCESS_THRESHOLD,
    });

    this.retries = options.retries ?? GITHUB_CONFIG.NETWORK.RETRIES;
    this.baseDelayMs = options.baseDelayMs ?? GITHUB_CONFIG.NETWORK.BASE_DELAY_MS;
    this.timeoutMs = options.timeoutMs ?? GITHUB_CONFIG.NETWORK.TIMEOUT_MS;
  }

  /**
   * Extrae y analiza los encabezados de cuota (Rate Limit) de GitHub.
   */
  public extractRateLimitInfo(headers: Headers): GitHubRateLimitInfo | null {
    const limitHeader = headers.get("x-ratelimit-limit");
    const remainingHeader = headers.get("x-ratelimit-remaining");
    const resetHeader = headers.get("x-ratelimit-reset");

    if (!limitHeader || !remainingHeader || !resetHeader) {
      return null;
    }

    const limit = parseInt(limitHeader, 10);
    const remaining = parseInt(remainingHeader, 10);
    const resetEpoch = parseInt(resetHeader, 10);
    const resetDate = new Date(resetEpoch * 1000);

    const usedHeader = headers.get("x-ratelimit-used");
    const used = usedHeader ? parseInt(usedHeader, 10) : undefined;

    return {
      limit,
      remaining,
      resetEpochSeconds: resetEpoch,
      resetDate,
      used,
    };
  }

  /**
   * Ejecuta una petición HTTP a la API de GitHub garantizando resiliencia y tipado estricto.
   */
  private async executeRequest(endpoint: string, signal?: AbortSignal): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      return await this.circuitBreaker.execute(async () => {
        const response = await fetchWithResilience(
          url,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "GitHub-Explorer-Client",
            },
          },
          {
            retries: this.retries,
            baseDelayMs: this.baseDelayMs,
            timeoutMs: this.timeoutMs,
            signal,
            shouldRetry: (_error, resp) => {
              // No reintentar si el rate limit está completamente agotado
              if (resp) {
                const remaining = resp.headers.get("x-ratelimit-remaining");
                if (remaining === "0") {
                  return false;
                }
              }
              return true;
            },
          }
        );

        // Si el estado es 5xx, arrojar para activar conteo en CircuitBreaker
        if (response.status >= 500) {
          throw new GitHubApiError(
            `Fallo en el servidor de GitHub (HTTP ${response.status}).`,
            response.status
          );
        }

        return response;
      });
    } catch (error: unknown) {
      if (error instanceof CircuitBreakerOpenError) {
        throw new GitHubCircuitBreakerError(error.message, error.retryAfterMs);
      }
      throw error;
    }
  }

  /**
   * Procesa la respuesta de error de GitHub e infiere detalles como tiempo de reset de cuota.
   */
  private async handleErrorResponse(response: Response, resourceName: string): Promise<never> {
    const rateLimit = this.extractRateLimitInfo(response.headers);

    // 1. Manejo específico de Not Found (404)
    if (response.status === 404) {
      throw new GitHubNotFoundError(resourceName);
    }

    // 2. Manejo de Rate Limit Excedido (403 / 429)
    if (response.status === 403 || response.status === 429) {
      let resetMsg = "Intenta nuevamente en unos minutos.";
      if (rateLimit) {
        const timeString = rateLimit.resetDate.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        resetMsg = `Límite restablecido a las ${timeString}.`;
      }

      // Si el límite se agotó, podemos abrir temporalmente el circuito para evitar spam inútil
      const cooldownMs = rateLimit
        ? Math.min(Math.max(1000, rateLimit.resetDate.getTime() - Date.now()), 60000)
        : 15000;
      this.circuitBreaker.trip(cooldownMs);

      throw new GitHubRateLimitError(
        `Límite de solicitudes de la API de GitHub alcanzado. ${resetMsg}`,
        response.status,
        rateLimit ?? undefined
      );
    }

    // 3. Intento de extracción del cuerpo JSON de error provisto por GitHub
    let detailedMessage: string | null = null;
    try {
      const errorJson = await response.json();
      const parsedError = GitHubApiErrorResponseSchema.safeParse(errorJson);
      if (parsedError.success) {
        detailedMessage = parsedError.data.message;
      }
    } catch {
      // Ignorar fallo al leer body si ya no es legible
    }

    throw new GitHubApiError(
      detailedMessage || `Error de la API de GitHub (${response.statusText || response.status}).`,
      response.status
    );
  }

  /**
   * Obtiene el perfil de un usuario de GitHub con caché LRU O(1), Zod y protección de resiliencia.
   */
  public async getUser(username: string, signal?: AbortSignal): Promise<GitHubUser> {
    const normalizedKey = username.toLowerCase().trim();
    if (!normalizedKey) {
      throw new GitHubApiError("El nombre de usuario no puede estar vacío.", 400);
    }

    // Búsqueda en Caché LRU O(1) con validación de TTL
    const cached = this.userCache.get(normalizedKey);
    if (cached) {
      return cached;
    }

    const response = await this.executeRequest(
      `/users/${encodeURIComponent(normalizedKey)}`,
      signal
    );

    if (!response.ok) {
      await this.handleErrorResponse(response, "Usuario");
    }

    const data: unknown = await response.json();
    const parsed = GitHubUserSchema.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Schema Validation Failure for GitHub User:", parsed.error);
      throw new GitHubValidationError(
        "Los datos devueltos por GitHub no cumplen con el esquema de usuario esperado.",
        parsed.error.issues
      );
    }

    // Almacenar en caché LRU
    this.userCache.set(normalizedKey, parsed.data);
    return parsed.data;
  }

  /**
   * Obtiene los repositorios públicos de un usuario con caché LRU O(1) y protección de cuota.
   */
  public async getUserRepos(username: string, signal?: AbortSignal): Promise<GitHubRepo[]> {
    const normalizedKey = username.toLowerCase().trim();
    if (!normalizedKey) {
      return [];
    }

    // Búsqueda en Caché LRU O(1) con validación de TTL
    const cached = this.reposCache.get(normalizedKey);
    if (cached) {
      return cached;
    }

    const response = await this.executeRequest(
      `/users/${encodeURIComponent(normalizedKey)}/repos?per_page=100&sort=updated`,
      signal
    );

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      await this.handleErrorResponse(response, "Repositorios");
    }

    const data: unknown = await response.json();
    const parsed = GitHubRepoListSchema.safeParse(data);

    let reposData: GitHubRepo[];

    if (!parsed.success) {
      console.warn("Zod Schema Validation Warning for GitHub Repos, recuperando elementos válidos:", parsed.error);
      if (Array.isArray(data)) {
        const recoveredRepos: GitHubRepo[] = [];
        for (const item of data) {
          const itemParsed = GitHubRepoSchema.safeParse(item);
          if (itemParsed.success) {
            recoveredRepos.push(itemParsed.data);
          }
        }
        if (recoveredRepos.length > 0 || data.length === 0) {
          reposData = recoveredRepos;
        } else {
          throw new GitHubValidationError(
            "La lista de repositorios devuelta por GitHub no cumple con el esquema esperado.",
            parsed.error.issues
          );
        }
      } else {
        throw new GitHubValidationError(
          "La respuesta de repositorios de GitHub no es un array válido.",
          parsed.error.issues
        );
      }
    } else {
      reposData = parsed.data;
    }

    // Almacenar en caché LRU
    this.reposCache.set(normalizedKey, reposData);
    return reposData;
  }

  public clearCache(): void {
    this.userCache.clear();
    this.reposCache.clear();
  }

  public getCircuitBreakerMetrics() {
    return this.circuitBreaker.getMetrics();
  }
}

// Instancia singleton por defecto para la aplicación
const defaultClient = new GitHubApiClient();

/**
 * Returns the default singleton instance of {@link GitHubApiClient}.
 */
export function getGitHubApiClient(): GitHubApiClient {
  return defaultClient;
}

/**
 * Evicts all in-memory cached users and repositories in the default client.
 */
export function clearGitHubCache(): void {
  defaultClient.clearCache();
}

/**
 * Request-deduplicated helper fetching a GitHub user profile.
 * Cached per request in React Server Components via `React.cache`.
 *
 * @param username - GitHub login handle.
 * @param signal - Optional AbortSignal.
 * @returns Parsed user profile.
 */
export const fetchGitHubUser = cache(async (
  username: string,
  signal?: AbortSignal
): Promise<GitHubUser> => {
  return defaultClient.getUser(username, signal);
});

/**
 * Request-deduplicated helper fetching GitHub repositories for a user.
 * Cached per request in React Server Components via `React.cache`.
 *
 * @param username - GitHub login handle.
 * @param signal - Optional AbortSignal.
 * @returns List of public repositories.
 */
export const fetchGitHubUserRepos = cache(async (
  username: string,
  signal?: AbortSignal
): Promise<GitHubRepo[]> => {
  return defaultClient.getUserRepos(username, signal);
});
