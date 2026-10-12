/**
 * @file CircuitBreaker.ts
 * @description Patrón de resiliencia Circuit Breaker para protección contra fallos en cascada,
 * cortes de conectividad y sobrecarga por rate limit de servicios externos.
 */

/**
 * Lifecycle states of the Circuit Breaker pattern.
 * - `CLOSED`: Healthy state, requests are allowed through.
 * - `OPEN`: Failing state, requests fail-fast without hitting external services.
 * - `HALF_OPEN`: Trial state probing recovery with limited requests.
 */
export type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

/**
 * Error thrown when an execution attempt occurs while the Circuit Breaker is OPEN.
 */
export class CircuitBreakerOpenError extends Error {
  /** Identifier of the tripped circuit. */
  public readonly circuitName: string;
  /** Estimated milliseconds until trial recovery (HALF_OPEN) is permitted. */
  public readonly retryAfterMs: number;

  constructor(circuitName: string, retryAfterMs: number) {
    const retrySecs = Math.max(1, Math.ceil(retryAfterMs / 1000));
    super(
      `El circuito '${circuitName}' está ABIERTO debido a fallos reiterados en el servicio. Reintento disponible en ${retrySecs}s.`
    );
    this.name = "CircuitBreakerOpenError";
    this.circuitName = circuitName;
    this.retryAfterMs = retryAfterMs;
  }
}

/**
 * Configuration options for initializing a {@link CircuitBreaker}.
 */
export interface CircuitBreakerOptions {
  /** Number of consecutive failures before tripping the circuit OPEN. Defaults to 3. */
  failureThreshold?: number;
  /** Cooldown time in milliseconds before transitioning to HALF_OPEN. Defaults to 20000ms. */
  resetTimeoutMs?: number;
  /** Number of consecutive successes required in HALF_OPEN to close the circuit. Defaults to 2. */
  successThreshold?: number;
  /** Readable identifier name for telemetry and error reporting. */
  name?: string;
  /** Callback triggered on state transitions. */
  onStateChange?: (from: CircuitBreakerState, to: CircuitBreakerState) => void;
}

/**
 * Snapshot of telemetry metrics from a {@link CircuitBreaker}.
 */
export interface CircuitBreakerMetrics {
  /** Current circuit state. */
  state: CircuitBreakerState;
  /** Current count of recorded consecutive failures. */
  failureCount: number;
  /** Current count of recorded consecutive successes in trial mode. */
  consecutiveSuccesses: number;
  /** Unix timestamp in ms of the last failure. */
  lastFailureTime: number | null;
  /** Unix timestamp in ms when the circuit will attempt HALF_OPEN. */
  nextAttemptTime: number | null;
}

/**
 * Resilient Circuit Breaker implementation protecting against cascading network failures
 * and downstream API rate limits.
 *
 * @example
 * ```ts
 * const breaker = new CircuitBreaker({ name: "github-api", failureThreshold: 3 });
 * const data = await breaker.execute(() => fetchUserData(username));
 * ```
 */
export class CircuitBreaker {
  private readonly name: string;
  private readonly failureThreshold: number;
  private readonly resetTimeoutMs: number;
  private readonly successThreshold: number;
  private readonly onStateChange?: (from: CircuitBreakerState, to: CircuitBreakerState) => void;

  private state: CircuitBreakerState = "CLOSED";
  private failureCount = 0;
  private consecutiveSuccesses = 0;
  private lastFailureTime: number | null = null;
  private nextAttemptTime: number | null = null;

  constructor(options: CircuitBreakerOptions = {}) {
    this.name = options.name ?? "default-circuit";
    this.failureThreshold = Math.max(1, options.failureThreshold ?? 3);
    this.resetTimeoutMs = Math.max(100, options.resetTimeoutMs ?? 20000);
    this.successThreshold = Math.max(1, options.successThreshold ?? 2);
    this.onStateChange = options.onStateChange;
  }

  /**
   * Executes an asynchronous task protected by the circuit breaker rules.
   *
   * @typeParam T - Return type of the protected operation.
   * @param action - Async function to execute.
   * @returns Result of the action execution.
   * @throws {@link CircuitBreakerOpenError} if the circuit is currently OPEN.
   */
  public async execute<T>(action: () => Promise<T>): Promise<T> {
    this.evaluateState();

    if (this.state === "OPEN") {
      const remainingMs = Math.max(0, (this.nextAttemptTime ?? 0) - Date.now());
      throw new CircuitBreakerOpenError(this.name, remainingMs);
    }

    try {
      const result = await action();
      this.handleSuccess();
      return result;
    } catch (error) {
      this.handleFailure();
      throw error;
    }
  }

  /**
   * Revisa si ha expirado el periodo de enfriamiento para transicionar de OPEN a HALF_OPEN.
   */
  private evaluateState(): void {
    if (this.state === "OPEN" && this.nextAttemptTime !== null && Date.now() >= this.nextAttemptTime) {
      this.transitionTo("HALF_OPEN");
      this.consecutiveSuccesses = 0;
    }
  }

  private handleSuccess(): void {
    if (this.state === "HALF_OPEN") {
      this.consecutiveSuccesses++;
      if (this.consecutiveSuccesses >= this.successThreshold) {
        this.transitionTo("CLOSED");
        this.resetCounters();
      }
    } else if (this.state === "CLOSED") {
      this.failureCount = 0;
    }
  }

  private handleFailure(): void {
    this.lastFailureTime = Date.now();

    if (this.state === "HALF_OPEN") {
      // Fallo en sondeo de prueba devuelve el circuito inmediatamente a OPEN
      this.trip(this.resetTimeoutMs);
    } else if (this.state === "CLOSED") {
      this.failureCount++;
      if (this.failureCount >= this.failureThreshold) {
        this.trip(this.resetTimeoutMs);
      }
    }
  }

  /**
   * Fuerza la apertura del circuito (útil ante detección proactiva de rate-limit severo).
   */
  public trip(customCooldownMs?: number): void {
    const cooldown = customCooldownMs ?? this.resetTimeoutMs;
    this.nextAttemptTime = Date.now() + cooldown;
    this.transitionTo("OPEN");
  }

  /**
   * Restablece el circuito manualmente al estado saludable CLOSED.
   */
  public reset(): void {
    this.resetCounters();
    this.transitionTo("CLOSED");
  }

  private transitionTo(newState: CircuitBreakerState): void {
    if (this.state !== newState) {
      const prevState = this.state;
      this.state = newState;
      if (this.onStateChange) {
        this.onStateChange(prevState, newState);
      }
    }
  }

  private resetCounters(): void {
    this.failureCount = 0;
    this.consecutiveSuccesses = 0;
    this.nextAttemptTime = null;
  }

  public getState(): CircuitBreakerState {
    this.evaluateState();
    return this.state;
  }

  public getMetrics(): CircuitBreakerMetrics {
    this.evaluateState();
    return {
      state: this.state,
      failureCount: this.failureCount,
      consecutiveSuccesses: this.consecutiveSuccesses,
      lastFailureTime: this.lastFailureTime,
      nextAttemptTime: this.nextAttemptTime,
    };
  }
}
