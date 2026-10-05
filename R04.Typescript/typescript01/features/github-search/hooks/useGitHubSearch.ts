import { useState, useEffect, useCallback, useTransition } from "react";
import {
  UsernameSearchSchema,
  fetchGitHubUser,
  fetchGitHubUserRepos,
  type GitHubUser,
  type GitHubRepo,
} from "@/features/github-search/api";
import { sanitizeUsernameInput } from "@/features/github-search/lib/formatters";

export interface UseGitHubSearchOptions {
  initialUser?: GitHubUser | null;
  initialRepos?: GitHubRepo[];
  defaultUser?: string;
}

export function useGitHubSearch(
  optionsOrUser: string | UseGitHubSearchOptions = "vercel"
) {
  const options: UseGitHubSearchOptions =
    typeof optionsOrUser === "string"
      ? { defaultUser: optionsOrUser }
      : optionsOrUser;

  const { initialUser = null, initialRepos = [], defaultUser = "vercel" } = options;

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
          fetchGitHubUser(cleanUsername),
          fetchGitHubUserRepos(cleanUsername),
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
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Solo buscar al montar si el usuario NO vino ya hidratado desde el servidor (SSR)
  useEffect(() => {
    if (!initialUser && defaultUser) {
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
