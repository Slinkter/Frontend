import { useState, useEffect, useCallback } from "react";
import { UsernameSearchSchema, type GitHubUser, type GitHubRepo } from "../api/githubSchema";
import { fetchGitHubUser, fetchGitHubUserRepos } from "../api/githubService";

export function useGitHubSearch(defaultUser = "vercel") {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const searchUser = useCallback(async (username: string) => {
    // 1. Validate username format with Zod first
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setValidationError("Por favor, introduce un nombre de usuario.");
      return;
    }

    const validation = UsernameSearchSchema.safeParse(cleanUsername);
    if (!validation.success) {
      setValidationError(validation.error.issues[0].message);
      return;
    }

    setValidationError(null);
    setLoading(true);
    setError(null);

    try {
      // Fetch both profile and repos concurrently for high speed
      const [userResult, reposResult] = await Promise.all([
        fetchGitHubUser(cleanUsername),
        fetchGitHubUserRepos(cleanUsername),
      ]);

      setCurrentUser(userResult);
      setRepos(reposResult);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado al conectar con GitHub.";
      setError(errorMessage);
      // We do not clear the previous user to avoid wiping out UI unless preferred, 
      // but in this case, we'll keep the previous user if they want to try searching again.
    } finally {
      setLoading(false);
    }
  }, []);

  // Run a default search on mount so the landing page looks stunning and populated!
  useEffect(() => {
    if (defaultUser) {
      searchUser(defaultUser);
    }
  }, [defaultUser, searchUser]);

  return {
    searchTerm,
    setSearchTerm,
    currentUser,
    repos,
    loading,
    error,
    validationError,
    setValidationError,
    searchUser,
  };
}
