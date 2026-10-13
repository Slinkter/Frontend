# 📝 Registro de Cambios (Changelog)

Todos los cambios notables realizados en este proyecto están documentados en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning (SemVer)](https://semver.org/lang/es/).

---

## 📑 Índice de Versiones

* [Unreleased (Sin Publicar)](#unreleased)
* [0.3.0 - 2026-10-12](#030---2026-10-12) — Suite Scrum & Manuales de Diplomados DMC
* [0.2.0 - 2026-10-12](#020---2026-10-12) — Clean Code, SOLID & Actualización React 19 / Next.js 16
* [0.1.0 - 2026-10-10](#010---2026-10-10) — Lanzamiento Inicial: Aurora Glass & Bento Grid Edition

---

## [Unreleased]

### Planificado para Sprints Futuros (Roadmap Scrum)
- [ ] Implementación de autenticación mediante GitHub OAuth2 con NextAuth v5.
- [ ] Conexión a base de datos persistente PostgreSQL con Drizzle ORM.
- [ ] Integración del motor cognitivo `NL2SQLService` con Claude 3.5 Sonnet.
- [ ] Módulo comparador cara a cara (*Battle Mode*) con cálculo de *Health Score*.
- [ ] Servidor oficial Model Context Protocol (MCP) para interacción con agentes externos.

---

## [0.3.0] - 2026-10-12

### Añadido (Added)
* **Suite Completa de Simulación Scrum (`/scrum`)**:
  * [`scrum/README.md`](./scrum/README.md): Declaración de la Visión del Producto (*Product Vision Statement*), marco metodológico adaptativo AI-First y resumen ejecutivo.
  * [`scrum/01_ROLES_Y_EQUIPO.md`](./scrum/01_ROLES_Y_EQUIPO.md): Directorio de 15 profesionales ficticios distribuidos en 4 Squads funcionales (incluyendo a Ana Suárez, Raúl Corrales, Samanta Ulluke, Diego Arismendi, etc.) con fichas de responsabilidades, herramientas y Matriz RACI transversal.
  * [`scrum/02_PLAN_DE_SPRINTS_Y_FASES.md`](./scrum/02_PLAN_DE_SPRINTS_Y_FASES.md): Plan de 5 Sprints (Sprint 0 al 4) estructurados en 5 Épicas de valor con Historias de Usuario estimadas en Story Points (Fibonacci) y criterios de aceptación en sintaxis formal **Gherkin**.
  * [`scrum/03_ARTEFACTOS_Y_CEREMONIAS.md`](./scrum/03_ARTEFACTOS_Y_CEREMONIAS.md): Definición rigurosa de *Definition of Ready (DoR)* y *Definition of Done (DoD)*, simulación completa de ceremonias (Planning, transcripción de Daily Scrum con 6 integrantes, Backlog Refinement, Review/Demo y Retrospectiva Start/Stop/Continue) y métricas de desempeño (Velocidad: 46 SP, Cycle Time: 2.1 días).
  * [`scrum/04_GLOSARIO_SCRUM.md`](./scrum/04_GLOSARIO_SCRUM.md): Glosario enciclopédico de términos ágiles tradicionales y modernos de ingeniería con IA (desde *Ambiguity Tax*, *BMAD* y *Harness Engineering* hasta *Velocity* y *WIP Limits*).
* **Manuales Maestros de Estudio para Diplomados DMC (`/diplomados`)**:
  * [`diplomados/README.md`](./diplomados/README.md): Índice general y tabla comparativa detallada entre ambos programas de formación.
  * [`diplomados/01_INGENIERIA_DE_SOFTWARE_CON_IA.md`](./diplomados/01_INGENIERIA_DE_SOFTWARE_CON_IA.md): Manual enciclopédico para el diplomado de 88 horas (*AI-Augmented Full-Stack*), con bibliografía obligatoria (*Clean Architecture*, *DDIA*, *AI Engineering* de Chip Huyen), explicaciones de arquitectura en capas, laboratorios prácticos con código completo (`SQLValidator.ts`, `nl2sqlService.ts` con Anthropic SDK) y banco de preguntas de examen.
  * [`diplomados/02_AI_FIRST_SOFTWARE_ARCHITECTURE.md`](./diplomados/02_AI_FIRST_SOFTWARE_ARCHITECTURE.md): Manual maestro para el diplomado de 92 horas (*AI Product Architect*), detallando metodologías *Spec-Driven Development (SDD)*, framework BMAD, arquitectura interna de *Model Context Protocol (MCP)*, *Harness Engineering*, servidor MCP funcional en TypeScript, pipeline de CI/CD en GitHub Actions y banco de preguntas para el Demo Day.

---

## [0.2.0] - 2026-10-12

### Añadido (Added)
* **Principios de Ingeniería Clean Code, DRY y SOLID**:
  * Centralización de constantes operativas en [`constants.ts`](./features/github-search/constants.ts) (`GITHUB_CONFIG`, URLs, timeouts y límites de paginación).
  * Extracción del componente atómico reutilizable [`BentoStatCard.tsx`](./features/github-search/components/BentoStatCard.tsx) con tipografía tabular JetBrains Mono.
  * Principio de Inversión de Dependencias (DIP): Definición de la interfaz [`IGitHubService`](./features/github-search/api/githubService.ts) para desacoplar el origen de datos.
* **Documentación y Certificación**:
  * Auditoría completa de **React Doctor con puntuación 100/100** certificada en el [`README.md`](./README.md).
  * Guía tutorial exhaustiva para desarrolladores que transicionan de JavaScript + React vanilla a TypeScript estricto y Next.js App Router.
* **Entorno Didáctico Vanilla (`/html`)**:
  * Submódulo de estudio con [`html/tsconfig.json`](./html/tsconfig.json) y [`html/README.md`](./html/README.md) explicando el funcionamiento interno de `tsc`, source maps (`.js.map`) y las diferencias entre compilación manual y empaquetadores como Turbopack/Next.js.

### Cambiado (Changed)
* **Actualización del Stack Tecnológico**:
  * Migración a **Next.js 16.4.0** con motor Turbopack optimizado.
  * Migración a **React 19.3.0** y `@types/react` correspondientes.
  * Actualización a **Tailwind CSS v4.3.3** con `@tailwindcss/postcss`.
  * Optimización de importaciones de paquetes en [`next.config.ts`](./next.config.ts) (`lucide-react`, `next-themes`, `zod`, `clsx`).

---

## [0.1.0] - 2026-10-10

### Añadido (Added)
* **Interfaz de Usuario Aurora Glass & Bento Grid**:
  * Cuadrícula asimétrica de 12 columnas con tarjeta de perfil sticky, métricas clave y lista de repositorios con carga progresiva (+24).
  * Estética de *Deep Glassmorphism* con desenfoque de hardware (`backdrop-filter: blur(16px)`), bisel especular interior (`--glass-inset-highlight`) y temas claro/oscuro sin parpadeo (*Pearl Frost* y *Obsidian Aurora*).
* **Motores Algorítmicos de Alto Rendimiento**:
  * [`RepoSearchIndex.ts`](./features/github-search/lib/RepoSearchIndex.ts): Índice invertido en memoria con bisección binaria doble en $O(\log T + k)$ para filtrado por tokens y prefijos en tiempo sublineal.
  * [`LRUCache.ts`](./features/github-search/lib/LRUCache.ts): Memoria caché con desalojo pasivo y TTL en tiempo constante $O(1)$.
  * [`CircuitBreaker.ts`](./features/github-search/lib/CircuitBreaker.ts): Máquina de estados (`CLOSED`, `OPEN`, `HALF_OPEN`) y reintentos con *Exponential Backoff* y *Full Jitter* contra bloqueos de cuota de red.
* **Biblioteca de Componentes Accesibles (`@/components/ui/`)**:
  * Primitivos accesibles con Radix UI y CVA: `Button`, `Card`, `Badge`, `Input`, `Select` y notificaciones `Toast` con regiones vivas `aria-live`.
* **Validación Estricta de Datos**:
  * Esquemas **Zod** en tiempo de ejecución para usuarios y repositorios con sanitización defensiva contra URLs maliciosas (`javascript:`, `data:`).
* **Batería de Pruebas Automatizadas QA**:
  * Suite de 15 pruebas de edge-cases ([`qa_audit_test.mjs`](./features/github-search/lib/__tests__/qa_audit_test.mjs)) con 100% de tasa de aprobación.
