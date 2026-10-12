/**
 * @file backoff.ts
 * @description Mecanismo de reintento con Retroceso Exponencial y Full Jitter (dispersión estocástica total).
 * Evita el problema del rebaño atronador (thundering herd problem) ante fallos intermitentes de red y servidores 5xx.
 */

/**
 * Configuration options for resilient HTTP fetching with exponential backoff.
 */
export interface BackoffOptions {
  /** Maximum number of retry attempts. Defaults to 2. */
  retries?: number;
  /** Base delay in milliseconds before exponential scaling. Defaults to 400. */
  baseDelayMs?: number;
  /** Maximum delay cap in milliseconds. Defaults to 3000. */
  maxDelayMs?: number;
  /** Individual request timeout in milliseconds. Defaults to 8000. */
  timeoutMs?: number;
  /** AbortSignal to cancel in-flight requests and backoff delays. */
  signal?: AbortSignal;
  /** Custom predicate deciding whether an error or response is retryable. */
  shouldRetry?: (error: unknown, response?: Response) => boolean;
}

/**
 * Calculates exponential backoff delay with Full Jitter.
 * Formula: `sleep = Math.random() * min(maxDelay, baseDelay * 2^attempt)`.
 *
 * @param attempt - Zero-based index of current retry attempt.
 * @param baseDelayMs - Base delay in milliseconds. Defaults to 400.
 * @param maxDelayMs - Maximum delay cap in milliseconds. Defaults to 4000.
 * @returns Jittered sleep delay in milliseconds.
 *
 * @example
 * ```ts
 * const delayMs = calculateExponentialBackoffJitter(1, 400, 3000);
 * ```
 */
export function calculateExponentialBackoffJitter(
  attempt: number,
  baseDelayMs = 400,
  maxDelayMs = 4000
): number {
  const exponentialDelay = baseDelayMs * Math.pow(2, attempt);
  const cappedDelay = Math.min(maxDelayMs, exponentialDelay);
  return Math.floor(Math.random() * cappedDelay);
}

/**
 * Asynchronously pauses execution for a specified duration respecting an AbortSignal.
 *
 * @param ms - Milliseconds to sleep.
 * @param signal - Optional AbortSignal to cancel sleep early.
 * @returns Promise that resolves after `ms` or rejects with DOMException AbortError.
 */
export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Operación abortada", "AbortError"));
    }

    const timer = setTimeout(() => {
      resolve();
    }, ms);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Operación abortada", "AbortError"));
    });
  });
}

/**
 * Evaluates whether an HTTP status code indicates a transient server failure suitable for retrying.
 *
 * @param status - HTTP response status code (e.g. 500, 502, 503, 504, 408).
 * @returns True if the status represents a temporary network/server error.
 */
export function isTransientHttpStatus(status: number): boolean {
  return status === 408 || status === 500 || status === 502 || status === 503 || status === 504;
}

/**
 * Performs a `fetch` request with automatic retries, exponential backoff, full jitter,
 * and individual attempt timeouts.
 *
 * @param url - Resource URL to fetch.
 * @param init - Standard RequestInit options.
 * @param options - Resilient backoff options.
 * @returns Promise resolving to the Fetch Response.
 * @throws Error or DOMException if retries are exhausted or aborted.
 */
export async function fetchWithResilience(
  url: string,
  init?: RequestInit,
  options: BackoffOptions = {}
): Promise<Response> {
  const {
    retries = 2,
    baseDelayMs = 400,
    maxDelayMs = 3000,
    timeoutMs = 8000,
    signal,
    shouldRetry,
  } = options;

  let lastError: unknown = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    // Controller combinado para manejar timeout por intento y señal externa
    const attemptController = new AbortController();
    const timeoutTimer = setTimeout(() => {
      attemptController.abort(new DOMException("Timeout de red excedido", "TimeoutError"));
    }, timeoutMs);

    const abortHandler = () => {
      attemptController.abort(signal?.reason);
    };

    if (signal) {
      signal.addEventListener("abort", abortHandler);
    }

    try {
      const response = await fetch(url, {
        ...init,
        signal: attemptController.signal,
      });

      clearTimeout(timeoutTimer);
      if (signal) {
        signal.removeEventListener("abort", abortHandler);
      }

      // Si la respuesta fue exitosa o es un estado final de cliente (404, 401, etc.), retornamos inmediatamente
      if (response.ok || (!isTransientHttpStatus(response.status) && response.status !== 429)) {
        return response;
      }

      // Evaluar si es reintentable
      const canRetry = shouldRetry
        ? shouldRetry(null, response)
        : isTransientHttpStatus(response.status);

      if (!canRetry || attempt >= retries) {
        return response;
      }

      // Pausa con retroceso exponencial y jitter antes del siguiente intento
      const sleepTime = calculateExponentialBackoffJitter(attempt, baseDelayMs, maxDelayMs);
      await delay(sleepTime, signal);
    } catch (error: unknown) {
      clearTimeout(timeoutTimer);
      if (signal) {
        signal.removeEventListener("abort", abortHandler);
      }

      lastError = error;

      // Si el usuario canceló explícitamente la petición, propagar inmediatamente
      if (signal?.aborted) {
        throw error;
      }

      const canRetry = shouldRetry ? shouldRetry(error) : true;
      if (!canRetry || attempt >= retries) {
        throw error;
      }

      const sleepTime = calculateExponentialBackoffJitter(attempt, baseDelayMs, maxDelayMs);
      await delay(sleepTime, signal);
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error("Petición de red fallida tras reintentos con retroceso exponencial.");
}
