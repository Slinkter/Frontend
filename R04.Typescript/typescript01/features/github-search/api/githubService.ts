import { GitHubUserSchema, GitHubRepoListSchema, type GitHubUser, type GitHubRepo } from "./githubSchema";

export class GitHubApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

/**
 * Fetches user profile data from GitHub API and validates it against the Zod schema.
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new GitHubApiError("Usuario de GitHub no encontrado.", 404);
    }
    if (response.status === 403 || response.status === 429) {
      throw new GitHubApiError(
        "Se ha alcanzado el límite de peticiones de la API de GitHub. Inténtalo más tarde.",
        response.status
      );
    }
    throw new GitHubApiError(
      `Error al consultar la API de GitHub (${response.statusText}).`,
      response.status
    );
  }

  const data = await response.json();
  
  // Safe-parse using Zod to handle any mismatch in standard GitHub response shape
  const parsed = GitHubUserSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Zod Schema Validation Failure for GitHub User:", parsed.error);
    // Even if Zod fails, we can fallback or throw an error. Let's throw a clear error to keep validation rigorous.
    throw new GitHubApiError("Los datos devueltos por GitHub no cumplen con el esquema esperado.");
  }

  return parsed.data;
}

/**
 * Fetches repository list for a user from GitHub API and validates it against the Zod schema.
 * Fetches up to 100 repositories sorted by recently updated.
 */
export async function fetchGitHubUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  );

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    if (response.status === 403 || response.status === 429) {
      throw new GitHubApiError(
        "Límite de peticiones excedido para la lista de repositorios.",
        response.status
      );
    }
    throw new GitHubApiError("Error al consultar los repositorios del usuario.", response.status);
  }

  const data = await response.json();
  const parsed = GitHubRepoListSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Zod Schema Validation Failure for Repositories List:", parsed.error);
    throw new GitHubApiError("La lista de repositorios devuelta no cumple con el esquema esperado.");
  }

  return parsed.data;
}
