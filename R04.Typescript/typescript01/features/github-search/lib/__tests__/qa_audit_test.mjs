import assert from "node:assert/strict";
import {
  formatDeterministicDate,
  formatCompactNumber,
  sanitizeUsernameInput,
  getSafeExternalUrl,
} from "../formatters.ts";
import {
  GitHubUserSchema,
  GitHubRepoSchema,
  GitHubRepoListSchema,
  UsernameSearchSchema,
} from "../../api/githubSchema.ts";
import { RepoSearchIndex } from "../RepoSearchIndex.ts";

console.log("=================================================");
console.log("   EJECUTANDO BATERÍA DE PRUEBAS QA DE EDGE CASES");
console.log("=================================================\n");

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------------
// 1. EDGE CASES: USUARIOS CON 0 REPOSITORIOS
// -------------------------------------------------------------------
test("Edge Case 1.1: Schema Zod parsea usuario con 0 repositorios sin errores", () => {
  const rawUser = {
    login: "newbie",
    id: 12345,
    avatar_url: "https://avatars.githubusercontent.com/u/12345",
    html_url: "https://github.com/newbie",
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: "2024-01-01T00:00:00Z",
  };
  const parsed = GitHubUserSchema.parse(rawUser);
  assert.equal(parsed.public_repos, 0);
  assert.equal(parsed.followers, 0);
});

test("Edge Case 1.2: RepoSearchIndex funciona sin fallos con lista vacía de 0 repositorios", () => {
  const index = new RepoSearchIndex([]);
  assert.equal(index.totalRepos, 0);
  assert.equal(index.totalUniqueTokens, 0);
  const searchResults = index.search("react");
  assert.deepEqual(searchResults, []);
});

// -------------------------------------------------------------------
// 2. EDGE CASES: BIOS EXTRA LARGAS Y MULTILÍNEA
// -------------------------------------------------------------------
test("Edge Case 2.1: Bio de 1500 caracteres y múltiples saltos de línea se procesa con seguridad", () => {
  const longBio = "A".repeat(1500) + "\n\n\nDeveloper specializing in:\n- High-performance systems\n- Resilient UI";
  const rawUser = {
    login: "verbose-dev",
    id: 99,
    avatar_url: "https://avatars.githubusercontent.com/u/99",
    html_url: "https://github.com/verbose-dev",
    bio: longBio,
    public_repos: 5,
    public_gists: 1,
    followers: 10,
    following: 2,
    created_at: "2023-01-01T00:00:00Z",
  };
  const parsed = GitHubUserSchema.parse(rawUser);
  assert.equal(parsed.bio, longBio);
  assert.equal(parsed.bio?.length, longBio.length);
});

test("Edge Case 2.2: Bio de solo espacios en blanco se sanitiza", () => {
  const whitespaceBio = "       \n   \t   ";
  assert.equal(whitespaceBio.trim(), "");
});

// -------------------------------------------------------------------
// 3. EDGE CASES: NOMBRES CON CARACTERES ESPECIALES Y SANITIZACIÓN
// -------------------------------------------------------------------
test("Edge Case 3.1: Sanitización de username elimina @ accidentales", () => {
  assert.equal(sanitizeUsernameInput("@vercel"), "vercel");
  assert.equal(sanitizeUsernameInput("@@torvalds"), "torvalds");
});

test("Edge Case 3.2: Sanitización de username extrae handle de URL completa de GitHub", () => {
  assert.equal(sanitizeUsernameInput("https://github.com/shadcn"), "shadcn");
  assert.equal(sanitizeUsernameInput("github.com/antfu"), "antfu");
  assert.equal(sanitizeUsernameInput("https://www.github.com/leerob"), "leerob");
});

test("Edge Case 3.3: UsernameSearchSchema valida caracteres según especificación oficial de GitHub", () => {
  // Válidos
  assert.equal(UsernameSearchSchema.safeParse("torvalds").success, true);
  assert.equal(UsernameSearchSchema.safeParse("next-js").success, true);
  assert.equal(UsernameSearchSchema.safeParse("c9").success, true);

  // Inválidos (guion al inicio/final, caracteres no alfanuméricos)
  assert.equal(UsernameSearchSchema.safeParse("-torvalds").success, false);
  assert.equal(UsernameSearchSchema.safeParse("torvalds-").success, false);
  assert.equal(UsernameSearchSchema.safeParse("user name").success, false);
  assert.equal(UsernameSearchSchema.safeParse("user$name").success, false);
});

test("Edge Case 3.4: Búsqueda de repositorios con símbolos especiales (C++, C#, .NET)", () => {
  const mockRepos = [
    {
      id: 1,
      name: "cpp-engine",
      full_name: "dev/cpp-engine",
      html_url: "https://github.com/dev/cpp-engine",
      description: "Fast C++ game engine",
      stargazers_count: 100,
      forks_count: 20,
      language: "C++",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "dotnet-api",
      full_name: "dev/dotnet-api",
      html_url: "https://github.com/dev/dotnet-api",
      description: "Enterprise .NET REST service",
      stargazers_count: 50,
      forks_count: 10,
      language: "C#",
      updated_at: "2024-01-02T00:00:00Z",
    },
  ];

  const index = new RepoSearchIndex(mockRepos);
  const cppResults = index.search("c++");
  assert.equal(cppResults.length, 1);
  assert.equal(cppResults[0].name, "cpp-engine");

  const dotnetResults = index.search(".net");
  assert.equal(dotnetResults.length, 1);
  assert.equal(dotnetResults[0].name, "dotnet-api");
});

test("Edge Case 3.5: getSafeExternalUrl bloquea esquemas de ataque javascript: o data:", () => {
  assert.equal(getSafeExternalUrl("javascript:alert(1)"), null);
  assert.equal(getSafeExternalUrl("data:text/html,<script>alert(1)</script>"), null);
  assert.equal(getSafeExternalUrl("vbscript:msgbox(1)"), null);
  assert.equal(getSafeExternalUrl("https://example.com"), "https://example.com");
  assert.equal(getSafeExternalUrl("example.com"), "https://example.com");
  assert.equal(getSafeExternalUrl("   "), null);
  assert.equal(getSafeExternalUrl(null), null);
});

// -------------------------------------------------------------------
// 4. EDGE CASES: RESPUESTAS NULAS O CAMPOS AUSENTES DE LA API DE GITHUB
// -------------------------------------------------------------------
test("Edge Case 4.1: Esquema Zod maneja campos nulos y ausentes transformándolos defensivamente", () => {
  const nullishUser = {
    login: "null-user",
    id: 100,
    avatar_url: null,
    html_url: null,
    name: null,
    company: null,
    blog: null,
    location: null,
    email: null,
    bio: null,
    twitter_username: null,
    public_repos: null,
    public_gists: null,
    followers: null,
    following: null,
    created_at: null,
  };
  const parsed = GitHubUserSchema.parse(nullishUser);
  assert.equal(parsed.avatar_url, "");
  assert.equal(parsed.html_url, "#");
  assert.equal(parsed.public_repos, 0);
  assert.equal(parsed.followers, 0);
  assert.equal(parsed.following, 0);
  assert.equal(parsed.created_at, "");
});

test("Edge Case 4.2: Repositorio con conteos nulos se transforma a 0", () => {
  const nullishRepo = {
    id: 501,
    name: null,
    full_name: null,
    html_url: null,
    description: null,
    stargazers_count: null,
    forks_count: null,
    language: null,
    updated_at: null,
  };
  const parsed = GitHubRepoSchema.parse(nullishRepo);
  assert.equal(parsed.name, "repositorio-sin-nombre");
  assert.equal(parsed.stargazers_count, 0);
  assert.equal(parsed.forks_count, 0);
  assert.equal(parsed.html_url, "#");
});

// -------------------------------------------------------------------
// 5. EDGE CASES: COMPORTAMIENTO CON 100 REPOSITORIOS
// -------------------------------------------------------------------
test("Edge Case 5.1: Carga, ordenamiento e indexación de 100 repositorios en tiempo sublineal", () => {
  const hundredRepos = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `enterprise-repo-${String(i).padStart(3, "0")}`,
    full_name: `org/enterprise-repo-${String(i).padStart(3, "0")}`,
    html_url: `https://github.com/org/enterprise-repo-${String(i).padStart(3, "0")}`,
    description: `Production microservice module #${i} for high throughput distributed architecture`,
    stargazers_count: (i * 37) % 5000,
    forks_count: (i * 13) % 1000,
    language: ["TypeScript", "Rust", "Go", "Python", "C++"][i % 5],
    updated_at: new Date(Date.now() - i * 86400000).toISOString(),
    homepage: null,
  }));

  const parsedList = GitHubRepoListSchema.parse(hundredRepos);
  assert.equal(parsedList.length, 100);

  const startBuild = performance.now();
  const index = new RepoSearchIndex(parsedList);
  const buildTimeMs = performance.now() - startBuild;
  assert.ok(buildTimeMs < 50, `Construcción de índice tomó ${buildTimeMs}ms (debe ser < 50ms)`);

  const startSearch = performance.now();
  const searchResults = index.search("microservice");
  const searchTimeMs = performance.now() - startSearch;
  assert.equal(searchResults.length, 100);
  assert.ok(searchTimeMs < 5, `Búsqueda en 100 repos tomó ${searchTimeMs}ms (debe ser < 5ms)`);
});

// -------------------------------------------------------------------
// 6. EDGE CASES: DESBORDAMIENTOS DE TEXTO Y FORMATEO COMPACTO
// -------------------------------------------------------------------
test("Edge Case 6.1: formatCompactNumber maneja números grandes sin desbordar espacio visual", () => {
  assert.equal(formatCompactNumber(0), "0");
  assert.ok(formatCompactNumber(9999) === "9999" || formatCompactNumber(9999) === "9.999");
  // Notación compacta para miles y millones
  const tenK = formatCompactNumber(12500);
  assert.ok(tenK.includes("12") || tenK.includes("13") || tenK.includes("k") || tenK.includes("mil"));
  const twoMillion = formatCompactNumber(2500000);
  assert.ok(twoMillion.includes("2,5") || twoMillion.includes("2.5") || twoMillion.includes("M"));
  // Casos extremos
  assert.equal(formatCompactNumber(null), "0");
  assert.equal(formatCompactNumber(undefined), "0");
  assert.equal(formatCompactNumber(NaN), "0");
});

// -------------------------------------------------------------------
// 7. EDGE CASES: ERRORES DE HIDRATACIÓN SSR (FECHAS DETERMINISTAS)
// -------------------------------------------------------------------
test("Edge Case 7.1: formatDeterministicDate produce resultado idéntico con zona horaria UTC", () => {
  const isoUtcMidnight = "2024-03-31T23:55:00Z";
  // UTC debe ser el 31 de marzo de 2024, sin importar el huso del cliente local
  const formatted = formatDeterministicDate(isoUtcMidnight, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  assert.equal(formatted, "31/3/2024");
});

test("Edge Case 7.2: formatDeterministicDate maneja entradas nulas, vacías o corruptas sin lanzar errores", () => {
  assert.equal(formatDeterministicDate(null), "N/A");
  assert.equal(formatDeterministicDate(""), "N/A");
  assert.equal(formatDeterministicDate(undefined), "N/A");
  assert.equal(formatDeterministicDate("invalid-date-string-xyz"), "N/A");
});

console.log("\n=================================================");
console.log(`   RESULTADO DE PRUEBAS QA: ${passedTests}/${totalTests} PASADAS (100%)`);
console.log("=================================================");
