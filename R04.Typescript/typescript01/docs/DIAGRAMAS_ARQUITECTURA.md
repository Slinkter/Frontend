# 🏛️ Arquitectura Integral y Catálogo de Diagramas del Sistema
> **Estilo de Documentación:** Unicode Box-Drawing & PlantUML ASCII (`-utxt`)  
> **Proyecto:** GitHub Search Dashboard (Next.js 16 + React 19 + TypeScript Estricto)  
> **Patrones Aplicados:** Clean Architecture, SOLID (DIP), Concurrencia React 19, Resiliencia Circuit Breaker, Búsqueda Sublineal $O(\log T + k)$.

---

## 📑 Catálogo de los 8 Diagramas del Sistema

A partir del análisis exhaustivo del código fuente (`app/`, `features/github-search/`, `components/` y `lib/`), se identifican **8 dimensiones arquitectónicas y operativas** documentadas en formato ASCII/Unicode de alta precisión:

| # | Diagrama | Tipo de Diagrama | Enfoque / Alcance |
|:-:|:---|:---|:---|
| **1** | [Contexto del Sistema (C4 Level 1)](#1-diagrama-de-contexto-del-sistema-c4-level-1) | Contexto C4 | Límites del sistema, actores y frontera con la API externa |
| **2** | [Jerarquía de Componentes y Bento Grid](#2-árbol-de-componentes-y-bento-grid-12-columnas) | Descomposición UI | Layout asimétrico de 12 columnas, Server/Client split y primitivos |
| **3** | [Secuencia de Búsqueda y Reactividad Concurrente](#3-secuencia-de-búsqueda-y-concurrencia-react-19) | Secuencia (`-utxt`) | Flujo end-to-end con `startTransition`, Zod, Caché y API |
| **4** | [Máquina de Estados de Resiliencia: Circuit Breaker](#4-máquina-de-estados-finita-circuit-breaker) | State Machine | Transiciones `CLOSED`, `OPEN` y `HALF_OPEN` con tiempos de guarda |
| **5** | [Motor de Búsqueda Sublineal: RepoSearchIndex](#5-algoritmo-de-búsqueda-sublineal-reposearchindex) | Pipeline de Datos | Bisección binaria de prefijos $O(\log T + k)$ e intersección mínima |
| **6** | [Arquitectura Integral por Capas (Clean Architecture)](#6-arquitectura-integral-por-capas-clean-architecture) | Capas / Paquetes | Separación estricta: Presentación, Aplicación, Dominio e Infraestructura |
| **7** | [Diagrama de Clases, Interfaces y Jerarquía de Errores](#7-diagrama-de-clases-contratos-solid-y-errores) | Clases y Contratos | `IGitHubService`, `GitHubApiClient`, composición de algoritmos y errores |
| **8** | [Pipeline de Resiliencia HTTP con Full Jitter Backoff](#8-pipeline-de-resiliencia-http-con-full-jitter-backoff) | Flujo de Reintentos | Mitigación del *Thundering Herd* con retroceso estocástico |

---

## 1. Diagrama de Contexto del Sistema (C4 Level 1)
> **Objetivo:** Delimitar la frontera del sistema, los roles de usuario y las dependencias externas de infraestructura sin acoplarse a detalles de código.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              USUARIO                                   │
│                     👤 Desarrollador / Reclutador                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           1. Escribe username      │  4. Visualiza perfil, Bento Grid,
              o filtra repositorios │     estadísticas y métricas en vivo
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│    SISTEMA: GITHUB SEARCH DASHBOARD (Next.js 16 + React 19 + TS)       │
│                                                                        │
│  • Server-Side Rendering (SSR) con prefetch inicial de octocat         │
│  • Bento Grid asimétrico de 12 columnas (Aurora Glass Design System)   │
│  • Búsqueda instantánea en cliente mediante índice invertido           │
│  • Tolerancia a fallos: Circuit Breaker + Full Jitter Backoff          │
│  • Caché multinivel: Next.js Cache (1h) + LRU Memory Cache en cliente  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
             2. Peticiones HTTP     │  3. Respuestas JSON estructuradas
                seguras con timeout │     + Cabeceras de Rate Limit
                y reintentos 5xx    │     (x-ratelimit-remaining/reset)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        INFRAESTRUCTURA EXTERNA                         │
│                         ☁️ GitHub REST API v3                          │
│                                                                        │
│  • https://api.github.com/users/:username                              │
│  • https://api.github.com/users/:username/repos                        │
│  • Cuota estricta: 60 peticiones/hora (modo público sin token)         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Árbol de Componentes y Bento Grid (12 Columnas)
> **Objetivo:** Mostrar la descomposición atómica de la interfaz de usuario en React, la frontera Server/Client Component y el layout Bento Grid de 12 columnas.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ app/page.tsx  [Server Component - Prefetch en Servidor de octocat para TTFB < 100ms]                       │
└─────────────────────────────────────────────────────┬──────────────────────────────────────────────────────┘
                                                      │ Hydration Props: initialUser, initialRepos
                                                      ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ features/github-search/index.tsx  [GitHubSearchDashboard - Client Component Root]                          │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ DashboardHeader.tsx  [Cabecera: Título Aurora, Badge de Estado del Circuito, ThemeToggle (next-themes)]│  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                            │
│  ┌──────────────────────────────────────── BENTO GRID (12 COLUMNAS) ───────────────────────────────────┐  │
│  │                                                                                                      │  │
│  │  COLUMNAS 1 A 4 (Sticky Desktop 33%)            COLUMNAS 5 A 12 (Panel Superior 66%)                 │  │
│  │  ┌───────────────────────────────────────┐      ┌─────────────────────────────────────────────────┐  │  │
│  │  │ UserProfile.tsx                       │      │ BentoStatCards (Grid de 4 Tarjetas de Métricas) │  │  │
│  │  │ • Avatar circular con Halo dinámico   │      │ ┌──────────────────────┐ ┌────────────────────┐ │  │  │
│  │  │ • Nombre, handle, biografía y empresa │      │ │ ⭐ Total Stars       │ │ 📦 Repositorios    │ │  │  │
│  │  │ • Blog / sitio web (rel="noopener")   │      │ └──────────────────────┘ └────────────────────┘ │  │  │
│  │  │ • Badges: Followers y Following       │      │ ┌──────────────────────┐ ┌────────────────────┐ │  │  │
│  │  │ • Ubicación geográfica y fecha de alta│      │ │ 👥 Seguidores        │ │ 💻 Top Lenguaje    │ │  │  │
│  │  └───────────────────────────────────────┘      │ └──────────────────────┘ └────────────────────┘ │  │  │
│  │                                                 └─────────────────────────────────────────────────┘  │  │
│  │                                                 COLUMNAS 5 A 12 (Panel Inferior 66%)                 │  │
│  │                                                 ┌─────────────────────────────────────────────────┐  │  │
│  │                                                 │ Barra de Herramientas y Filtros                 │  │  │
│  │                                                 │ • SearchInput.tsx (Entrada con debounce 300ms)  │  │  │
│  │                                                 │ • Select Radix UI: Filtro Lenguaje ("All", ...) │  │  │
│  │                                                 │ • Select Radix UI: Orden (updated, stars, forks)│  │  │
│  │                                                 ├─────────────────────────────────────────────────┤  │  │
│  │                                                 │ RepoList.tsx                                    │  │  │
│  │                                                 │ • Grid dinámico de tarjetas de repositorio      │  │  │
│  │                                                 │ • Badges de lenguaje, forks y estrellas         │  │  │
│  │                                                 │ • Paginación progresiva incremental (+24 items) │  │  │
│  │                                                 └─────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ DashboardFooter.tsx  [Pie: Firma de ingeniería, auditoría de cuota REST y estado de conexión]        │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Secuencia de Búsqueda y Concurrencia (React 19)
> **Objetivo:** Rastrear el ciclo de vida de una consulta del usuario, desde la validación con Zod en el cliente, la transición concurrente de React 19, la consulta a la caché $O(1)$ y la protección de red.

```text
┌──────┐             ┌─────────────┐             ┌─────────────────┐             ┌──────────────┐             ┌──────────┐             ┌────────────┐
│ User │             │ SearchInput │             │ useGitHubSearch │             │ Zod / Schema │             │ LRUCache │             │ GitHub API │
└──┬───┘             └──────┬──────┘             └────────┬────────┘             └──────┬───────┘             └────┬─────┘             └─────┬──────┘
   │                        │                             │                             │                          │                         │     
   │ 1. Escribe username    │                             │                             │                          │                         │     
   │───────────────────────>│                             │                             │                          │                         │     
   │                        │ 2. onChange + Debounce      │                             │                          │                         │     
   │                        │────────────────────────────>│                             │                          │                         │     
   │                        │                             │ 3. safeParse(sanitizedInput)│                          │                         │     
   │                        │                             │────────────────────────────>│                          │                         │     
   │                        │                             │                             │                          │                         │     
   │                        │                             │    { success: true }        │                          │                         │     
   │                        │                             │<····························│                          │                         │     
   │                        │                             │                             │                          │                         │     
   │                        │                             │ 4. startTransition(React 19 Concurrent)                │                         │     
   │                        │                             │──┐                          │                          │                         │     
   │                        │                             │  │ setLoading(true)         │                          │                         │     
   │                        │                             │<─┘                          │                          │                         │     
   │                        │                             │                             │                          │                         │     
   │                        │                             │ 5. get("user:username")     │                          │                         │     
   │                        │                             │───────────────────────────────────────────────────────>│                         │     
   │                        │                             │                             │                          │                         │     
   │                        │                             │    null (Cache MISS)        │                          │                         │     
   │                        │                             │<·······················································│                         │     
   │                        │                             │                             │                          │                         │     
   │                        │                             │ 6. fetchWithResilience() [CircuitBreaker CLOSED]       │                         │     
   │                        │                             │─────────────────────────────────────────────────────────────────────────────────>│     
   │                        │                             │                             │                          │                         │     
   │                        │                             │    200 OK + JSON Payload + x-ratelimit headers         │                         │     
   │                        │                             │<·················································································│     
   │                        │                             │                             │                          │                         │     
   │                        │                             │ 7. set("user:username", user, ttl: 5m)                 │                         │     
   │                        │                             │───────────────────────────────────────────────────────>│                         │     
   │                        │                             │                             │                          │                         │     
   │                        │ 8. Actualiza estado y UI    │                             │                          │                         │     
   │<─────────────────────────────────────────────────────│                             │                          │                         │     
┌──┴───┐             ┌──────┴──────┐             ┌────────┴────────┐             ┌──────┴───────┐             ┌────┬─────┘             ┌─────┬──────┘
│ User │             │ SearchInput │             │ useGitHubSearch │             │ Zod / Schema │             │ LRUCache │             │ GitHub API │
└──────┘             └─────────────┘             └─────────────────┘             └──────────────┘             └──────────┘             └────────────┘
```

---

## 4. Máquina de Estados Finita: Circuit Breaker
> **Objetivo:** Modelar los estados de resiliencia del contactor (`CircuitBreaker.ts`) que previene caídas en cascada y bloquea el consumo innecesario de cuota cuando GitHub falla o agota el rate limit.

```text
                             ┌─────────────────────────────────┐
                             │       ESTADO INICIAL            │
                             │       [*] Inicio del App        │
                             └────────────────┬────────────────┘
                                              │
                                              ▼
                             ┌─────────────────────────────────┐
                 ┌───────────┤             CLOSED              ├───────────┐
                 │           │        (Circuito Sano)          │           │
                 │           └────────────────┬────────────────┘           │
                 │ Exitoso                    │                            │
                 │ failureCount = 0           │ 3 fallos consecutivos      │
                 └────────────────────────────┘ (5xx / Timeout / 429)      │
                                              │                            │
                                              ▼                            │
                             ┌─────────────────────────────────┐           │
                 ┌───────────┤              OPEN               │           │
                 │           │   (Fail-Fast / Cortocircuito)   │           │
                 │           └────────────────┬────────────────┘           │
                 │ Petición entrante          │                            │
                 │ rechazada con error 503    │ Transcurren 20.000 ms      │
                 │ sin tocar la red           │ (resetTimeoutMs Cooldown)  │
                 └────────────────────────────┘                            │
                                              │                            │
                                              ▼                            │
                             ┌─────────────────────────────────┐           │
                             │            HALF_OPEN            │           │
                             │     (Sonda de Prueba Activa)    │           │
                             └────────┬────────────────────────┘           │
                                      │                        │           │
                                      │ 1 fallo en prueba      │ 2 éxitos  │
                                      │ (reabre de inmediato)  │ seguidos  │
                                      └────────────────────────┴───────────┘
```

### Reglas Formales de Transición:
1. **`CLOSED` ➔ `OPEN`**: Se activa cuando `failureCount >= failureThreshold` (predeterminado: **3**). Lanza de inmediato `GitHubCircuitBreakerError` con código HTTP 503 y tiempo de espera estimado `retryAfterMs`.
2. **`OPEN` ➔ `HALF_OPEN`**: Ocurre pasados **20.000 ms** (`resetTimeoutMs`). El circuito permite una cantidad restringida de llamadas para verificar si la red o la API se restablecieron.
3. **`HALF_OPEN` ➔ `CLOSED`**: Requiere **2 éxitos consecutivos** (`successThreshold`). Se reinicia `failureCount = 0`.
4. **`HALF_OPEN` ➔ `OPEN`**: Si ocurre **1 solo error**, el circuito vuelve a abrirse reiniciando el temporizador de 20 segundos.

---

## 5. Algoritmo de Búsqueda Sublineal: RepoSearchIndex
> **Objetivo:** Describir la estructura de datos que permite filtrar miles de repositorios instantáneamente en $O(\log T + k)$ sin congelar el hilo de renderizado.

```text
════════════════════════════════════════════════════════════════════════════════════════════════════════
 FASE 1: CONSTRUCCIÓN DEL ÍNDICE INVERTIDO (Se ejecuta una sola vez al cargar datos: O(N · L))
════════════════════════════════════════════════════════════════════════════════════════════════════════

  Repositorios (N) ──► normalizeAndTokenize() ──► Tokens Únicos (T)
                            │                             │
                            ▼                             ▼
                  tokenIndex: Map<string, Set<number>>   sortedTokens: string[]
                  ┌─────────────────┬────────────────┐   ┌─────────────────────────────┐
                  │ "react"         │ Set(101, 204)  │   │ [ "c++", "dom", "hook",     │
                  │ "nextjs"        │ Set(101, 305)  │   │   "nextjs", "react", ... ]  │
                  │ "hook"          │ Set(204)       │   │ (Ordenados lexicográfic.)   │
                  └─────────────────┴────────────────┘   └─────────────────────────────┘

════════════════════════════════════════════════════════════════════════════════════════════════════════
 FASE 2: BÚSQUEDA SUBLINEAL DE CONSULTA (En cada pulsación de tecla: O(log T + k))
════════════════════════════════════════════════════════════════════════════════════════════════════════

  Consulta de Usuario: "react hook"
            │
            ▼
  Tokens de Búsqueda: ["react", "hook"]
            │
            ├────────────────────────────────────────────────────────────────────────┐
            ▼                                                                        ▼
  [Token 1: "react"]                                                       [Token 2: "hook"]
  • lowerBound("react") ──► Bisección binaria en O(log T)                  • Bisección binaria en O(log T)
  • upperBound("react") ──► Rango de prefijos coincidentes                 • Rango de prefijos coincidentes
            │                                                                        │
            ▼                                                                        ▼
  Postings Set A: {101, 204} (|A| = 2)                                     Postings Set B: {204} (|B| = 1)
            │                                                                        │
            └───────────────────────────────────┬────────────────────────────────────┘
                                                │
                                                ▼
  INTERSECCIÓN PONDERADA POR CARDINALIDAD MÍNIMA: O(min(|A|, |B|))
  1. Ordena los sets por tamaño: [Set B (|B|=1), Set A (|A|=2)]
  2. Itera únicamente sobre el Set más pequeño ({204}) comprobando pertenencia en Set A:
     • ¿Está 204 en Set A? SÍ.
                                                │
                                                ▼
  IDs Coincidentes: {204} ──► repoMap.get(204) en O(1) ──► [ Repo: "react-hook-form" ]
```

---

## 6. Arquitectura Integral por Capas (Clean Architecture)
> **Objetivo:** Demostrar la separación de responsabilidades y el cumplimiento del Principio de Inversión de Dependencias (DIP).

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CAPA 1: PRESENTACIÓN (UI / CLIENT COMPONENTS)                                                          │
│   app/page.tsx · features/github-search/index.tsx                                                      │
│   ┌─────────────────────┐  ┌─────────────────────┐  ┌────────────────────┐  ┌───────────────────────┐  │
│   │   UserProfile.tsx   │  │  BentoStatCard.tsx  │  │    RepoList.tsx    │  │    SearchInput.tsx    │  │
│   └──────────┬──────────┘  └──────────┬──────────┘  └─────────┬──────────┘  └───────────┬───────────┘  │
└──────────────┼────────────────────────┼───────────────────────┼─────────────────────────┼──────────────┘
               ▼                        ▼                       ▼                         ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CAPA 2: APLICACIÓN Y ORQUESTACIÓN DE ESTADO                                                            │
│   features/github-search/hooks/                                                                        │
│   ┌───────────────────────────────────────────────┐   ┌─────────────────────────────────────────────┐  │
│   │ useGitHubSearch.ts                            │   │ useRepoFilters.ts                           │  │
│   │ • startTransition (React 19 Concurrency)      │   │ • Inversión del índice de búsqueda          │  │
│   │ • Orquestador de peticiones y errores Zod     │   │ • Paginación defensiva y ordenación segura  │  │
│   └───────────────────────┬───────────────────────┘   └──────────────────────┬──────────────────────┘  │
└───────────────────────────┼──────────────────────────────────────────────────┼─────────────────────────┘
                            │                                                  │
                            ▼                                                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CAPA 3: DOMINIO Y ALGORITMOS PUROS (Zero Dependencias Externas)                                        │
│   features/github-search/lib/                                                                          │
│   ┌───────────────────────────┐   ┌───────────────────────────┐   ┌─────────────────────────────────┐  │
│   │ RepoSearchIndex.ts        │   │ LRUCache.ts               │   │ CircuitBreaker.ts               │  │
│   │ • Bisección O(log T + k)  │   │ • Hash Map Store en O(1)  │   │ • CLOSED / OPEN / HALF_OPEN     │  │
│   │ • Min-Cardinality Intersec│   │ • Desalojo LRU y TTL      │   │ • Protección ante cascada 5xx   │  │
│   └───────────────────────────┘   └─────────────┬─────────────┘   └────────────────┬────────────────┘  │
└─────────────────────────────────────────────────┼──────────────────────────────────┼───────────────────┘
                                                  ▲                                  ▲
                                                  │                                  │
┌─────────────────────────────────────────────────┴──────────────────────────────────┴───────────────────┐
│ CAPA 4: INFRAESTRUCTURA Y CONTRATOS (DIP)                                                              │
│   features/github-search/api/                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│   │ «interface» IGitHubService                                                                      │  │
│   │ + getUser(username: string): Promise<GitHubUser>                                                │  │
│   │ + getUserRepos(username: string): Promise<GitHubRepo[]>                                         │  │
│   └──────────────────────────────────────────────┬──────────────────────────────────────────────────┘  │
│                                                  ▲                                                     │
│                                                  │ implementa                                          │
│   ┌──────────────────────────────────────────────┴──────────────────────────────────────────────────┐  │
│   │ GitHubApiClient                                                                                 │  │
│   │ • Integra: Zod Schemas (safeParse) + fetchWithResilience + CircuitBreaker + LRUCache            │  │
│   └──────────────────────────────────────────────┬──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┼─────────────────────────────────────────────────────┘
                                                   │ Peticiones HTTPS autenticadas/públicas
                                                   ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CAPA 5: PROVEEDOR EXTERNO                                                                              │
│   ☁️ api.github.com (GitHub REST API v3)                                                               │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Diagrama de Clases, Contratos SOLID y Errores
> **Objetivo:** Mapear la orientación a objetos, los contratos polimórficos de servicio y la taxonomía estricta de excepciones tipadas.

```text
┌──────────────────────────────────────────────────────────┐
│              «interface» IGitHubService                  │
├──────────────────────────────────────────────────────────┤
│ + getUser(username: string, signal?): Promise<User>     │
│ + getUserRepos(username: string, signal?): Promise<Repo[]>│
└────────────────────────────▲─────────────────────────────┘
                             │
                             │ implementa
┌────────────────────────────┴─────────────────────────────┐
│                     GitHubApiClient                      │
├──────────────────────────────────────────────────────────┤
│ - baseUrl: string                                        │
│ - userCache: LRUCache<string, GitHubUser>                │
│ - reposCache: LRUCache<string, GitHubRepo[]>             │
│ - circuitBreaker: CircuitBreaker                         │
│ - retries: number                                        │
│ - baseDelayMs: number                                    │
│ - timeoutMs: number                                      │
├──────────────────────────────────────────────────────────┤
│ + getUser(username, signal): Promise<GitHubUser>         │
│ + getUserRepos(username, signal): Promise<GitHubRepo[]>  │
│ + extractRateLimitInfo(headers): GitHubRateLimitInfo     │
└──────────────┬────────────────────────────┬──────────────┘
               │ compone                    │ compone
               ▼                            ▼
┌──────────────────────────────┐  ┌──────────────────────────────┐
│       LRUCache<K, V>         │  │        CircuitBreaker        │
├──────────────────────────────┤  ├──────────────────────────────┤
│ - capacity: number           │  │ - state: CircuitBreakerState │
│ - defaultTtlMs?: number      │  │ - failureThreshold: number   │
│ - store: Map<K, Node<V>>     │  │ - resetTimeoutMs: number     │
├──────────────────────────────┤  ├──────────────────────────────┤
│ + get(key: K): V | undefined │  │ + execute<T>(fn): Promise<T> │
│ + set(key: K, value: V): void│  │ + getMetrics(): Metrics      │
│ + clear(): void              │  │ + reset(): void              │
└──────────────────────────────┘  └──────────────────────────────┘

                          JERARQUÍA DE ERRORES TIPADOS (DOMAIN ERRORS)
                                  ┌────────────────────────┐
                                  │         Error          │
                                  └───────────▲────────────┘
                                              │
                                  ┌───────────┴────────────┐
                                  │    GitHubApiError      │
                                  │  + status?: number     │
                                  └───────────▲────────────┘
                                              │
            ┌──────────────────┬──────────────┴──────────────┬──────────────────────┐
            │                  │                             │                      │
┌───────────┴──────────┐ ┌─────┴────────────────┐ ┌──────────┴──────────┐ ┌────────┴─────────────┐
│ GitHubNotFoundError  │ │ GitHubRateLimitError │ │ GitHubCircuitBreaker│ │ GitHubValidationError │
│ (Status: 404)        │ │ + rateLimitInfo      │ │ + retryAfterMs (503)│ │ + validationIssues    │
└──────────────────────┘ └──────────────────────┘ └─────────────────────┘ └───────────────────────┘
```

---

## 8. Pipeline de Resiliencia HTTP con Full Jitter Backoff
> **Objetivo:** Visualizar el bucle de ejecución de `fetchWithResilience` (`backoff.ts`) para mitigar el problema del *Thundering Herd* mediante dispersión estocástica.

```text
┌────────────────────────────────────────────────────────┐
│ Llamada Inicial: fetchWithResilience(url, options)     │
└───────────────────────────┬────────────────────────────┘
                            │ attempt = 0
                            ▼
┌────────────────────────────────────────────────────────┐
│ Intento de Petición HTTP con AbortSignal Timeout (8s)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
                  ¿Respuesta Exitosa (2xx)?
                 /                         \
           [SÍ] /                           \ [NO]
               ▼                             ▼
┌────────────────────────────┐    ¿Es error reintentable?
│ Parsear y validar con Zod  │    • Status 5xx (Server Error)
│ Retornar resultado a caché │    • Timeout / Network TypeError
└────────────────────────────┘                 /              \
                                         [SÍ] /                \ [NO] (400, 401, 404)
                                             ▼                  ▼
                              ¿attempt < maxRetries (2)?      ┌─────────────────────────────┐
                                     /            \           │ Lanza GitHubApiError        │
                               [SÍ] /              \ [NO]     │ sin reintentar              │
                                   ▼                ▼         └─────────────────────────────┘
      ┌────────────────────────────────────────┐  ┌─────────────────────────┐
      │ CÁLCULO DE FULL JITTER:                │  │ Agotados los reintentos:│
      │ expDelay = baseDelay * (2 ^ attempt)   │  │ Lanza error definitivo  │
      │ capped = min(maxDelay, expDelay)       │  └─────────────────────────┘
      │ sleep = Math.random() * capped         │
      └───────────────────┬────────────────────┘
                          │
                          ▼
      ┌────────────────────────────────────────┐
      │ delay(sleep, signal) ──► Pausa asíncrona
      │ attempt++ ──► Reintenta petición HTTP  │
      └────────────────────────────────────────┘
```

---

> 📌 **Mantenimiento y Visualización:**  
> Estos diagramas están construidos en **Unicode Box-Drawing puro**, garantizando legibilidad total en cualquier visor Markdown de GitHub, terminal o editor de código sin requerir extensiones externas.  
> Los componentes físicos isométricos equivalentes correspondientes a la skill `anatomy` se encuentran documentados en [`docs/anatomy/index.html`](file:///home/user/github/Frontend/R04.Typescript/typescript01/docs/anatomy/index.html).
