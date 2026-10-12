"use client";

import { useState, useMemo, useCallback } from "react";
import { type GitHubRepo } from "@/features/github-search/api";
import { RepoSearchIndex } from "@/features/github-search/lib/RepoSearchIndex";
import { GITHUB_CONFIG } from "@/features/github-search/constants";

/**
 * Supported sorting criteria for repositories.
 */
export type SortOption = "updated" | "stars" | "forks";

/**
 * Options for configuring pagination and filtering.
 */
export interface UseRepoFiltersOptions {
  /** Number of items to reveal per pagination batch. Defaults to 6. */
  pageSize?: number;
}

/**
 * Custom hook managing search filtering, language selection, sorting,
 * and progressive disclosure pagination over a list of repositories.
 *
 * @param repos - Array of GitHub repository objects.
 * @param options - Configuration options for pagination.
 * @returns State and helper callbacks for repository filtering and display.
 *
 * @example
 * ```tsx
 * const { displayedRepos, filterQuery, setFilterQuery, loadMore, hasMore } = useRepoFilters(repos);
 * ```
 */
export function useRepoFilters(
  repos: GitHubRepo[],
  options: UseRepoFiltersOptions = {}
) {
  const { pageSize = GITHUB_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE } = options;

  const [filterQuery, setFilterQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [pageMultiplier, setPageMultiplier] = useState(1);
  const [prevFilterKey, setPrevFilterKey] = useState(
    `${filterQuery}:${selectedLanguage}:${sortBy}`
  );

  // 1. Inversión de índice para búsqueda sublineal O(log n + k)
  const searchIndex = useMemo(() => new RepoSearchIndex(repos), [repos]);

  // 2. Extraer lenguajes únicos presentes en la colección de repos
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) set.add(repo.language);
    });
    return ["All", ...Array.from(set)];
  }, [repos]);

  // 3. Pre-ordenamiento defensivo en O(n log n) con protección contra fechas inválidas
  const preSorted = useMemo(() => {
    const safeParseDate = (dateStr: string) => {
      const parsed = Date.parse(dateStr);
      return isNaN(parsed) ? 0 : parsed;
    };

    return {
      updated: [...repos].sort(
        (a, b) => safeParseDate(b.updated_at) - safeParseDate(a.updated_at)
      ),
      stars: [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count),
      forks: [...repos].sort((a, b) => b.forks_count - a.forks_count),
    };
  }, [repos]);

  // 4. Filtrado optimizado: índice invertido y filtro por lenguaje
  const filteredRepos = useMemo(() => {
    let result: GitHubRepo[];

    if (filterQuery.trim() === "") {
      result = preSorted[sortBy];
    } else {
      const matched = searchIndex.search(filterQuery);
      const safeParseDate = (dateStr: string) => {
        const parsed = Date.parse(dateStr);
        return isNaN(parsed) ? 0 : parsed;
      };

      result = matched.sort((a, b) => {
        if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
        if (sortBy === "forks") return b.forks_count - a.forks_count;
        return safeParseDate(b.updated_at) - safeParseDate(a.updated_at);
      });
    }

    if (selectedLanguage !== "All") {
      result = result.filter((r) => r.language === selectedLanguage);
    }

    return result;
  }, [searchIndex, filterQuery, selectedLanguage, sortBy, preSorted]);

  // 5. Reseteo reactivo de paginación al cambiar criterios de filtrado
  const currentFilterKey = `${filterQuery}:${selectedLanguage}:${sortBy}`;
  if (currentFilterKey !== prevFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setPageMultiplier(1);
  }

  const visibleCount = pageMultiplier * pageSize;
  const displayedRepos = useMemo(() => {
    return filteredRepos.slice(0, visibleCount);
  }, [filteredRepos, visibleCount]);

  const hasMore = visibleCount < filteredRepos.length;

  const loadMore = useCallback(() => {
    setPageMultiplier((prev) => prev + 1);
  }, []);

  const showAll = useCallback(() => {
    setPageMultiplier(Math.ceil(filteredRepos.length / pageSize));
  }, [filteredRepos.length, pageSize]);

  const resetFilters = useCallback(() => {
    setFilterQuery("");
    setSelectedLanguage("All");
    setSortBy("updated");
    setPageMultiplier(1);
  }, []);

  const isFiltered =
    filterQuery.trim() !== "" ||
    selectedLanguage !== "All" ||
    sortBy !== "updated";

  return {
    filterQuery,
    setFilterQuery,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy,
    languages,
    filteredRepos,
    displayedRepos,
    totalCount: repos.length,
    filteredCount: filteredRepos.length,
    visibleCount: displayedRepos.length,
    pageSize,
    hasMore,
    loadMore,
    showAll,
    resetFilters,
    isFiltered,
  };
}
