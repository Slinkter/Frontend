import { useState, useEffect, useCallback, useTransition } from "react";
import {
  UsernameSearchSchema,
  getGitHubApiClient,
  type GitHubUser,
  type GitHubRepo,
  type IGitHubService,
} from "@/features/github-search/api";
import { sanitizeUsernameInput } from "@/features/github-search/lib/formatters";
import { GITHUB_CONFIG } from "@/features/github-search/constants";

/**
 * Initialization options for the {@link useGitHubSearch} hook.
 */
export interface UseGitHubSearchOptions {
  /** Server-side pre-rendered user profile for hydration. */
  initialUser?: GitHubUser | null;
  /** Server-side pre-rendered repositories for hydration. */
  initialRepos?: GitHubRepo[];
  /** Default username to query upon first client mount if not hydrated. */
  defaultUser?: string;
  /** Custom injectable GitHub service instance (useful for testing or mocks). */
  service?: IGitHubService;
}

/**
 * Return signature of {@link useGitHubSearch}.
 */
export interface UseGitHubSearchResult {
  /** Current raw search term state. */
  searchTerm: string;
  /** Dispatcher for search term. */
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  /** Currently active user profile or null. */
  currentUser: GitHubUser | null;
  /** Repositories associated with the active user. */
  repos: GitHubRepo[];
  /** Loading indicator active during concurrent transitions or network fetching. */
  loading: boolean;
  /** Network or service error message if present. */
  error: string | null;
  /** Resets network error state. */
  clearError: () => void;
  /** Client-side input validation error message if present. */
  validationError: string | null;
  /** Dispatcher for validation error state. */
  setValidationError: React.Dispatch<React.SetStateAction<string | null>>;
  /** Triggers an asynchronous search for the specified username. */
  searchUser: (username: string) => Promise<void>;
}

/**
 * Orchestration hook for GitHub user queries, input validation, concurrent transitions,
 * and error handling.
 *
 * @param optionsOrUser - Configuration object or default username string.
 * @returns State and handlers for managing GitHub search workflows.
 *
 * @example
 * ```tsx
 * const { currentUser, repos, loading, searchUser } = useGitHubSearch({ defaultUser: "octocat" });
 * ```
 */
export function useGitHubSearch(
  optionsOrUser: string | UseGitHubSearchOptions = GITHUB_CONFIG.DEFAULT_USER
): UseGitHubSearchResult {
  const options: UseGitHubSearchOptions =
    typeof optionsOrUser === "string"
      ? { defaultUser: optionsOrUser }
      : optionsOrUser;

  const {
    initialUser = null,
    initialRepos = [],
    defaultUser = GITHUB_CONFIG.DEFAULT_USER,
    service = getGitHubApiClient(),
  } = options;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<GitHubUser | null>(initialUser);
  const [repos, setRepos] = useState<GitHubRepo[]>(initialRepos);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [manualLoading, setManualLoading] = useState(false);

  const searchUser = useCallback(async (username: string) => {
    // 1. Sanitizar entrada (remover @, URLs completas de GitHub, espacios)
    const cleanUsername = sanitizeUsernameInput(username);
    if (!cleanUsername) {
      setValidationError("Por favor, introduce un nombre de usuario válido.");
      return;
    }

    // 2. Validar formato con Zod
    const validation = UsernameSearchSchema.safeParse(cleanUsername);
    if (!validation.success) {
      setValidationError(validation.error.issues[0].message);
      return;
    }

    setValidationError(null);
    setError(null);

    // 3. Transición concurrente React 19 para operaciones asíncronas no bloqueantes
    startTransition(async () => {
      setManualLoading(true);
      try {
        const [userSettled, reposSettled] = await Promise.allSettled([
          service.getUser(cleanUsername),
          service.getUserRepos(cleanUsername),
        ]);

        if (userSettled.status === "rejected") {
          throw userSettled.reason;
        }

        setCurrentUser(userSettled.value);

        if (reposSettled.status === "fulfilled") {
          setRepos(reposSettled.value);
        } else {
          setRepos([]);
          const reason = reposSettled.reason;
          const repoErrMsg =
            reason instanceof Error
              ? reason.message
              : "No fue posible obtener la lista de repositorios.";
          setError(repoErrMsg);
        }
      } catch (err: unknown) {
        console.error("Error durante búsqueda de GitHub:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error inesperado al conectar con GitHub.";
        setError(errorMessage);
      } finally {
        setManualLoading(false);
      }
    });
  }, [service]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Solo buscar al montar si el usuario NO vino ya hidratado desde el servidor (SSR)
  useEffect(() => {
    if (!initialUser && defaultUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      searchUser(defaultUser);
    }
  }, [initialUser, defaultUser, searchUser]);

  return {
    searchTerm,
    setSearchTerm,
    currentUser,
    repos,
    loading: isPending || manualLoading,
    error,
    clearError,
    validationError,
    setValidationError,
    searchUser,
  };
}
