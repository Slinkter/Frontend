/**
 * @file LRUCache.ts
 * @description Implementación genérica de Caché LRU (Least Recently Used) con operaciones en O(1)
 * y soporte opcional de TTL (Time-To-Live).
 */

export interface LRUCacheOptions {
  capacity?: number;
  defaultTtlMs?: number;
}

interface CacheNode<V> {
  value: V;
  expiresAt?: number;
}

export class LRUCache<K, V> {
  private readonly capacity: number;
  private readonly defaultTtlMs?: number;
  private readonly store = new Map<K, CacheNode<V>>();

  constructor(options: LRUCacheOptions = {}) {
    this.capacity = options.capacity ?? 25;
    this.defaultTtlMs = options.defaultTtlMs;

    if (this.capacity <= 0) {
      throw new RangeError("La capacidad de LRUCache debe ser mayor a 0.");
    }
  }

  /**
   * Obtiene un valor de la caché en O(1).
   * Si el elemento expiró por TTL, se desaloja y retorna undefined.
   * Si existe y está vigente, se promueve al final como elemento más recientemente usado.
   */
  public get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    // Verificar TTL
    if (entry.expiresAt !== undefined && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    // Promover en la cola LRU: eliminar y reinsertar en el extremo más reciente
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.value;
  }

  /**
   * Inserta o actualiza una entrada en O(1).
   * Si se supera la capacidad máxima, desaloja el elemento menos recientemente usado en O(1).
   */
  public set(key: K, value: V, ttlMs?: number): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.capacity) {
      // Desalojar el elemento más antiguo (primer elemento del iterador en O(1))
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
      }
    }

    const effectiveTtl = ttlMs ?? this.defaultTtlMs;
    const expiresAt = effectiveTtl !== undefined ? Date.now() + effectiveTtl : undefined;

    this.store.set(key, { value, expiresAt });
  }

  /**
   * Comprueba si una clave existe y no ha expirado, en O(1). No modifica el orden LRU.
   */
  public has(key: K): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (entry.expiresAt !== undefined && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Lee el valor sin alterar su posición en el orden LRU.
   */
  public peek(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (entry.expiresAt !== undefined && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Elimina una clave de la caché en O(1).
   */
  public delete(key: K): boolean {
    return this.store.delete(key);
  }

  /**
   * Limpia todas las entradas de la caché en O(1).
   */
  public clear(): void {
    this.store.clear();
  }

  /**
   * Retorna el número actual de elementos vigentes en la caché.
   */
  public get size(): number {
    return this.store.size;
  }

  /**
   * Retorna la capacidad máxima configurada.
   */
  public get maxCapacity(): number {
    return this.capacity;
  }

  /**
   * Barredor activo de entradas expiradas por TTL.
   */
  public pruneExpired(): number {
    const now = Date.now();
    let prunedCount = 0;

    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt !== undefined && now > entry.expiresAt) {
        this.store.delete(key);
        prunedCount++;
      }
    }

    return prunedCount;
  }
}
