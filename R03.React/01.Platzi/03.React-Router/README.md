# 📘 Proyecto React — Documentación Académica Nivel Maestría

**Materia:** Arquitectura de Software Frontend Avanzada
**Versión del Análisis:** 1.0.0
**Tecnología Base:** React 18 + React Router v6

---

## 1. Introducción al Proyecto

### 1.1 Contexto del Curso
Este proyecto se presenta como la culminación práctica de un módulo avanzado de especialización en React. No busca ser simplemente una aplicación funcional, sino un artefacto de estudio que demuestra el dominio de la gestión de estado, el enrutamiento del lado del cliente (Client-Side Routing) y la aplicación de patrones de diseño estructurales sin dependencia de frameworks meta (como Next.js).

### 1.2 Problema que Resuelve
El desarrollo de interfaces modernas requiere gestionar la asincronía, la persistencia y la navegación de forma fluida. Este proyecto resuelve la problemática de **"Persistencia y Sincronización en SPAs Serverless"**:
1.  Permite operaciones CRUD completas en un entorno volátil (navegador).
2.  Mantiene el estado sincronizado entre múltiples ventanas (problema de concurrencia en cliente).
3.  Provee URLs compartibles y navegables sin backend dedicado.

### 1.3 Objetivos Técnicos
*   Implementar una arquitectura desacoplada basada en **hooks**.
*   Demostrar el uso de **Composición** sobre herencia o prop-drilling excesivo.
*   Gestionar el ciclo de vida de datos asíncronos (Loading/Error/Success) mediante máquinas de estado finitas implícitas.

---

## 2. Arquitectura General

### 2.1 Estructura de Carpetas
La organización del código sigue una arquitectura híbrida **"Feature-sliced" simplificada**:

```
src/
├── components/      # UI Layer (Dumb Components)
├── hooks/           # Domain & Data Layer (Smart Logic)
├── pages/           # View Layer (Controllers/Composition Roots)
├── routes/          # Navigation Configuration
├── styles/          # Visual Layer (CSS Modules/Global)
└── main.jsx         # Entry Point
```

### 2.2 Justificación Arquitectónica
Se ha optado por separar rigurosamente la **Vista** (`pages/` y `components/`) de la **Lógica** (`hooks/`).
*   **Principio:** Separation of Concerns (SoC).
*   **Beneficio:** La lógica de negocio (`useTodos`) es portable. Podríamos cambiar la interfaz visual de Web a React Native y reutilizar el 90% de la lógica en `hooks/`.

### 2.3 Relación con Clean Architecture
*   **Entities:** Los objetos TODO (JSON crudo en localStorage).
*   **Use Cases:** Encapsulados en `useTodos` (add, delete, complete).
*   **Interface Adapters:** `useLocalStorage` adapta la API del navegador a la Reactividad.
*   **Frameworks/Drivers:** React y ReactDOM, relegados a la capa más externa (`main.jsx`).

### 2.4 Diagrama de Flujo del Proyecto

```ascii
[ Browser Event ]      [ URL Change ]
       |                     |
       v                     v
[ useStorageListener ] [ HashRouter ]
       |                     |
       v                     v
[ useLocalStorage ] -> [ HomePage (Controller) ]
       ^                     |
       | (Data/State)        | (Render Instructions)
       |                     v
[ useTodos (Logic) ] <- [ Components (UI) ]
```

---

## 3. Patrones de Diseño Aplicados

### 3.1 Container/Presenter Pattern (Adaptado)
*   **¿Qué problema resuelve?** Mezclar lógica de obtención de datos con marcado HTML hace componentes difíciles de leer y testear.
*   **Implementación:**
    *   **Container (Controller):** `src/pages/Home/HomePage.jsx`. Obtiene los datos, gestiona los handlers y orquesta.
    *   **Presenter (View):** `src/components/TodoList`, `TodoItem`. Solo reciben datos y pintan.
*   **Explicación Maestría:** Aunque Hooks reducen la necesidad de contenedores de clase estrictos, `HomePage` actúa como el *boundary* donde la lógica se inyecta, manteniendo a los componentes hijos puros.

### 3.2 Custom Hooks Pattern
*   **¿Por qué es útil?** Permite extraer lógica de estado (stateful logic) para ser reutilizada y testeada aisladamente.
*   **Uso en Codebase:** `useTodos.js`.
*   **Código:**
    ```javascript
    function useTodos() {
        const { item, saveItem, ... } = useLocalStorage(...);
        const addTodo = (text) => { ... };
        return { state, stateUpdaters };
    }
    ```
*   **Análisis:** Este hook actúa como una capa de servicio. Los componentes no saben que existe `localStorage`, solo saben que existe `addTodo`.

### 3.3 Compound Components Pattern (Implicit)
*   **¿Dónde se usa?** `src/components/TodoHeader/index.jsx`.
*   **Código:**
    ```javascript
    React.Children.toArray(children).map(child =>
        React.cloneElement(child, { loading })
    )
    ```
*   **Explicación:** `TodoHeader` y sus hijos (`TodoSearch`, `TodoCounter`) funcionan en conjunto. El padre inyecta props (`loading`) implícitamente, permitiendo una API de consumo limpia en `HomePage`.

### 3.4 Inversión de Control (IoC) via Render Props/Composition
*   **Uso en Codebase:** `src/components/TodoList/index.jsx`.
*   **Explicación:** `TodoList` no decide qué pintar dentro. Delega esa responsabilidad a `HomePage` mediante `children` o `render` prop.
    ```jsx
    <TodoList>
      {(todo) => <TodoItem ... />}
    </TodoList>
    ```
    Esto cumple el principio **Open/Closed**: `TodoList` está cerrado a modificación (su lógica de lista es fija) pero abierto a extensión (puedes pintar lo que quieras dentro).

---

## 4. Flujo de Datos

### 4.1 Flujo Unidireccional (One-Way Data Flow)
Los datos viajan estrictamente "hacia abajo" (Parent -> Child) y las acciones "hacia arriba" (Child -> Parent -> Hook -> State Update).

### 4.2 Estado Local vs Global
*   **Estado Global (Persistente):** Gestionado por `useLocalStorage` + `useTodos`. Se comparte conceptualmente (aunque implementado via prop-drilling desde las Pages).
*   **Estado Local (Efímero):** `searchValue` en `useTodos` o el estado del formulario en `TodoForm`.

### 4.3 Diagrama ASCII del Estado

```ascii
[ localStorage ]
      | (Read)
      v
[ useLocalStorage (Reducer) ]
      | { item, loading, error }
      v
[ useTodos (Business Logic) ]
      | { totalTodos, searchedTodos... }
      v
[ HomePage ]
      | (Props down)
      v
[ TodoList ] -> [ TodoItem ]
```

---

## 5. Componentes Principales

### A. `useLocalStorage.js` (Infrastructure)
*   **Rol:** Persistencia y Máquina de Estados.
*   **Decisión de Diseño:** Uso de `useReducer` en lugar de múltiples `useState`.
    *   *Justificación:* Cuando los cambios de estado dependen del estado anterior o son complejos (ej. `ON_SUCCESS` debe apagar `loading` Y setear `item`), un reducer garantiza transiciones atómicas y predecibles.

### B. `App.jsx` (Router Root)
*   **Rol:** Enrutador principal.
*   **Decisión:** Uso de `HashRouter`.
    *   *Justificación:* Permite despliegue en servidores estáticos (GitHub Pages, Netlify basic) sin configuración de reescritura de URL (URL Rewrite), ya que el hash `#` es gestionado exclusivamente por el cliente.

### C. `TodoHeader.jsx` (Compound Parent)
*   **Rol:** Agrupador UI.
*   **Props Importantes:** `loading` (inyectada a hijos).
*   **Comentario Sugerido:**
    ```javascript
    // PRECAUCIÓN: Este componente clona elementos.
    // Asegurarse de que los hijos acepten la prop 'loading'.
    ```

---

## 6. Clean Code Aplicado al Proyecto

### 6.1 Nombres Significativos
*   `sincronizeItem`: Verbo claro, indica acción de resincronización externa.
*   `onEmptySearchResults`: Handler específico para un estado de borde UI.

### 6.2 Cohesión y Acoplamiento
*   **Alta Cohesión:** `useTodos` agrupa TODAS las reglas de negocio de los TODOs.
*   **Bajo Acoplamiento:** `TodoItem` recibe primitivos (`text`, `completed`) y funciones (`onComplete`), no objetos complejos ni instancias de clases.

### 6.3 Refactorings Recomendados (Crítica Académica)
1.  **Prop Drilling en `HomePage`:** `HomePage` extrae todo de `useTodos` y lo pasa uno a uno a los hijos.
    *   *Solución:* Implementar `TodoContext` para proveer el estado globalmente y evitar pasar props manualmente a través de capas intermedias.
2.  **Performance:** El filtrado de búsqueda se ejecuta en cada render (`data.filter(...)`).
    *   *Solución:* Envolver el cálculo en `useMemo` para memorizar el resultado hasta que cambie `data` o `searchValue`.

---

## 7. Tecnologías y Justificación Académica

### 7.1 React Router DOM v6
*   **Uso:** `HashRouter`, `Routes`, `Route`, `useNavigate`, `useParams`, `useLocation`.
*   **Justificación:** Estándar de facto para routing en React. Permite SPA real (sin recarga de página). La v6 introduce el patrón de "Object-based routing" y hooks mejorados.

### 7.2 React Hooks (Core)
*   `useState`, `useEffect`: Primitivos básicos.
*   `useReducer`: Para lógica de estado compleja (implementado en `useLocalStorage`).
*   **Justificación:** Permiten la programación funcional en componentes, eliminando la complejidad del `this` en clases.

### 7.3 CSS Vanilla + BEM
*   **Justificación:** Aunque existen Tailwind o Styled Components, el uso de CSS nativo con convención BEM (`.TodoItem-p--complete`) demuestra comprensión de la especificidad y cascada de CSS sin abstracciones.

---

## 8. Posibles Mejoras (Nivel Profesional)

Para llevar este proyecto a un nivel "Production-Ready", se sugiere:

1.  **React Query (TanStack Query):** Reemplazar `useLocalStorage` con React Query. Maneja caché, reintentos, validación de foco y sincronización de ventana automáticamente.
2.  **Testing Strategy:**
    *   **Unit:** Jest + React Testing Library para `useTodos` (probar lógica pura).
    *   **E2E:** Cypress o Playwright para probar el flujo completo de creación y navegación.
3.  **Code Splitting:**
    *   Usar `React.lazy` y `Suspense` en las rutas de `App.jsx` para no cargar el código de `EditTodoPage` hasta que el usuario navegue allí.
4.  **TypeScript:** Migrar a TS para tipado estático de las interfaces de los objetos TODO.

---

## 9. Conclusión Académica

Este proyecto es un ejemplo paradigmático de **Arquitectura React Escalable**. Demuestra que una buena arquitectura no depende de librerías externas, sino de la aplicación correcta de patrones fundamentales como **Separation of Concerns**, **Composition** y **State Management**.

El estudiante demuestra capacidad para construir sistemas robustos, entendiendo no solo *cómo* usar React, sino *cómo estructurarlo* para soportar mantenibilidad y evolución a largo plazo.
