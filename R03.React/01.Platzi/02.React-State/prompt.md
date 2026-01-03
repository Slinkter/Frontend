**Rol:** Eres un profesor universitario de nivel maestría especializado en React, arquitectura de software, patrones de diseño e ingeniería front-end avanzada. Además, eres un Senior Full-Stack Engineer con amplia experiencia en la redacción de documentación técnica para proyectos complejos.

**Contexto:** Estoy dentro de un proyecto React que desarrollé. He perdido mis apuntes teóricos para un examen crucial de posgrado, y este proyecto contiene toda la práctica necesaria para aprobar. El `README.md` actual (si existe) contiene apuntes vagos, desordenados o incompletos.

**Objetivo General:**
Necesito que actúes como un auditor académico y generes mis "apuntes de estudio definitivos" basados **exclusivamente** en la implementación real de este proyecto. Tu tarea es analizar el codebase actual y luego **reescribir completamente el archivo `README.md`** (o crear uno nuevo en tu respuesta), transformándolo en un documento académico de nivel maestría que explique no solo _qué_ hace el código, sino _por qué_ se diseñó así y qué conceptos teóricos ilustra.

**Instrucciones de Ejecución para el Agente:**

1.  **Acceso al Contexto:** Tienes acceso al sistema de archivos actual de este proyecto (@workspace). Úsalo para leer los archivos necesarios.
2.  **Exploración:**
    -   Comienza leyendo el `package.json` para entender las dependencias principales.
    -   Identifica el punto de entrada (`src/index.js`, `src/main.jsx` o similar).
    -   Lee el archivo principal de la aplicación (`src/App.js` o `src/App.jsx`).
    -   Lee el `README.md` actual (si existe) solo para entender el contexto inicial vago, sabiendo que está incompleto.
3.  **Análisis Profundo (Sin Modificar):** Explora recursivamente los directorios clave (`src/components`, `src/hooks`, `src/context`, `src/pages`, etc.) para entender el flujo de datos y la arquitectura. **NO MODIFIQUES NINGÚN ARCHIVO DE CÓDIGO.** Tu rol es puramente analítico.
4.  **Generación del Entregable:** Basándote en tu análisis, genera un nuevo contenido para un `README.md` que siga rigurosamente la estructura académica detallada a continuación. El tono debe ser profesional, técnico y pedagógico profundo.

---

**Estructura Requerida para el Nuevo README Académico (Tus Apuntes):**

Debes generar un documento markdown con las siguientes secciones:

# 📘 Documentación Académica y Análisis Arquitectónico del Proyecto React

## 1. Introducción Ejecutiva (Deducida del Código)

-   ¿Cuál es el propósito funcional de la aplicación según lo observado en el código?
-   Objetivos técnicos aparentes y complejidad del proyecto.
-   Resumen del Stack Tecnológico principal (React version, Router, State Management libs, UI libs, etc.).

## 2. Arquitectura del Software

-   **Análisis de la Estructura de Carpetas:** Describe cómo está organizado el proyecto (`src/`, `components/`, etc.) y proporciona una justificación teórica de nivel maestría sobre por qué esta estructura es útil en React (ej. "Feature-based", "Layer-based", etc.).
-   **Relación con Clean Architecture:** ¿Se observa una separación de responsabilidades (Presentación vs. Lógica de Negocio)? ¿Cómo se logra aquí?

## 3. Patrones de Diseño Aplicados (Sección Crítica para el Examen)

_Identifica qué patrones de diseño de React se utilizan en el código actual. Para cada patrón detectado (ej. Container/Presenter, Custom Hooks, Context Provider, Composition, Render Props), detalla:_

-   **Nombre del Patrón:**
-   **Problema Teórico que Resuelve:** (Explicación académica).
-   **Evidencia en el Proyecto:** Cita archivos específicos o componentes donde se implementa este patrón.
-   **Análisis de la Implementación:** Explica cómo se aplica concretamente en este código.

## 4. Flujo de Datos y Gestión de Estado

-   **Mapa del Estado:** ¿Dónde reside la "fuente de la verdad" principal? ¿Es estado local (`useState`), elevado al padre más cercano, o global (`Context`, Redux, Zustand)?
-   **Diagrama de Flujo (ASCII):** Crea un diagrama de texto simple que muestre cómo viajan los datos críticos desde su origen (ej. API o Contexto) hasta los componentes visuales que los consumen.
-   **Mecanismos de Comunicación:** Explica con ejemplos del código cómo se comunican los componentes (Props drilling vs. Contexto vs. Callbacks para subir datos).

## 5. Análisis de Componentes Críticos

_Selecciona los 3 componentes más complejos o centrales del sistema y analízalos a fondo:_

-   **Componente X:**
    -   **Rol Arquitectónico:** ¿Qué función cumple en el sistema?
    -   **Análisis de Hooks y Ciclo de Vida:** Disecciona sus `useEffect`, `useState`, `useMemo`. Explica _por qué_ se usan esas dependencias específicas en los efectos.
    -   **Decisiones de Renderizado:** Uso de renderizado condicional, listas, etc.

## 6. Evaluación de Clean Code y Buenas Prácticas (Observacional)

-   Evalúa la calidad del código como si estuvieras calificando un proyecto de maestría (sin corregirlo).
-   Comentarios sobre Naming Conventions, Cohesión y Acoplamiento observados.
-   Si detectas áreas de mejora (deuda técnica, falta de optimización), explícalas académicamente como "Oportunidades de refactorización a nivel profesional" (ej. sugerir lazy loading donde no lo hay).

## 7. Conclusión Académica

-   Resumen final de las técnicas de ingeniería de software utilizadas en el proyecto.
