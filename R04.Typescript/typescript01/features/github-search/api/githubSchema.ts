import { z } from "zod";

/**
 * Zod validation schema for GitHub API error payloads.
 */
export const GitHubApiErrorResponseSchema = z.object({
    message: z.string(),
    documentation_url: z.string().optional(),
});

/**
 * Parsed error response payload from GitHub API.
 */
export type GitHubApiErrorResponse = z.infer<
    typeof GitHubApiErrorResponseSchema
>;

/**
 * Rate limit metadata headers returned by the GitHub REST API.
 */
export interface GitHubRateLimitInfo {
    /** Maximum allowed requests within the current hourly window. */
    limit: number;
    /** Remaining quota in the current window. */
    remaining: number;
    /** Reset epoch time in seconds (UTC). */
    resetEpochSeconds: number;
    /** JavaScript Date object representing when the quota resets. */
    resetDate: Date;
    /** Number of requests consumed so far. */
    used?: number;
}

/**
 * Defensive Zod schema and transformer for GitHub User Profiles.
 * Guarantees resilient default values for nullish API fields.
 */
export const GitHubUserSchema = z.object({
    login: z.string(),
    id: z.number(),
    avatar_url: z
        .string()
        .nullish()
        .transform((v) => v || ""),
    html_url: z
        .string()
        .nullish()
        .transform((v) => v || "#"),
    name: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    blog: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    twitter_username: z.string().nullable().optional(),
    public_repos: z
        .number()
        .nullish()
        .transform((v) => (typeof v === "number" && !isNaN(v) ? v : 0)),
    public_gists: z
        .number()
        .nullish()
        .transform((v) => (typeof v === "number" && !isNaN(v) ? v : 0)),
    followers: z
        .number()
        .nullish()
        .transform((v) => (typeof v === "number" && !isNaN(v) ? v : 0)),
    following: z
        .number()
        .nullish()
        .transform((v) => (typeof v === "number" && !isNaN(v) ? v : 0)),
    created_at: z
        .string()
        .nullish()
        .transform((v) => v || ""),
});

/**
 * Defensive Zod schema and transformer for GitHub Repositories.
 */
export const GitHubRepoSchema = z.object({
    id: z.number(),
    name: z
        .string()
        .nullish()
        .transform((v) => v || "repositorio-sin-nombre"),
    full_name: z
        .string()
        .nullish()
        .transform((v) => v || "repositorio-sin-nombre"),
    html_url: z
        .string()
        .nullish()
        .transform((v) => v || "#"),
    description: z.string().nullable().optional(),
    stargazers_count: z
        .number()
        .nullish()
        .transform((v) => (typeof v === "number" && !isNaN(v) ? v : 0)),
    forks_count: z
        .number()
        .nullish()
        .transform((v) => (typeof v === "number" && !isNaN(v) ? v : 0)),
    language: z.string().nullable().optional(),
    updated_at: z
        .string()
        .nullish()
        .transform((v) => v || ""),
    homepage: z.string().nullable().optional(),
});

/**
 * Zod validation schema for an array of GitHub Repositories.
 */
export const GitHubRepoListSchema = z.array(GitHubRepoSchema);

/** Inferred TypeScript type for a sanitized GitHub User Profile. */
export type GitHubUser = z.infer<typeof GitHubUserSchema>;

/** Inferred TypeScript type for a sanitized GitHub Repository entity. */
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

/**
 * Regex and length validation schema conforming to GitHub username policies.
 */
export const UsernameSearchSchema = z
    .string()
    .min(1, "El nombre de usuario no puede estar vacío")
    .max(
        39,
        "El nombre de usuario de GitHub no puede superar los 39 caracteres",
    )
    .regex(
        /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
        "El nombre de usuario solo puede contener caracteres alfanuméricos y guiones simples (-) y no puede empezar ni terminar con un guion",
    );
