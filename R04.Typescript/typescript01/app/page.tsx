import { GitHubSearchDashboard } from "@/features/github-search";
import {
  fetchGitHubUser,
  fetchGitHubUserRepos,
  type GitHubUser,
  type GitHubRepo,
} from "@/features/github-search/api";

export default async function Home() {
  let initialUser: GitHubUser | null = null;
  let initialRepos: GitHubRepo[] = [];

  try {
    const [user, repos] = await Promise.all([
      fetchGitHubUser("vercel"),
      fetchGitHubUserRepos("vercel"),
    ]);
    initialUser = user;
    initialRepos = repos;
  } catch (err) {
    // Si la llamada en el servidor falla (ej. rate limit durante build o red offline),
    // el cliente efectúa el fallback de forma resiliente sin romper el renderizado.
    console.warn("SSR initial fetch skipped or rate-limited, client fallback active:", err);
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      {/* Search feature container dashboard con SSR pre-hidratado */}
      <GitHubSearchDashboard initialUser={initialUser} initialRepos={initialRepos} />
    </div>
  );
}

