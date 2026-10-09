import { z } from "zod";

// Zod schema for GitHub API Error Response body
export const GitHubApiErrorResponseSchema = z.object({
    message: z.string(),
    documentation_url: z.string().optional(),
});
export type GitHubApiErrorResponse = z.infer<
    typeof GitHubApiErrorResponseSchema
>;

// Rate limit metadata contract
export interface GitHubRateLimitInfo {
    limit: number;
    remaining: number;
    resetEpochSeconds: number;
    resetDate: Date;
    used?: number;
}

// Zod schema for a single GitHub User Profile con transformación defensiva
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

// Zod schema for a single GitHub Repository con transformación defensiva
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

// Zod schema for an array of GitHub Repositories
export const GitHubRepoListSchema = z.array(GitHubRepoSchema);

// Infer TypeScript types from Zod schemas
export type GitHubUser = z.infer<typeof GitHubUserSchema>;
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

// Input validation schema for the search form
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
