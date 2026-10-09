import { GitHubSearchDashboard } from "@/features/github-search";
import {
  fetchGitHubUser,
  fetchGitHubUserRepos,
  type GitHubUser,
  type GitHubRepo,
} from "@/features/github-search/api";
import { GITHUB_CONFIG } from "@/features/github-search/constants";

export default async function Home() {
  let initialUser: GitHubUser | null = null;
  let initialRepos: GitHubRepo[] = [];
  const defaultUsername = GITHUB_CONFIG.DEFAULT_USER;

  try {
    const [user, repos] = await Promise.all([
      fetchGitHubUser(defaultUsername),
      fetchGitHubUserRepos(defaultUsername),
    ]);
    initialUser = user;
    initialRepos = repos;
  } catch (err) {
    console.warn("SSR initial fetch error or fallback active:", err);
  }

    return (
        <div className="min-h-screen w-full flex flex-col justify-between">
            {/* Search feature container dashboard con SSR pre-hidratado */}
            <GitHubSearchDashboard
                initialUser={initialUser}
                initialRepos={initialRepos}
            />
        </div>
    );
}
