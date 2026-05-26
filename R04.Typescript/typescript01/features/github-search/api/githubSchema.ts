import { z } from "zod";

// Zod schema for a single GitHub User Profile
export const GitHubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  name: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  twitter_username: z.string().nullable().optional(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
});

// Zod schema for a single GitHub Repository
export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable().optional(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable().optional(),
  updated_at: z.string(),
  homepage: z.string().nullable().optional(),
});

// Zod schema for an array of GitHub Repositories
export const GitHubRepoListSchema = z.array(GitHubRepoSchema);

// Infer TypeScript interfaces from Zod schemas
export type GitHubUser = z.infer<typeof GitHubUserSchema>;
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

// Input validation schema for the search form
export const UsernameSearchSchema = z
  .string()
  .min(1, "El nombre de usuario no puede estar vacío")
  .max(39, "El nombre de usuario de GitHub no puede superar los 39 caracteres")
  .regex(
    /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
    "El nombre de usuario solo puede contener caracteres alfanuméricos y guiones simples (-) y no puede empezar ni terminar con un guion"
  );
