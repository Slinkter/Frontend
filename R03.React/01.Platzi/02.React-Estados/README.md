# 📘 Proyecto React — Documentación Académica Nivel Maestría

## 1. Introducción al Proyecto

### 1.1. Contexto y Propósito

Este proyecto representa una aplicación de gestión de tareas (TODO List) desarrollada como un estudio de caso avanzado sobre el manejo del estado en React. Su propósito principal es servir como material didáctico para un nivel de posgrado, explorando y contrastando diversas estrategias de arquitectura y patrones de diseño para la gestión de datos en el _frontend_.

La aplicación implementa funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para tareas, y su evolución a lo largo del desarrollo demuestra la transición desde un manejo de estado local y acoplado hacia soluciones más robustas, escalables y desacopladas.

### 1.2. Objetivos Académicos

*   **Analizar la Separación de Responsabilidades (SoC):** Demostrar cómo la lógica de negocio puede ser extraída de los componentes de la interfaz de usuario.
*   **Implementar Patrones de Diseño Modernos:** Aplicar patrones como Custom Hooks y Render Props para encapsular y reutilizar la lógica del estado.
*   **Gestionar Efectos Secundarios:** Ilustrar el uso correcto de `useEffect` para la sincronización con almacenamiento externo (localStorage) y la reacción a cambios en el estado.
*   **Optimizar la Experiencia de Usuario:** Implementar estados de carga (loading) y error para proporcionar feedback claro al usuario durante las operaciones asíncronas.
*   **Promover la Reusabilidad:** Crear componentes genéricos y hooks reutilizables que puedan ser aplicados en diferentes contextos dentro de la aplicación.

### 1.3. Decisiones de Diseño Clave

1.  **Component-Based Architecture:** La UI se construye a partir de un sistema de componentes jerárquicos, cada uno con una responsabilidad única.
2.  **Estado Colocado:** Inicialmente, el estado se maneja localmente en los componentes. El proyecto evoluciona para "levantar el estado" (`lifting state up`) hacia un ancestro común (`App.js`) para compartirlo entre componentes hermanos.
3.  **Encapsulación de la Lógica:** La lógica de negocio y los efectos secundarios se encapsulan progresivamente en Custom Hooks (`useTodos`, `useLocalStorage`), desacoplando la lógica de la presentación.
4.  **Sincronización con `localStorage`:** Se utiliza `localStorage` como un mecanismo de persistencia simple, simulando una fuente de datos externa y demostrando el manejo de efectos secundarios asíncronos.

## 2. Arquitectura General

### 2.1. Estructura de Carpetas

La estructura del proyecto sigue una organización por funcionalidad, donde cada componente o grupo de componentes relacionados reside en su propio directorio.

```
/
├── 1-Curso/
│   ├── App/
│   │   ├── useTodos.js         # Custom Hook: Orquesta el estado y la lógica de negocio.
│   │   ├── useLocalStorage.js  # Custom Hook: Abstrae la interacción con localStorage.
│   │   ├── index.js            # Componente principal (App).
│   │   └── ...
│   ├── CreateTodoButton/
│   ├── EmptyTodos/
│   ├── Modal/
│   ├── TodoCounter/
│   ├── TodoForm/
│   ├── TodoHeader/
│   ├── TodoIcon/
│   ├── TodoItem/
│   ├── TodoList/
│   ├── TodoSearch/
│   ├── TodosError/
│   └── TodosLoading/
└── 2-Example/
    ├── ExampleClassState.jsx
    ├── ExampleUseState.jsx
    └── UseReducer.jsX
```

### 2.2. Justificación Arquitectónica

Esta arquitectura, aunque simple, sienta las bases para principios de **Clean Architecture** adaptados al _frontend_. Los Custom Hooks (`useTodos`, `useLocalStorage`) actúan como una capa de "casos de uso" o "servicios", aislando la lógica de la aplicación de los detalles de la implementación de la UI.

*   **Capa de Presentación:** Los componentes (`TodoCounter`, `TodoList`, `TodoItem`, etc.) son responsables exclusivamente de renderizar la UI y delegar las interacciones del usuario a la capa de lógica.
*   **Capa de Lógica de Aplicación (Hooks):** `useTodos` contiene la lógica de negocio principal (filtrar, completar, eliminar TODOs). No sabe *cómo* se muestra la UI, solo gestiona el estado.
*   **Capa de Acceso a Datos:** `useLocalStorage` abstrae la fuente de datos. Podría ser reemplazado por un hook que interactúe con una API REST (`useApi`) sin que `useTodos` o los componentes de UI sufran cambios significativos.

### 2.3. Diagrama de Flujo de Datos (ASCII)

Este diagrama ilustra cómo fluye el estado y las acciones a través de la aplicación.

```
                 +-------------------+
                 |    localStorage   |  <-- (Sincronización)
                 +-------------------+
                         ^
                         | (3. Efecto Secundario)
+------------------------|------------------------+
|       useLocalStorage(itemName, initialValue)   |
+-------------------------------------------------+
                         ^
                         | (2. Persistencia y Lectura)
+------------------------|------------------------+
|      useTodos() [Custom Hook: Caso de Uso]      |
|                                                 |
| - todos (estado)                                |
| - loading, error (estados derivados)            |
| - completeTodo(id)                              |
| - deleteTodo(id)                                |
| - addTodo(text)                                 |
+-------------------------------------------------+
                         |
      (1. Provee estado y funciones a la UI)
                         v
+------------------------|------------------------+
|                App (Contenedor)                 |
|                                                 |
| <TodoHeader>                                    |
|   <TodoCounter .../>                            |
|   <TodoSearch .../>                             |
| </TodoHeader>                                   |
|                                                 |
| <TodoList>                                      |
|   { loading && <TodosLoading/> }                |
|   { error && <TodosError/> }                    |
|   { !loading && searchedTodos.map(...) }        |
|   <TodoItem .../>                               |
| </TodoList>                                     |
|                                                 |
| <CreateTodoButton .../>                         |
| { openModal && <Modal><TodoForm/></Modal> }     |
+-------------------------------------------------+
```

1.  **Flujo Descendente (Estado):** El hook `useTodos` es la "fuente de la verdad". Proporciona el estado (`todos`, `loading`, `error`) y las funciones para modificarlo a la jerarquía de componentes.
2.  **Flujo Ascendente (Acciones):** Los componentes de UI (ej. `TodoItem`, `TodoForm`) no modifican el estado directamente. Invocan las funciones proveídas por `useTodos` (ej. `deleteTodo(id)`), notificando al hook de una intención de cambio.
3.  **Efectos Secundarios:** `useTodos` delega la persistencia al hook `useLocalStorage`, que se encarga de sincronizar el estado con el almacenamiento del navegador.

## 3. Patrones de Diseño Aplicados

### 3.1. Custom Hook Pattern

*   **Problema que Resuelve:** Evita la duplicación de lógica de estado y efectos secundarios en múltiples componentes. Permite extraer y reutilizar la lógica de negocio de forma independiente a la UI.
*   **Utilidad en React:** Es el pilar de la composición de lógica en React moderno. Facilita la separación de responsabilidades y mejora la legibilidad y testeabilidad del código.
*   **Uso en el Proyecto:**
    *   `useLocalStorage`: Encapsula la lógica para leer y escribir en `localStorage`, y reaccionar a cambios. Es un hook genérico que podría ser publicado como una librería.
    *   `useTodos`: Es el corazón de la lógica de la aplicación. Centraliza el estado de los TODOs, los estados de carga/error, y las operaciones de negocio (añadir, completar, borrar, buscar).

*   **Ejemplo de Código (`1-Curso/App/useTodos.js`):**

    ```javascript
    function useTodos() {
      const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []);
    
      const [searchValue, setSearchValue] = React.useState('');
      // ... más lógica de estado ...
    
      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
    
      const searchedTodos = todos.filter(
        (todo) => {
          // ... lógica de búsqueda ...
        }
      );
    
      const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
          // ...
        });
        saveTodos(newTodos);
      };
      
      // ... otras funciones (completeTodo, deleteTodo) ...
    
      return {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        // ...
      };
    }
    ```

    **Explicación (Nivel Maestría):** `useTodos` actúa como un *Facade* para la complejidad del manejo de estado de la aplicación. Orquesta múltiples `useState`, `useEffect` (implícitamente a través de `useLocalStorage`) y lógica de negocio derivada. Expone una API limpia y cohesiva al componente `App`, que se convierte en un simple consumidor (un "componente tonto" o *Dumb Component* en este contexto), desacoplando completamente la vista de la lógica.

### 3.2. Render Props (a través de `children`)

*   **Problema que Resuelve:** Permite compartir una pieza de estado o lógica con un componente hijo, dándole al componente padre el control sobre qué se renderiza.
*   **Utilidad en React:** Es una técnica poderosa para la inversión de control. El componente que utiliza el patrón no impone una estructura de UI, sino que proporciona datos y deja que el consumidor decida cómo usarlos.
*   **Uso en el Proyecto:** El componente `TodoList` y `TodoHeader` utilizan una forma implícita de Render Props. No renderizan los items directamente, sino que esperan recibirlos como `props` (en este caso, `children` o `props` específicas como `render` o `children as a function`). El componente `App` es el que decide qué lista de `TodoItem`s pasarle.

*   **Ejemplo de Código (`1-Curso/App/index.js` y `1-Curso/TodoList/index.js`):**

    ```javascript
    // En App.js
    <TodoList>
      {searchedTodos.map(todo => (
        <TodoItem
          key={todo.text}
          text={todo.text}
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)}
          onDelete={() => deleteTodo(todo.text)}
        />
      ))}
    </TodoList>
    
    // En TodoList/index.js
    function TodoList(props) {
      return (
        <section>
          <ul>
            {props.children}
          </ul>
        </section>
      );
    }
    ```

    **Explicación (Nivel Maestría):** `TodoList` es un componente de "diseño" o "layout". Su única responsabilidad es renderizar una estructura `<ul>`. No sabe ni le importa qué tipo de hijos va a renderizar. `App` utiliza este "slot" (`props.children`) para proyectar en él la lista de `TodoItem`s. Esto es una forma de **Composición de Componentes**, un principio fundamental en React, preferido sobre la herencia. El patrón `children` es la forma más simple y común de Render Prop.

### 3.3. State Lifting (Levantamiento del Estado)

*   **Problema que Resuelve:** Cuando múltiples componentes necesitan compartir y reaccionar al mismo estado, este patrón permite mover el estado al ancestro común más cercano en el árbol de componentes.
*   **Uso en el Proyecto:** El estado que originalmente podría haber vivido en `TodoCounter` (el conteo) o `TodoList` (la lista) se "levanta" al componente `App`. `App` se convierte en el dueño del estado y lo distribuye hacia abajo a través de props. La introducción de `useTodos` es la evolución de este patrón, donde el estado no solo se levanta, sino que se extrae por completo a una unidad lógica independiente.

## 4. Flujo de Datos y Manejo de Estado

### 4.1. Flujo de Datos Unidireccional

El proyecto sigue estrictamente el flujo de datos unidireccional de React:

1.  **El estado (`todos`) vive en `useTodos` y es pasado hacia abajo a los componentes.**
2.  **Los componentes reciben el estado y lo renderizan.** (`TodoList`, `TodoCounter`).
3.  **Las interacciones del usuario en los componentes hijos (`TodoItem`, `CreateTodoButton`) no modifican el estado directamente.**
4.  **En su lugar, invocan funciones (`onComplete`, `onDelete`) que fueron pasadas como props desde `App`.**
5.  **Estas funciones, a su vez, llaman a los actualizadores de estado en `useTodos` (`completeTodo`, `deleteTodo`).**
6.  **`useTodos` actualiza el estado, provocando un nuevo ciclo de renderizado.**
7.  **La UI se actualiza para reflejar el nuevo estado.**

Este ciclo garantiza que el flujo de datos sea predecible, fácil de depurar y evita mutaciones inesperadas.

### 4.2. Principios de React Hooks Aplicados

*   **`useState`:** Para manejar estados simples y locales, como el `searchValue` en `useTodos` o el estado de visibilidad del `Modal`.
*   **`useEffect`:** Utilizado dentro de `useLocalStorage` para simular la asincronía y reaccionar a cambios en el `itemName` o `initialValue`. Es crucial para manejar efectos secundarios (operaciones fuera del flujo de renderizado de React).
*   **Composición de Hooks:** La belleza del enfoque se ve en `useTodos`, que compone `useLocalStorage` y `useState` para crear una pieza de lógica más compleja y de alto nivel.

## 5. Componentes Principales

*   **`App` (`1-Curso/App/index.js`):**
    *   **Rol Arquitectónico:** Es el componente "Contenedor" o "Inteligente" principal. Orquesta la aplicación, consume el hook `useTodos` y conecta la lógica con los componentes de presentación.
    *   **Decisiones de Diseño:** No contiene lógica de negocio directamente, sino que la delega a `useTodos`. Su principal responsabilidad es la composición de la UI, decidiendo qué componentes mostrar (`TodosLoading`, `TodoList`, `Modal`) basándose en el estado recibido.

*   **`TodoForm` (`1-Curso/TodoForm/index.js`):**
    *   **Rol Arquitectónico:** Componente controlado para la creación de nuevos TODOs. Mantiene un estado local para el `textarea` y, al enviar, invoca la función `addTodo` pasada por props.
    *   **Decisiones de Diseño:** Es un buen ejemplo de un "Dumb Component". Recibe funciones y no tiene conocimiento del resto de la aplicación.

*   **`TodoIcon` (`1-Curso/TodoIcon/index.js`):**
    *   **Rol Arquitectónico:** Un componente de UI altamente reutilizable y genérico. Su única función es mostrar un ícono SVG y asociarle un evento `onClick`.
    *   **Decisiones de Diseño:** Utiliza un mapa de objetos (`iconTypes`) para devolver el componente SVG correcto basado en una prop `type`. Esto es una alternativa limpia a una serie de `if/else` o `switch`, y hace que el componente sea fácilmente extensible con nuevos íconos.

## 6. Clean Code y Refactorings Recomendados

### 6.1. Prácticas de Clean Code Aplicadas

*   **Nombres Significativos:** Funciones como `completeTodo`, `deleteTodo` y variables como `searchedTodos` comunican claramente su propósito.
*   **Separación de Responsabilidades:** La separación entre `useTodos` (lógica), `useLocalStorage` (persistencia) y los componentes de UI (presentación) es el pilar de la limpieza de este código.
*   **Bajo Acoplamiento:** Los componentes de presentación (`TodoItem`, `TodoList`) están desacoplados de la lógica de negocio. Podrían ser reutilizados en otra aplicación con una fuente de datos diferente.

### 6.2. Refactorings Recomendados

1.  **Adoptar `useReducer` en `useTodos`:** Para lógicas de estado complejas con múltiples acciones que pueden resultar en estados interdependientes (como `loading`, `error`, `data`), `useReducer` puede ofrecer una gestión más predecible y organizada que múltiples `useState`. Las acciones se vuelven explícitas (ej. `dispatch({ type: 'FETCH_SUCCESS', payload: todos })`).

2.  **Crear un `TodoContext`:** Para evitar el "prop drilling" (pasar props a través de muchos niveles), el estado y las funciones de `useTodos` podrían ser provistos a través de un Contexto de React. `App` se convertiría en el `Provider`, y cualquier componente en el árbol podría consumir los datos directamente con `useContext`.

    *   **Ejemplo de implementación:**

        ```javascript
        // En un nuevo archivo TodoContext.js
        const TodoContext = React.createContext();
        
        function TodoProvider({ children }) {
          const todoValue = useTodos();
          return (
            <TodoContext.Provider value={todoValue}>
              {children}
            </TodoContext.Provider>
          );
        }
        
        // En App.js
        <TodoProvider>
          <AppUI /> 
        </TodoProvider>
        
        // En cualquier componente hijo...
        const { loading, error, searchedTodos } = React.useContext(TodoContext);
        ```

3.  **Tipado con TypeScript/JSDoc:** Añadir tipado explícito a las props de los componentes y a los valores de retorno de los hooks mejoraría drásticamente la mantenibilidad y la robustez del código, previniendo errores comunes en tiempo de desarrollo.

## 7. Tecnologías y Librerías

*   **React (v17+):** La librería base para construir la interfaz de usuario. El proyecto hace un uso extensivo de Hooks, que es el enfoque moderno para el desarrollo con React.
*   **CSS nativo:** Para el estilizado, se utiliza CSS puro con una convención de nombres que sigue la estructura de los componentes. Esta es una decisión deliberada para mantener el foco en la lógica de React sin introducir la complejidad de un framework de CSS-in-JS o de utilidad.
*   **`localStorage` API del Navegador:** Se emplea como una simulación simple de una base de datos o API externa para la persistencia de datos.

## 8. Posibles Mejoras a Nivel Profesional

*   **Fetching de Datos con React Query o SWR:** Reemplazar `useLocalStorage` con una librería de fetching de datos como `react-query`. Esto manejaría automáticamente el cacheo, la revalidación, los estados de carga/error y la sincronización del estado del servidor, eliminando la necesidad de gestionar manualmente `loading` y `error`.

*   **Lazy Loading de Componentes:** Componentes pesados o que no son visibles inicialmente (como el `Modal` que contiene el `TodoForm`) pueden ser cargados de forma diferida usando `React.lazy()` y `Suspense`. Esto mejora el rendimiento inicial de la aplicación (Time to Interactive).

*   **Testing:**
    *   **Unit Testing:** Los hooks `useLocalStorage` y `useTodos` son altamente testeables de forma aislada usando `@testing-library/react-hooks`. Se pueden simular diferentes escenarios (estado inicial, adición, borrado) y afirmar el resultado sin necesidad de renderizar un componente.
    *   **Integration Testing:** La interacción completa (escribir en el buscador, hacer clic en un `TodoItem`) puede ser probada con `React Testing Library`, asegurando que los componentes y la lógica funcionan correctamente en conjunto.

*   **Optimización de Renderizado:** Usar `React.memo` en componentes como `TodoItem` para prevenir re-renderizados innecesarios si sus props no cambian. Combinado con `useCallback` para las funciones pasadas como props (`onComplete`, `onDelete`), se puede optimizar significativamente el rendimiento en listas grandes.

## 9. Conclusión Académica

Este proyecto sirve como una excelente demostración práctica de la evolución en el manejo del estado en React. Comienza con principios básicos y escala hacia una arquitectura limpia y desacoplada, fundamentada en la composición de lógica a través de los **Custom Hooks**.

La separación clara entre las capas de **Presentación**, **Lógica de Aplicación** y **Acceso a Datos** (aunque simulada) es el concepto más importante a extraer. Este enfoque no solo produce un código más mantenible, testeable y reutilizable, sino que también prepara al desarrollador para construir sistemas complejos que pueden evolucionar y adaptarse a nuevos requerimientos con un mínimo de fricción. Los refactorings propuestos (Context, Reducer, TypeScript) representan los siguientes pasos lógicos en la maduración de una base de código de nivel profesional.
