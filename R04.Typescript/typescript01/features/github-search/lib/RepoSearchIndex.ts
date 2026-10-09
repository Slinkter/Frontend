/**
 * @file RepoSearchIndex.ts
 * @description Estructura de datos optimizada para búsqueda instantánea en O(log T + k).
 * Implementa un índice invertido con bisección binaria sobre tokens ordenados lexicográficamente
 * y algoritmo de intersección de consultas ponderado por cardinalidad mínima O(min(|A|, |B|)).
 */

import type { GitHubRepo } from "../api/githubSchema";

/**
 * Normaliza y tokeniza cadenas de texto de forma canónica y simétrica.
 * Elimina marcas diacríticas (tildes), pasa a minúsculas y separa por caracteres no alfanuméricos.
 */
export function normalizeAndTokenize(text: string): string[] {
  if (!text) return [];

  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Extraer tokens principales permitiendo +, # y . para lenguajes y frameworks como c++, c#, .net
  const rawTokens = normalized.split(/[^a-z0-9_#+.-]+/).filter((t) => t.length > 0);
  const result = new Set<string>();

  for (const token of rawTokens) {
    result.add(token);
    // Si contiene guiones, puntos o guiones bajos, indexar también las partes individuales
    if (token.includes("-") || token.includes("_") || token.includes(".")) {
      const subTokens = token.split(/[-_.]+/).filter((s) => s.length > 0);
      for (const sub of subTokens) {
        result.add(sub);
      }
    }
  }

  return Array.from(result);
}

export class RepoSearchIndex {
  // Mapa de término -> Set de IDs de repositorios asociados
  private readonly tokenIndex = new Map<string, Set<number>>();
  // Mapa directo O(1) de ID -> Entidad GitHubRepo
  private readonly repoMap = new Map<number, GitHubRepo>();
  // Tokens únicos ordenados lexicográficamente para bisección binaria O(log T)
  private sortedTokens: string[] = [];

  constructor(repos: GitHubRepo[]) {
    this.buildIndex(repos);
  }

  /**
   * Construye el índice invertido en O(N * L) una sola vez al cargar o cambiar los datos.
   */
  private buildIndex(repos: GitHubRepo[]): void {
    this.tokenIndex.clear();
    this.repoMap.clear();

    for (const repo of repos) {
      this.repoMap.set(repo.id, repo);

      const combinedText = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""}`;
      const tokens = normalizeAndTokenize(combinedText);

      for (const token of tokens) {
        let repoIdSet = this.tokenIndex.get(token);
        if (!repoIdSet) {
          repoIdSet = new Set<number>();
          this.tokenIndex.set(token, repoIdSet);
        }
        repoIdSet.add(repo.id);
      }
    }

    // Ordenamiento lexicográfico para habilitar bisección binaria de prefijos
    this.sortedTokens = Array.from(this.tokenIndex.keys()).sort();
  }

  /**
   * Búsqueda por bisección binaria O(log T) para encontrar el rango continuo de tokens coincidentes por prefijo.
   * Utiliza búsqueda binaria doble para el límite inferior y superior en O(log T), extrayendo k tokens en O(k).
   * Complejidad total: O(log T + k).
   */
  public findPrefixTokens(prefix: string): string[] {
    const totalTokens = this.sortedTokens.length;
    if (totalTokens === 0 || !prefix) return [];

    // 1. Límite inferior: primer token >= prefix
    let low = 0;
    let high = totalTokens - 1;
    let lowerBound = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const token = this.sortedTokens[mid];

      if (token >= prefix) {
        lowerBound = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    // Si no existe ningún token >= prefix o el encontrado no inicia con el prefijo
    if (lowerBound === -1 || !this.sortedTokens[lowerBound].startsWith(prefix)) {
      return [];
    }

    // 2. Límite superior: último token que inicia con prefix (comparado con prefix + delimitador máximo '\uffff')
    const upperBoundKey = prefix + "\uffff";
    low = lowerBound;
    high = totalTokens - 1;
    let upperBound = lowerBound;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const token = this.sortedTokens[mid];

      if (token <= upperBoundKey) {
        upperBound = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Retornar la porción continua de tokens coincidentes en O(k)
    return this.sortedTokens.slice(lowerBound, upperBound + 1);
  }

  /**
   * Consulta optimizada con resolución de intersección ponderada por cardinalidad en tiempo sublineal.
   */
  public search(query: string): GitHubRepo[] {
    const trimmed = query.trim();
    if (!trimmed) {
      return Array.from(this.repoMap.values());
    }

    const queryTokens = normalizeAndTokenize(trimmed);
    if (queryTokens.length === 0) {
      return Array.from(this.repoMap.values());
    }

    // 1. Obtener conjunto de IDs para cada token de la consulta
    const candidateSets: Set<number>[] = [];

    for (const qToken of queryTokens) {
      const matchingTokens = this.findPrefixTokens(qToken);
      if (matchingTokens.length === 0) {
        // Fallback defensivo para símbolos especiales (ej. C++, C#, .NET, @scope)
        const queryLower = trimmed.toLowerCase();
        return Array.from(this.repoMap.values()).filter(
          (repo) =>
            repo.name.toLowerCase().includes(queryLower) ||
            (repo.language && repo.language.toLowerCase().includes(queryLower)) ||
            (repo.description && repo.description.toLowerCase().includes(queryLower))
        );
      }

      const tokenRepoIds = new Set<number>();
      for (const t of matchingTokens) {
        const ids = this.tokenIndex.get(t);
        if (ids) {
          for (const id of ids) {
            tokenRepoIds.add(id);
          }
        }
      }

      if (tokenRepoIds.size === 0) {
        return [];
      }

      candidateSets.push(tokenRepoIds);
    }

    // 2. Optimización por cardinalidad: ordenar conjuntos de menor a mayor tamaño O(M log M)
    candidateSets.sort((a, b) => a.size - b.size);

    // 3. Intersección progresiva iterando siempre sobre el conjunto más pequeño O(min(|A|, |B|))
    let intersectedIds = candidateSets[0];

    for (let i = 1; i < candidateSets.length; i++) {
      const currentSet = candidateSets[i];
      const nextIntersection = new Set<number>();

      // Iterar sobre el conjunto menor para optimizar el número de lookups O(1)
      const [smaller, larger] =
        intersectedIds.size <= currentSet.size
          ? [intersectedIds, currentSet]
          : [currentSet, intersectedIds];

      for (const id of smaller) {
        if (larger.has(id)) {
          nextIntersection.add(id);
        }
      }

      intersectedIds = nextIntersection;
      if (intersectedIds.size === 0) {
        return [];
      }
    }

    // 4. Mapear IDs coincidentes a entidades de repositorio con ponderación de relevancia
    const results: GitHubRepo[] = [];
    const queryLower = trimmed.toLowerCase();

    for (const id of intersectedIds) {
      const repo = this.repoMap.get(id);
      if (repo) {
        results.push(repo);
      }
    }

    // Ponderación: repositorios cuyo nombre coincide exactamente o inicia con la consulta aparecen primero
    results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      const aExact = aName === queryLower ? 2 : aName.startsWith(queryLower) ? 1 : 0;
      const bExact = bName === queryLower ? 2 : bName.startsWith(queryLower) ? 1 : 0;

      if (aExact !== bExact) {
        return bExact - aExact;
      }
      return 0;
    });

    return results;
  }

  public get totalRepos(): number {
    return this.repoMap.size;
  }

  public get totalUniqueTokens(): number {
    return this.sortedTokens.length;
  }
}
