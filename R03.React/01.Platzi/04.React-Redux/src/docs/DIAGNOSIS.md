# Diagnóstico Técnico del Proyecto

**Estado:** Fase 1 Completada
**Fecha:** 2026-01-03
**Auditor:** AI Senior Architect

---

## 1. Arquitectura

El proyecto presenta una estructura base de React con Redux, pero carece de una arquitectura escalable y profesional. Se observan violaciones significativas a los principios de diseño.

- **Violación de Container/Presentation:** No existe una separación estricta. Componentes de presentación (ej. `Header.jsx`, `CarouselItem.jsx`) están conectados directamente a Redux (`connect`), lo que los hace difíciles de reutilizar y probar. La lógica de negocio está acoplada a la vista.
- **Falta de Feature-Based Architecture:** La estructura es técnica (`components`, `containers`, `actions`) en lugar de funcional (ej. `features/auth`, `features/player`). Esto dificulta la escalabilidad.
- **Acoplamiento:** Componentes visuales dependen de acciones específicas de Redux importadas de `../tools/actions`.

## 2. Naming (Auditoría Estricta)

Se detectaron inconsistencias graves en las convenciones de nombres que no corresponden a un nivel profesional.

- **Variables PascalCase incorrectas:**
  - En `CarouselItem.jsx`: `MapDispatchToProps` (debería ser `mapDispatchToProps`).
  - En `Header.jsx`: `MapDispatchToProps` (implícito en el connect, pero inconsistente si se explicita).
- **Mal uso de Componentes vs Variables:**
  - En `Home.jsx`: Se definen variables que contienen JSX (`ListFavorite`, `ListTrends`) dentro del cuerpo del componente. Esto es un antipatrón; deberían ser componentes renderizados directamente o funciones de renderizado, no variables pascalCase simulando componentes.
- **Archivos:** Los nombres de archivos parecen correctos (PascalCase para componentes).

## 3. Componentes Grandes y Responsabilidades

- **CarouselItem.jsx:** Aunque no es excesivamente largo, tiene demasiadas responsabilidades: renderizado, manejo de loaders, conexión a redux, lógica de favoritos.
- **Home.jsx:** Actúa como un "page" pero mezcla lógica de selección de categorías con la presentación.
- **Header.jsx:** Mezcla UI con lógica de sesión (logout).

## 4. Imports y Rutas

- **Uso excesivo de rutas relativas:** `../../components/...`, `../assets/...`. Esto hace que el código sea frágil ante refactorizaciones de estructura de carpetas.
- **Falta de Alias:** No se ha configurado el alias `@` en Vite, lo que obliga al "dot-dot hell".

## 5. UX / UI (Evaluación Crítica)

- **Layout Improvisado:** Se usa `Carousel` con `flex` y `overflow-x`. Si bien es válido para carruseles, la instrucción requiere "Grid" como layout principal. El diseño actual es horizontal (tipo Netflix clásico) pero la estructura base no usa CSS Grid para el maquetado de la página.
- **Componentes Visuales:** `CarouselItem` usa valores arbitrarios (`w-[200px]`, `h-[300px]`). Esto rompe la responsividad fluida y depende de "magic numbers".
- **Feedback de Usuario:** Los estados de carga están presentes pero implementados de manera ad-hoc dentro de cada item (`isLoading` state local).

---

## Puntos Críticos a Resolver (Plan de Acción)

1.  **Refactorización de Redux:** Desacoplar componentes de presentación. Solo los `Containers` o custom hooks deben conectar con el store.
2.  **Configuración de Alias:** Implementar `@/` para imports limpios.
3.  **Renombramiento:** Corregir `MapDispatchToProps` y reescribir la lógica de renderizado condicional en `Home.jsx`.
4.  **UI System:** Reemplazar valores arbitrarios (`px-[5%]`) por un sistema de grid consistente o contenedores `max-w` estándar.

Este diagnóstico marca el inicio de la reestructuración profesional del proyecto.
