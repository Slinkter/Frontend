# 📘 Proyecto React: Patrones de Diseño y Arquitectura de Software

## 1. Introducción al Proyecto

### 1.1. Contexto Académico

Este proyecto, una aplicación de gestión de tareas (TODO Machine), sirve como un caso de estudio para el curso de **Arquitectura de Software Avanzada en React**. El objetivo no es la aplicación en sí, sino el análisis de las decisiones de diseño, patrones de arquitectura y principios de `Clean Code` implementados en ella. Se ha construido como un sistema canónico para ilustrar conceptos clave de la ingeniería de software moderna en el ecosistema de React.

### 1.2. Problema y Solución Arquitectónica

El desafío central es construir una aplicación frontend que sea **mantenible, escalable y testable**. La solución implementada aborda este problema mediante una estricta **separación de conceptos (Separation of Concerns)**, encapsulando la lógica de negocio en `hooks` personalizados y la gestión del estado en un `Contexto` de React, aislando así la capa de presentación (UI) de la lógica de la aplicación. Una característica destacada, la **sincronización de estado entre pestañas**, demuestra un manejo avanzado de efectos secundarios y el `event loop` del navegador.

### 1.3. Objetivos Pedagógicos

-   **Analizar la implementación de patrones de diseño** en un contexto de React.
-   **Evaluar la separación entre la lógica de estado, la lógica de negocio y la lógica de presentación**.
-   **Justificar las decisiones de arquitectura** con base en principios como `SOLID` y `DRY`.
-   **Proponer mejoras profesionales** que eleven el proyecto a un estándar de producción.

---

## 2. Arquitectura General

La arquitectura de este proyecto es una implementación pragmática de los principios de **Clean Architecture** adaptados a React. La regla fundamental es que las dependencias fluyen hacia adentro: la UI depende de la lógica de negocio, pero la lógica de negocio no tiene conocimiento de la UI que la consume.

### 2.1. Estructura de Directorios

La organización del código refleja esta separación de conceptos:

```
/src
|
├─── components/   # Componentes de UI (Dumb/Presentational)
|
├─── hook/         # Hooks personalizados (Lógica de negocio y de estado)
|
├─── App.jsx       # Contenedor principal (Composition Root)
|
├─── AppUI.jsx     # Componente presentacional principal
|
└─── main.jsx      # Punto de entrada y renderizado
```

-   **`hook/`**: Contiene el "cerebro" de la aplicación. `useTodos` encapsula toda la lógica de negocio, mientras que `useLocalStorage` abstrae la capa de persistencia.
-   **`components/`**: Alberga componentes reutilizables y, en su mayoría, "tontos" (dumb components), que solo reciben props y renderizan UI.
-   **`App.jsx` y `AppUI.jsx`**: Juntos, implementan el patrón **Container/Presenter**, donde `App.jsx` actúa como el contenedor que provee el estado a través del `TodoProvider`, y `AppUI.jsx` consume ese estado para orquestar la UI.

### 2.2. Diagrama de Flujo Arquitectónico

Este diagrama ASCII ilustra el flujo de dependencias, desde la UI hasta la capa de persistencia.

```
+-------------------+      +---------------------+      +---------------------+
|    Componentes    |----->|       AppUI.jsx       |----->|     TodoContext     |
| (TodoList, etc.)  |      |  (Presenter Layer)  |      |  (Dependency Access)  |
+-------------------+      +---------------------+      +----------+----------+
                                                                   |
                                                                   v
+-------------------+      +---------------------+      +---------------------+
|  useLocalStorage  |<-----|      useTodos.js      |<-----|     TodoProvider    |
| (Persistence Layer) |      |   (Business Logic)  |      |   (Injection)       |
+-------------------+      +---------------------+      +---------------------+
```

La `UI` (`AppUI` y sus hijos) no invoca directamente la lógica, sino que consume el `TodoContext`. El `TodoProvider` es el que *inyecta* la lógica de `useTodos`, que a su vez depende de `useLocalStorage`. Esto es un claro ejemplo de **Inversión de Dependencias**.

---

## 3. Patrones de Diseño Aplicados

### 3.1. Custom Hook Pattern

-   **Problema que resuelve**: La lógica de estado y los efectos secundarios a menudo se repetían en componentes de clase, o hinchaban los componentes funcionales, dificultando su reutilización y testeo.
-   **Utilidad en React**: Permite extraer y reutilizar lógica *stateful* de forma independiente a la jerarquía de componentes. Un `Custom Hook` es una función que utiliza otros `hooks` (`useState`, `useEffect`, etc.) para encapsular un comportamiento específico.
-   **Uso en el proyecto**: `useTodos.js` es el ejemplo principal. Centraliza toda la lógica de negocio: el estado de los `todos`, el manejo del `searchValue`, el estado del `modal`, y las funciones para agregar, completar y eliminar tareas.

    ```javascript
    // src/hook/useTodos.js
    function useTodos() {
      const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []);
    
      const [searchValue, setSearchValue] = React.useState('');
      // ... más lógica de estado y funciones derivadas ...
    
      return {
        loading,
        error,
        totalTodos,
        completedTodos,
        // ... etc ...
      };
    }
    ```

### 3.2. Provider Pattern (con React Context)

-   **Problema que resuelve**: El "prop drilling", que ocurre cuando es necesario pasar props a través de múltiples niveles de componentes que no las necesitan directamente.
-   **Utilidad en React**: `React Context` proporciona una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel. El `Provider` es el componente que "provee" el valor, y `useContext` es el `hook` que lo consume.
-   **Uso en el proyecto**: `TodoContext` gestiona el estado global de la aplicación. `TodoProvider` utiliza el `Custom Hook` `useTodos` y expone su resultado a todo el árbol de componentes.

    ```javascript
    // src/components/TodoContext/index.jsx
    function TodoProvider({ children }) {
      const todoValues = useTodos(); // Lógica de negocio encapsulada
    
      return (
        <TodoContext.Provider value={todoValues}>
          {children}
        </TodoContext.Provider>
      );
    }
    
    // Cualquier componente hijo puede acceder al estado así:
    // const { loading, totalTodos } = React.useContext(TodoContext);
    ```

### 3.3. Container/Presenter Pattern

-   **Problema que resuelve**: La mezcla de la lógica de obtención y manipulación de datos con la lógica de renderizado de la UI, lo que crea componentes monolíticos y difíciles de mantener.
-   **Utilidad en React**: Separa los componentes en dos tipos:
    -   **Containers (Contenedores)**: Se preocupan por *cómo funcionan las cosas*. Obtienen datos, gestionan el estado y lo pasan a los presentadores. En este proyecto, `App.jsx` y `TodoProvider` actúan como la capa contenedora.
    -   **Presenters (Presentadores)**: Se preocupan por *cómo se ven las cosas*. Reciben datos vía props y los renderizan. `AppUI.jsx` es el presentador principal, que a su vez está compuesto de otros presentadores más pequeños (`TodoList`, `TodoCounter`).
-   **Uso en el proyecto**:

    ```javascript
    // src/App.jsx (Container-like)
    function App() {
      return (
        <TodoProvider>
          <AppUI />
        </TodoProvider>
      );
    }
    
    // src/AppUI.jsx (Presenter)
    function AppUI() {
      const {
        error,
        loading,
        searchedTodos,
        // ... y más valores del contexto
      } = React.useContext(TodoContext);
    
      return (
        <React.Fragment>
          {/* ... renderiza la UI usando los datos del contexto ... */}
        </React.Fragment>
      );
    }
    ```

### 3.4. Higher-Order Component (HOC) - Patrón implícito

Aunque no se usa un HOC de la forma clásica (`withSubscription(WrappedComponent)`), el `hook` `useStorageListener` funciona como un **Higher-Order Hook**, un concepto análogo.

-   **Problema que resuelve**: Compartir lógica compleja y no visual entre componentes. En este caso, la lógica de escuchar eventos del `storage` del navegador.
-   **Uso en el proyecto**: `useStorageListener` es un `hook` que recibe una función de sincronización como argumento y devuelve un conjunto de propiedades y un componente para mostrar una alerta. Es una forma más moderna y componible de lograr lo que antes se hacía con HOCs.

    ```javascript
    // src/hook/useStorageListener.js
    function useStorageListener(sincronize) {
      const [storageChange, setStorageChange] = React.useState(false);
      // ... lógica del listener ...
      return {
          show: storageChange,
          toggleShow: () => { /* ... */ }
      };
    }
    
    // Se usa dentro de AppUI para envolver el componente ChangeAlert
    ```

---

## 4. Flujo de Datos y Estado

El flujo de datos es **unidireccional**, un principio fundamental de React que hace que el estado de la aplicación sea más predecible.

### 4.1. Diagrama de Flujo de Estado

```
+----------------+      +------------------+      +----------------------+
|   LocalStorage   | <--> | useLocalStorage.js | <--> |      useTodos.js       |
+----------------+      +------------------+      +-----------+----------+
       ^                                                       | (State & Logic)
       | (Storage Event)                                       v
       |                                           +-----------+----------+
+------+-------------+                             |      TodoProvider      |
| useStorageListener.js |                             +-----------+----------+
+--------------------+                                         | (Context Value)
       |                                                       v
       v                                           +-----------+----------+
+------+---------+                                 |         AppUI          |
|  ChangeAlert   |                                 +-----------+----------+
+----------------+                                           | (Props)
                                                               v
                                                   +-----------+----------+
                                                   |     TodoItem, etc.     |
                                                   +------------------------+
```

1.  **Inicialización**: `useLocalStorage` lee los datos de `localStorage`.
2.  **Estado centralizado**: `useTodos` consume estos datos y crea el estado y las funciones de negocio.
3.  **Inyección**: `TodoProvider` pone este estado a disposición a través del `Context`.
4.  **Consumo**: `AppUI` y sus componentes hijos consumen el `Context` y renderizan la UI.
5.  **Acción del usuario**: Un clic en `DeleteIcon` llama a la función `deleteTodo` del `Context`.
6.  **Actualización del estado**: `deleteTodo` (en `useTodos`) actualiza el estado local y llama a `saveTodos` (en `useLocalStorage`).
7.  **Persistencia**: `saveTodos` escribe el nuevo estado en `localStorage`.
8.  **Re-render**: El cambio de estado provoca un re-renderizado de los componentes afectados.
9.  **Sincronización externa**: Si `localStorage` cambia desde otra pestaña, `useStorageListener` lo detecta y actualiza la UI.

---

## 5. Clean Code Aplicado

-   **Nombres significativos**: Variables y funciones como `searchedTodos`, `completeTodo`, `useStorageListener` son auto-descriptivas.
-   **Funciones con una sola responsabilidad (SRP)**: `completeTodo` solo completa una tarea. `deleteTodo` solo la elimina. El `hook` `useLocalStorage` solo se preocupa de la persistencia, no de la lógica de negocio.
-   **Bajo acoplamiento, alta cohesión**: El `hook` `useTodos` tiene alta cohesión (toda la lógica de negocio está junta), pero está débilmente acoplado a la UI (se comunica a través del `Context`, una abstracción).

---

## 6. Posibles Mejoras (Nivel Profesional)

Aunque es un excelente proyecto académico, para un entorno de producción se podrían aplicar las siguientes mejoras:

1.  **State Management Avanzado**: Para aplicaciones más complejas, `React Context` puede causar re-renders innecesarios. Librerías como **`Zustand`** o **`React Query`** ofrecen optimizaciones de rendimiento y un manejo más robusto del estado del servidor (`server state`). `React Query`, en particular, simplificaría la lógica de `loading`, `error` y `data` de `useLocalStorage`.

2.  **Testing**:
    -   **Unit Testing (Jest)**: Los `hooks` personalizados (`useTodos`, `useLocalStorage`) son candidatos perfectos para tests unitarios. Se puede usar `@testing-library/react-hooks` para renderizarlos en un entorno de prueba y afirmar su comportamiento.
    -   **Integration Testing (React Testing Library)**: Probar flujos de usuario completos, como "el usuario escribe en el buscador, y la lista de todos se filtra", para garantizar que los componentes se integran correctamente.

3.  **Optimización de Performance**:
    -   **`React.memo`**: Envolver `TodoItem` con `React.memo` para evitar re-renders si sus props no cambian.
    -   **`useCallback` y `useMemo`**: Memorizar funciones y valores calculados en `useTodos` para estabilizar las referencias pasadas a través del `Context` y prevenir re-renders en los componentes consumidores.
    -   **Code Splitting y Lazy Loading**: Con `React.lazy`, el componente `Modal` podría cargarse solo cuando el usuario hace clic en el botón de "crear", mejorando el tiempo de carga inicial.

4.  **Estilos y UI**:
    -   **CSS-in-JS o Utility-First CSS**: Migrar de archivos `.css` tradicionales a soluciones como **`Styled-Components`** o **`Tailwind CSS`** para un mejor encapsulamiento de estilos y un desarrollo más rápido.

---

## 7. Conclusión Académica

Este proyecto demuestra de manera efectiva cómo la aplicación deliberada de patrones de diseño (`Custom Hook`, `Provider`, `Container/Presenter`) y principios de arquitectura limpia resulta en un código React robusto y mantenible. La separación explícita de la lógica de negocio, el estado de la aplicación y la capa de presentación no solo facilita la escalabilidad y el testing, sino que también mejora la legibilidad y la capacidad de razonar sobre el sistema. Sirve como un excelente arquetipo de cómo estructurar aplicaciones React modernas más allá de los tutoriales básicos, sentando una base sólida para construir sistemas complejos en el mundo real.