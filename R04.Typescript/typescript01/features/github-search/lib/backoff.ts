/**
 * @file backoff.ts
 * @description Mecanismo de reintento con Retroceso Exponencial y Full Jitter (dispersión estocástica total).
 * Evita el problema del rebaño atronador (thundering herd problem) ante fallos intermitentes de red y servidores 5xx.
 */

export interface BackoffOptions {
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
  shouldRetry?: (error: unknown, response?: Response) => boolean;
}

/**
 * Calcula el retardo de retroceso exponencial con Full Jitter según las directrices de arquitectura de alta resiliencia.
 * Formula: sleep = Math.random() * min(maxDelay, baseDelay * 2^attempt)
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
 * Espera de forma asíncrona una cantidad de milisegundos respetando la señal de aborto si se provee.
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
 * Determina si una respuesta HTTP representa un fallo de servidor transitorio elegible para reintento.
 */
export function isTransientHttpStatus(status: number): boolean {
  return status === 408 || status === 500 || status === 502 || status === 503 || status === 504;
}

/**
 * Realiza una petición fetch con retroceso exponencial, jitter, timeout por intento y reintentos selectivos.
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
