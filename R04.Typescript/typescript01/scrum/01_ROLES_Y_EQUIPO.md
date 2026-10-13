# 👥 Directorio de Roles, Especialistas y Matriz RACI
> **Proyecto**: GitHub Intelligence Platform • **Célula de Desarrollo**: 15 Profesionales

---

## 📑 Tabla de Contenidos

1. [Estructura del Equipo y Gobernanza](#1-estructura-del-equipo-y-gobernanza)
2. [Fichas Individuales de los 15 Profesionales](#2-fichas-individuales-de-los-15-profesionales)
3. [Matriz RACI del Proyecto](#3-matriz-raci-del-proyecto)
4. [Canales de Comunicación y Flujos de Escalado](#4-canales-de-comunicación-y-flujos-de-escalado)

---

## 1. Estructura del Equipo y Gobernanza

El equipo está diseñado con un modelo **Spotify Squads adaptado a AI-First**, donde los 15 miembros se organizan en células de especialidad con objetivos compartidos en cada Sprint:

* **Liderazgo de Producto y Proceso**: Product Owner (PO), Scrum Master (SM), AI Product Architect.
* **Squad 1: Experiencia de Producto & UX/UI (3 personas)**: Investigación, diseño visual, sistemas de diseño y especificaciones para LLMs.
* **Squad 2: Frontend Engineering (2 personas)**: Rendimiento en React 19, integración de Bento Grid y accesibilidad WCAG.
* **Squad 3: Backend, Datos & IA (4 personas)**: Arquitectura en capas, bases de datos relacionales, ingeniería de datos y modelos cognitivos.
* **Squad 4: QA, SecOps & Plataforma (3 personas)**: Automatización de pruebas, infraestructura en la nube y auditoría de seguridad.

---

## 2. Fichas Individuales de los 15 Profesionales

### 👑 Liderazgo y Gobernanza

#### 1. Mariana Valdivia — *Product Owner (PO)*
* **Squad**: Liderazgo de Producto
* **Responsabilidades Clave**:
  * Define la visión estratégica del producto y el retorno de inversión (ROI).
  * Prioriza y gestiona el *Product Backlog* según el valor aportado a usuarios y reclutadores técnicos.
  * Valida y aprueba los incrementos funcionales al final de cada Sprint en el *Sprint Review*.
  * Define los criterios de aceptación funcionales junto a los usuarios y stakeholders.
* **Herramientas de Trabajo**: Plane / Jira, Miro, Notion, Google Analytics.

#### 2. Carlos 'Charly' Mendoza — *Scrum Master & Agile Coach*
* **Squad**: Liderazgo de Producto
* **Responsabilidades Clave**:
  * Facilita y asegura el cumplimiento de las ceremonias Scrum (Planning, Daily, Review, Retrospective).
  * Detecta y remueve impedimentos técnicos y organizacionales que bloqueen el avance del equipo.
  * Monitorea métricas ágiles: velocidad del equipo (*Velocity*), tiempo de ciclo (*Cycle Time*) y gráficos *Burndown*.
  * Vela por la salud emocional y ritmo sostenible (*Sustainable Pace*) de la célula.
* **Herramientas de Trabajo**: Plane / Jira Agile Boards, Parabol (Retrospectivas), Slack.

#### 3. Héctor Quintana — *AI Product Architect & Tech Lead*
* **Squad**: Arquitectura & Liderazgo Técnico
* **Responsabilidades Clave**:
  * Diseña la arquitectura global del sistema (Next.js 16, Layered Backend, MCP, Drizzle ORM).
  * Establece la **Constitución del Proyecto (`constitution.md`)** y las reglas técnicas no negociables.
  * Supervisa el estándar de *Spec-Driven Development (SDD)* para que los agentes y desarrolladores no generen código disperso.
  * Resuelve debates técnicos de alto impacto y autoriza fusiones a la rama `main`.
* **Herramientas de Trabajo**: VS Code, Claude Code CLI, Mermaid, GitHub Enterprise.

---

### 🎨 Squad UX/UI & Product Experience

#### 4. Ana Suárez — *Lead UX & Product Researcher*
* **Squad**: Experiencia de Producto
* **Responsabilidades Clave**:
  * Diseña los flujos de interacción del usuario (*User Flows*) para la búsqueda, el *Battle Mode* y el chat NL2SQL.
  * Conduce entrevistas con desarrolladores y reclutadores para validar problemas de usabilidad.
  * Traduce descubrimientos de usabilidad en wireframes interactivos y mapas de experiencia.
  * Asegura que las interacciones del Bento Grid no sobrecarguen cognitivamente al usuario.
* **Herramientas de Trabajo**: Figma, Maze, FigJam, Dovetail.

#### 5. Samanta Ulluke — *Lead Graphic & UI Designer*
* **Squad**: Experiencia de Producto
* **Responsabilidades Clave**:
  * Crea y mantiene la identidad visual **Aurora Glass** (paletas cromáticas, variables de refracción, desenfoques acrílicos).
  * Diseña y expande los componentes del **Design System** en Figma sincronizados con `@/components/ui`.
  * Diseña ilustraciones SVG optimizadas, estados vacíos (*Empty States*) y tarjetas de métricas visuales.
  * Garantiza el cumplimiento de contrastes cromáticos WCAG AA/AAA en modos claro y oscuro.
* **Herramientas de Trabajo**: Figma, Illustrator, Tokens Studio for Figma, Spline (3D).

#### 6. Sofía Cárdenas — *AI Prompt Engineer & Spec Writer*
* **Squad**: Experiencia de Producto & Arquitectura
* **Responsabilidades Clave**:
  * Redacta especificaciones formales no ambiguas (**SDD**) para que los agentes de IA construyan módulos sin alucinaciones.
  * Diseña, versiona y afina los *System Prompts* del asistente NL2SQL con delimitadores XML estructurados.
  * Crea datasets de pruebas con casos adversos (jailbreaks, prompts maliciosos) para evaluar la resiliencia del modelo.
* **Herramientas de Trabajo**: Langfuse, Anthropic Console, VS Code, Markdown.

---

### ⚡ Squad Frontend Engineering

#### 7. Diego Arismendi — *Senior Frontend Engineer (React 19 Core)*
* **Squad**: Frontend Engineering
* **Responsabilidades Clave**:
  * Implementa componentes de alto rendimiento en React 19 aprovechando *Server Components* y `useTransition`.
  * Optimiza el motor de búsqueda en cliente manteniendo tiempo sublineal $O(\log n)$ en [`RepoSearchIndex.ts`](../features/github-search/lib/RepoSearchIndex.ts).
  * Asegura cero saltos visuales de hidratación (*CLS = 0*) y renderizado ultra veloz (*TTFB < 200ms*).
* **Herramientas de Trabajo**: Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Chrome DevTools Performance.

#### 8. Lucía Paredes — *Frontend Engineer (UI Components & WCAG)*
* **Squad**: Frontend Engineering
* **Responsabilidades Clave**:
  * Construye y valida los primitivos accesibles con **Radix UI** y **Class Variance Authority (CVA)**.
  * Garantiza navegación fluida con teclado en todos los modales, *Selects* y paneles del Bento Grid.
  * Implementa regiones vivas `aria-live` para que los lectores de pantalla anuncien resultados de búsqueda y alertas toast.
* **Herramientas de Trabajo**: Radix UI, Axe DevTools, Screen Readers (NVDA / VoiceOver), Tailwind CSS.

---

### ⚙️ Squad Backend, Datos & IA

#### 9. Mateo Benavides — *Backend Tech Lead*
* **Squad**: Backend & Datos
* **Responsabilidades Clave**:
  * Diseña y custodia la **Arquitectura por Capas (*Layered Architecture*)** en Next.js Route Handlers y Server Actions.
  * Define los contratos de interfaces TypeScript para inyección de dependencias (`IRepoRepository`, `IUserService`).
  * Implementa políticas de seguridad, manejo unificado de errores y middlewares de autenticación.
* **Herramientas de Trabajo**: Node.js 22, TypeScript, Next.js App Router, Zod, Postman.

#### 10. Valeria Quispe — *Senior Backend & Cloud Database Engineer*
* **Squad**: Backend & Datos
* **Responsabilidades Clave**:
  * Diseña y mantiene el esquema de base de datos relacional en **PostgreSQL** mediante **Drizzle ORM**.
  * Modela las migraciones de esquemas, índices compuestos y claves foráneas.
  * Configura e integra la caché distribuida con **Redis (Upstash)** para reducir el consumo de cuotas de la API de GitHub.
* **Herramientas de Trabajo**: PostgreSQL, Drizzle ORM, Drizzle Studio, Redis, Neon Database.

#### 11. Raúl Corrales — *Lead Data Engineer*
* **Squad**: Backend & Datos
* **Responsabilidades Clave**:
  * Diseña los pipelines de ingesta y normalización de datos extraídos de la API de GitHub (REST y GraphQL).
  * Implementa el algoritmo de **Health Score** de repositorios (ponderación de commits, forks, issues y licencias).
  * Optimiza consultas analíticas agregadas (cálculo de percentiles de popularidad, distribución de lenguajes).
* **Herramientas de Trabajo**: Python 3.11, DuckDB, Pandas, SQL avanzado, GitHub GraphQL API.

#### 12. Esteban Salazar — *AI / LLM & MCP Engineer*
* **Squad**: Backend & Datos / IA
* **Responsabilidades Clave**:
  * Implementa el servicio **`NL2SQLService`** utilizando el SDK de Anthropic (Claude 3.5 Sonnet).
  * Desarrolla el servidor **Model Context Protocol (MCP)** en TypeScript para exponer herramientas a agentes externos.
  * Construye y prueba los filtros de sanitización `SQLValidator` para prevenir inyecciones SQL en consultas generadas por IA.
* **Herramientas de Trabajo**: `@modelcontextprotocol/sdk`, `@anthropic-ai/sdk`, TypeScript, pgvector.

---

### 🛡️ Squad QA, SecOps & Plataforma

#### 13. Camila Rondón — *Lead QA Automation & Test Harness Specialist*
* **Squad**: QA & Plataforma
* **Responsabilidades Clave**:
  * Construye y lidera el arnés de pruebas automatizadas (*Test Harness*) en integración continua.
  * Implementa pruebas de extremo a extremo (E2E) con **Playwright** que cubren flujos críticos de usuario.
  * Mantiene la suite de pruebas unitarias y de edge-cases ([`qa_audit_test.mjs`](../features/github-search/lib/__tests__/qa_audit_test.mjs)) con 100% de tasa de éxito.
* **Herramientas de Trabajo**: Playwright, Vitest, Node Test Runner, GitHub Actions.

#### 14. Javier Beltrán — *DevSecOps & Cloud Infrastructure Engineer*
* **Squad**: QA & Plataforma
* **Responsabilidades Clave**:
  * Diseña y optimiza el empaquetado del proyecto en imágenes multicapa seguras con **Docker**.
  * Configura y mantiene los pipelines de CI/CD en **GitHub Actions** (linting, type-check, auditoría de dependencias y build).
  * Configura el monitoreo de infraestructura y métricas de rendimiento con **Prometheus y Grafana**.
* **Herramientas de Trabajo**: Docker, GitHub Actions, AWS (ECS / Fargate), Prometheus, Grafana, Linux.

#### 15. Ignacio Morales — *Performance & Security Auditor*
* **Squad**: QA & Plataforma
* **Responsabilidades Clave**:
  * Realiza auditorías de seguridad estática y dinámica alineadas con el estándar **OWASP Top 10 para LLMs**.
  * Verifica que las credenciales de base de datos utilizadas por el módulo de IA cuenten exclusivamente con privilegios `SELECT`.
  * Ejecuta pruebas de estrés y rendimiento de red con **k6** para verificar resiliencia ante alta concurrencia.
* **Herramientas de Trabajo**: k6, OWASP ZAP, Snyk, SonarQube, Lighthouse.

---

## 3. Matriz RACI del Proyecto

La matriz RACI define la responsabilidad de cada rol frente a los hitos mayores:
* **R (Responsible)**: Quien ejecuta el trabajo directamente.
* **A (Accountable)**: Quien tiene la responsabilidad final y aprueba el resultado (solo 1 por tarea).
* **C (Consulted)**: Especialista consultado bidireccionalmente por su conocimiento.
* **I (Informed)**: Se le notifica del avance o resultado final.

| Hito / Épica de Trabajo | PO | SM | Arch | UX (Ana) | UI (Samy) | FE (Diego) | BE (Mateo) | Data (Raúl) | AI (Esteban) | QA (Camila) | SecOps (Javier) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Definición de Historias y Criterios (DoR)** | **A** | C | C | R | C | I | I | I | I | C | I |
| **Diseño Visual Bento & Aurora Glass** | C | I | C | C | **R/A** | C | I | I | I | I | I |
| **Arquitectura de Persistencia & Drizzle ORM** | I | I | **A** | I | I | I | R | C | I | C | C |
| **Motor Cognitivo NL2SQL & SQLValidator** | C | I | C | I | I | I | C | C | **R/A** | C | C |
| **Módulo Battle Mode & Health Score** | C | I | C | C | C | R | C | **R/A** | C | C | I |
| **Servidor Model Context Protocol (MCP)** | I | I | C | I | I | I | C | I | **R/A** | C | I |
| **Arnés de Pruebas E2E y Suite de QA** | I | C | C | I | I | C | C | I | I | **R/A** | C |
| **Pipeline CI/CD, Docker & Despliegue** | I | C | C | I | I | I | I | I | I | C | **R/A** |
| **Aprobación del Incremento (Sprint Review)** | **A** | C | C | C | C | C | C | C | C | C | C |

---

## 4. Canales de Comunicación y Flujos de Escalado

1. **Daily Standup Virtual**: 15 minutos diarios a las 09:30 AM vía canal de voz. Estructura estricta: ¿Qué completé ayer? ¿Qué completaré hoy? ¿Qué impedimentos tengo?
2. **Escalado de Bloqueos (Impediments)**:
   * Bloqueo funcional $\rightarrow$ Resolver con Mariana Valdivia (PO).
   * Bloqueo arquitectónico o de contratos $\rightarrow$ Resolver con Héctor Quintana (Tech Lead).
   * Bloqueo entre personas, dependencias o herramientas $\rightarrow$ Gestionar con Charly Mendoza (Scrum Master).
3. **Flujo de Pull Requests (GitHub)**:
   * Todo PR requiere mínimo **dos aprobaciones**: una del líder de squad correspondiente y otra de QA (Camila Rondón) con la suite de CI/CD en verde.
