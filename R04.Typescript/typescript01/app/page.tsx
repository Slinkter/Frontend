import { GitHubSearchDashboard } from "@/features/github-search";
import {
    fetchGitHubUser,
    fetchGitHubUserRepos,
    type GitHubUser,
    type GitHubRepo,
} from "@/features/github-search/api";
import { GITHUB_CONFIG } from "@/features/github-search/constants";

/**
 * Server Component entry point for the GitHub Search application.
 * Pre-fetches the default user profile and repositories server-side
 * for rapid Time To First Byte (TTFB) and zero hydration layout shifts.
 *
 * @returns Server-rendered JSX element.
 */
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
            <GitHubSearchDashboard
                initialUser={initialUser}
                initialRepos={initialRepos}
            />
        </div>
    );
}
