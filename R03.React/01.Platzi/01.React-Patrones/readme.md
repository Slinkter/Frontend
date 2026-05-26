# 📘 Proyecto React — Documentación Académica Nivel Maestría

## 1. Introducción al Proyecto

**Contexto Académico y Problema Estructural**
El presente proyecto constituye un caso de estudio avanzado sobre la gestión de la complejidad inherente en aplicaciones de interfaz de usuario reactivas (React). Tradicionalmente, las arquitecturas front-end sufren de entropía arquitectónica a medida que escalan: el acoplamiento bidireccional entre la capa de presentación y las reglas de negocio, la proliferación de estados globales inmanejables y el *prop-drilling* profundo resultan en bases de código frágiles, comúnmente denominadas *Spaghetti Code*. El problema fundamental que este sistema resuelve es la falta de límites arquitectónicos claros que prevengan la degradación del ecosistema del software durante su ciclo de vida, evolución y mantenimiento.

**Objetivos del Sistema**
1. **Desacoplamiento Estructural:** Separar ortogonalmente la infraestructura visual de la lógica de dominio mediante patrones de composición.
2. **Escalabilidad Cognitiva:** Garantizar que la complejidad estructural y el costo de introducir nuevas características se mantengan asintóticamente lineales, no exponenciales.
3. **Previsibilidad del Flujo de Datos:** Instaurar un estado determinista y predecible mediante inyección de dependencias y segregación de responsabilidades.

**Decisiones de Diseño Fundamentales**
Para mitigar la deuda técnica intrínseca, se ha prescindido tajantemente de arquitecturas monolíticas "planas" orientadas a tipos de archivo (ej. agrupar todo en `components/`, `hooks/`, `utils/`). En su lugar, se ha implementado una arquitectura orientada a dominios de negocio y responsabilidades funcionales. La decisión más crítica y angular del proyecto ha sido la adopción de la metodología **Feature-Sliced Design (FSD)**. Esta metodología impone restricciones topológicas estrictas sobre el grafo de dependencias inter-modulares, alineando el desarrollo front-end con principios fundacionales de la Ingeniería de Software como *Clean Architecture* y *Domain-Driven Design (DDD)*.

---

## 2. Arquitectura General (Feature-Sliced Design)

**Justificación de la Adopción de FSD**
La adopción de Feature-Sliced Design (FSD) se fundamenta en la necesidad imperativa de dominar de forma rigurosa el árbol de dependencias de la aplicación. A diferencia de arquitecturas tradicionales donde la falta de fronteras permite que cualquier módulo importe lógica de manera ad-hoc, FSD impone una **Regla de Dependencia Unidireccional Estricta**. Esto implica que los módulos superiores solo pueden acoplarse a abstracciones ubicadas en las capas inmediatamente inferiores. 

Esta restricción estructural erradica matemáticamente la posibilidad de dependencias circulares, maximiza la cohesión intra-módulo (cada *slice* contiene su propia interfaz, lógica transaccional y modelo de datos) y minimiza el acoplamiento inter-módulo. A nivel académico, FSD materializa el **Principio de Inversión de Dependencias (DIP)** y el **Principio de Responsabilidad Única (SRP)** a escala macro-arquitectónica, transformando el front-end de una mera vista a un sistema de software robusto.

**Estructura Jerárquica de Capas**
El repositorio (`src/`) se segmenta topológicamente en las siguientes capas, ordenadas estrictamente de mayor a menor nivel de conocimiento del negocio (abstracción):

- **`app/` (Capa de Inicialización y Configuración):** Actúa como el punto de entrada, composición raíz y *Composition Root*. Orquesta los proveedores de contexto global (`TodoProvider`), inyecta los estilos base y configura el entorno general. Conoce a todas las capas subyacentes, pero carece de lógica de negocio propia.
- **`pages/` (Capa de Enrutamiento y Vistas):** Compone bloques estructurales complejos (`widgets`) para materializar vistas funcionales completas (ej. `HomePage`). Su responsabilidad es puramente de orquestación y mapeo de rutas.
- **`widgets/` (Capa de Composición Estructural):** Módulos de interfaz independientes que combinan múltiples características y entidades subyacentes (ej. `TodoHeader`, `TodoList`). Actúan como integradores de alto nivel (*Smart Components* compuestos).
- **`features/` (Capa de Casos de Uso):** Encapsula las interacciones del usuario que aportan un valor de negocio medible. Aquí residen unidades transaccionales fuertemente cohesionadas como `create-todo` (formulario de creación), `filter-todo` (lógica y estado de búsqueda) y `sync-todo` (sistema de sincronización multi-ventana).
- **`entities/` (Capa de Dominio):** Contiene la lógica de negocio central e independiente del contexto de la vista. Modela el dominio cognitivo primario (`todo`), proveyendo la estructura de datos, el proveedor de estado central (`TodoContext`), los *Custom Hooks* de acceso, y las primitivas visuales estrechamente acopladas a la entidad (ej. `TodoItem`, `TodoCounter`).
- **`shared/` (Capa Agnóstica y Funcional):** El sustrato base del sistema. Contiene utilidades genéricas puras (`useLocalStorage`, `useStorageListener`), primitivas visuales universales (`Modal`, `CreateTodoButton`, sistema de iconos), e infraestructura transversal que ignora absolutamente las reglas de negocio de las capas superiores.

**Relación con Clean Architecture**
La topología FSD implementada guarda una correspondencia isomórfica formal con las capas de la *Clean Architecture* (Robert C. Martin):
- `entities/` corresponde a los **Enterprise Business Rules** (Entidades Core).
- `features/` mapea directamente a los **Application Business Rules** (Casos de Uso / Interactors).
- `widgets/` y `pages/` representan la capa de **Interface Adapters** (Presentadores).
- `shared/` y `app/` actúan como la infraestructura exterior de **Frameworks and Drivers**.

**Diagrama ASCII: Flujo de Dependencias y Topología del Proyecto**

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 [APP LAYER]                                 │
│        (Composición Raíz, Inyección de Dependencias, Estilos Globales)      │
│                 └─ App.jsx, App.css, index.css                              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Importa explícitamente)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                [PAGES LAYER]                                │
│                   (Orquestación de Vistas Funcionales)                      │
│                 └─ HomePage.jsx                                             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Importa explícitamente)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                               [WIDGETS LAYER]                               │
│           (Bloques UI Estructurales de Alta Complejidad)                    │
│                 ├─ TodoHeader.jsx                                           │
│                 └─ TodoList.jsx, EmptyTodos.jsx                             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Importa explícitamente)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                               [FEATURES LAYER]                              │
│                (Casos de Uso Aislados y Acciones Transaccionales)           │
│                 ├─ create-todo/ (TodoForm)                                  │
│                 ├─ filter-todo/ (TodoSearch)                                │
│                 └─ sync-todo/   (ChangeAlert)                               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Importa explícitamente)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                               [ENTITIES LAYER]                              │
│       (Lógica de Dominio Central, Modelos de Estado y UI Acoplada)          │
│                 ├─ model/ (TodoContext, TodoProvider, useTodos)             │
│                 └─ ui/    (TodoItem, TodoCounter)                           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Importa explícitamente)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                               [SHARED LAYER]                                │
│  (Primitivas Agnósticas, Librerías Base, Utilidades de Infraestructura)     │
│                 ├─ ui/  (Modal, TodoIcon, CreateTodoButton)                 │
│                 └─ lib/ (useLocalStorage, constantes compartidas)           │
└─────────────────────────────────────────────────────────────────────────────┘

===============================================================================
       REGLA CRÍTICA DE DEPENDENCIA (Flujo Topológico Unidireccional)
 
       [ Nivel Superior ] -----( Conoce y Depende de )-----> [ Nivel Inferior ]
       [ Nivel Inferior ] ---( Ignora la existencia de )---> [ Nivel Superior ]
===============================================================================
```

---

## 3. Patrones de Diseño Aplicados

La arquitectura de este proyecto es el resultado de una cuidadosa selección de patrones de diseño específicos del ecosistema React. La implementación trasciende la mera aglomeración de componentes, estructurando una jerarquía cohesiva que maximiza la extensibilidad, la testabilidad y la separación de responsabilidades (Separation of Concerns). A continuación, se detalla el análisis arquitectónico de los patrones implementados en el *codebase*.

### 3.1. Context Provider Pattern (Inversión de Control del Estado)

- **¿Qué problema resuelve?** Resuelve el anti-patrón de *Prop Drilling* (paso profundo de propiedades), donde las dependencias deben atravesar múltiples capas de componentes intermedios que no las necesitan, generando un alto acoplamiento estructural.
- **¿Por qué es útil en React?** Permite establecer un canal de comunicación global y de alcance delimitado (*scoped global state*), facilitando la inyección de dependencias directamente en los nodos del árbol de renderizado que las requieren.
- **¿Dónde se usa en este proyecto?** En la capa de entidades (`src/entities/todo/model/TodoProvider.jsx`) para distribuir la lógica orquestada por `useTodos`.

**Ejemplo de código extraído del codebase:**
```jsx
// src/entities/todo/model/TodoProvider.jsx
import React from "react";
import { useTodos } from "./useTodos";
import { TodoContext } from "./TodoContext";

function TodoProvider({ children }) {
    const todoValues = useTodos();

    return (
        <TodoContext.Provider value={todoValues}>
            {children}
        </TodoContext.Provider>
    );
}
```

- **Explicación Nivel Maestría y Trade-offs:** Desde una perspectiva arquitectónica, `TodoProvider` funciona como un Contenedor de Inyección de Dependencias. Encapsula la evaluación del estado complejo (`useTodos`) y lo propaga a sus consumidores subyacentes. 
  - *Trade-off:* El uso indiscriminado del Contexto interrumpe el principio de *Pureza* de los componentes presentacionales, atándolos a un proveedor específico. Además, React Context carece de un mecanismo nativo para *bail-out* (evitar re-renderizados) a nivel de propiedades granulares; si un solo valor en `todoValues` cambia, todos los consumidores suscritos sufrirán un re-renderizado, lo que podría impactar el rendimiento en árboles DOM profundos si no se acompaña de una estrategia de memoización.

### 3.2. Custom Hooks Pattern (Extracción Lógica y Cohesión)

- **¿Qué problema resuelve?** Soluciona la duplicación de código y la violación del Principio de Responsabilidad Única (SRP), evitando componentes monolíticos que mezclan la UI con lógica de negocio o de infraestructura.
- **¿Por qué es útil en React?** Actúa como un mecanismo funcional para compartir lógica de ciclo de vida e interacciones con el entorno externo (APIs, Web Storage) manteniendo intacto el paradigma de los componentes.
- **¿Dónde se usa en este proyecto?** Particularmente en `src/shared/lib/useLocalStorage.js`, abstrayendo la persistencia de datos y la sincronización de estados asíncronos.

**Ejemplo de código extraído del codebase:**
```jsx
// src/shared/lib/useLocalStorage.js
function useLocalStorage(dbName, initialValue) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(initialValue);
    
    // Efecto de carga simulado para persistencia...
    
    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(dbName, stringifiedItem);
            setItem(newItem);
        } catch (error) {
            setError(error);
        }
    };

    return { item, saveItem, loading, error, sincronizeItem };
}
```

- **Explicación Nivel Maestría y Trade-offs:** Al segregar las operaciones de almacenamiento, la máquina de estados de infraestructura (cargando, éxito, error) queda completamente aislada. El componente de UI es agnóstico respecto a *cómo* o *dónde* se guardan los datos. 
  - *Trade-off:* Los Custom Hooks ocultan complejidad de manera asombrosa, pero si acumulan múltiples fuentes de estado, pueden generar bucles de renders infinitos difíciles de depurar. Exigen un dominio riguroso del arreglo de dependencias en hooks internos como `useEffect` y `useCallback`.

### 3.3. Higher-Order Hooks (Composición Lógica Transversal)

- **¿Qué problema resuelve?** Aborda la necesidad de componer comportamientos laterales u observadores del sistema (como *event listeners* del entorno) de manera modular sin interferir con la lógica de negocio primigenia.
- **¿Por qué es útil en React?** Permite "envolver" lógica o aplicar currificación sobre callbacks, interceptando interacciones del entorno.
- **¿Dónde se usa en este proyecto?** En `src/shared/lib/useStorageListener.js` para reaccionar a cambios en el almacenamiento de otras pestañas.

**Ejemplo de código extraído del codebase:**
```jsx
// src/shared/lib/useStorageListener.js
function useStorageListener(f_sincronize, storageKey = STORAGE_KEY_V1) {
    const [storageChange, setStorageChange] = React.useState(false);

    React.useEffect(() => {
        const listener = (change) => {
            if (change.key === storageKey) {
                setStorageChange(true);
            }
        };
        window.addEventListener("storage", listener);
        return () => window.removeEventListener("storage", listener);
    }, [storageKey]);

    const f_toggleShow = () => {
        f_sincronize();
        setStorageChange(false);
    };

    return { show: storageChange, f_toggleShow };
}
```

- **Explicación Nivel Maestría y Trade-offs:** Este Hook de orden superior recibe una función (`f_sincronize`) por parámetro y eleva la capacidad del sistema al otorgar consciencia de múltiples hilos en el navegador (cross-tab synchronization) sin acoplarse al dominio. 
  - *Trade-off:* La abstracción funcional pura eleva la carga cognitiva. El paso de callbacks expone a la aplicación a problemas de stale-closures o rerenders innecesarios si la función padre (`f_sincronize`) no está memoizada correctamente o si pierde su contexto léxico original.

### 3.4. Compound Components Pattern (Inyección Implícita e Interfaz Fluida)

- **¿Qué problema resuelve?** Resuelve la rigidez arquitectónica y el excesivo paso de *props* a componentes estructurales que comparten estado común subyacente. 
- **¿Por qué es útil en React?** Proporciona un modelo de API expresiva similar al DOM nativo (ej. `<select>` y `<option>`), delegando el control de las posiciones semánticas al consumidor del componente.
- **¿Dónde se usa en este proyecto?** En el `TodoHeader` (`src/widgets/header/ui/TodoHeader.jsx`).

**Ejemplo de código extraído del codebase:**
```jsx
// src/widgets/header/ui/TodoHeader.jsx
function TodoHeader({ children, loading }) {
    return (
        <header>
            {
                React.Children.toArray(children).map((child) =>
                    React.cloneElement(child, { loading })
                )
            }
        </header>
    );
}
```

- **Explicación Nivel Maestría y Trade-offs:** Esta implementación utiliza la manipulación directa de la estructura de react elements (`React.Children` y `React.cloneElement`) para interceptar la representación de sus descendientes e inyectar subrepticiamente una prop (`loading`). Promueve la Declaratividad Inversa, donde el contenedor gestiona propiedades para el contenido de forma pasiva.
  - *Trade-off:* `React.cloneElement` es considerado un patrón heredado que disminuye la transparencia del código. La inyección mágica rompe con la naturaleza explícita del flujo de datos en React. La alternativa moderna arquitectónicamente superior sería utilizar el Context Pattern circunscrito al `TodoHeader` para proveer este estado interno a los *compound items*.

### 3.5. Container / Presenter Pattern y Composición de `children`

- **¿Qué problema resuelve?** Combate el antipatrón de *God Components* que asumen responsabilidades de diseño visual, carga de datos estructural, y mapeo simultáneamente.
- **¿Por qué es útil en React?** Materializa la máxima de "Composición vs Herencia" promovida por React, separando contundentemente la semántica del contenedor del layout de sus elementos renderizados.
- **¿Dónde se usa en este proyecto?** A lo largo de la estructura de Widgets, predominantemente en `src/widgets/todo-list/ui/TodoList.jsx`.

**Ejemplo de código extraído del codebase:**
```jsx
// src/widgets/todo-list/ui/TodoList.jsx
function TodoList(props) {
    return (
        <section className="TodoList-container">
            <ul>{props.children}</ul>
        </section>
    );
}
```

- **Explicación Nivel Maestría y Trade-offs:** El `TodoList` es un Componente "Dumb" (o Presentacional). Es arquitectónicamente agnóstico de si contendrá errores (`TodosError`), elementos vacíos (`EmptyTodos`) o los ítems finales (`TodoItem`). Este polimorfismo estructural consolida la *Flexibilidad Funcional*.
  - *Trade-off:* Desplazar en exceso la lógica fuera de los presentadores puede llevar a una sobre-población de responsabilidades en la vista superior (ej. en `HomePage`), lo cual fuerza al programador a coordinar demasiadas directivas en un solo lugar.

### 3.6. Derived State (Estado Derivado de Forma Síncrona)

- **¿Qué problema resuelve?** Impide las condiciones de carrera, la pérdida de *Single Source of Truth* (SSOT) y los re-renders en cascada causados por sincronizar estado local a través de `useEffect`.
- **¿Por qué es útil en React?** Optimiza y simplifica el flujo unidireccional, garantizando que todo cálculo supeditado a otra variable ocurra en el mismo ciclo de render.
- **¿Dónde se usa en este proyecto?** Dentro de la lógica de negocio modular en `src/entities/todo/model/useTodos.js`.

**Ejemplo de código extraído del codebase:**
```jsx
// src/entities/todo/model/useTodos.js
// Estado derivado: El número de TODOs que han sido marcados como completados.
const completedTodos = todos.filter((todo) => todo.completed).length;

// Estado derivado: El número total de TODOs.
const totalTodos = todos.length;

// Estado derivado: Un nuevo array de TODOs filtrado basado en `searchValue`.
const searchedTodos = !searchValue.length
    ? todos
    : todos.filter((todo) => {
          return todo.text.toLowerCase().includes(searchValue.toLowerCase());
      });
```

- **Explicación Nivel Maestría y Trade-offs:** En lugar de crear estados independientes (`useState`) y sincronizarlos (`useEffect`)—una grave violación a los principios reactivos—este código evalúa los metadatos y listas filtradas *al vuelo* en el cuerpo del render (fase de conciliación). Funciona bajo el principio de Transparencia Referencial en el paradigma declarativo.
  - *Trade-off:* Si las derivaciones son extremadamente costosas (O(n) o mayores con datasets volumétricos), bloquearán el Main Thread. A nivel maestría, en arreglos extensos se debe mitigar este riesgo englobando estas operaciones matemáticas computacionales dentro del hook `useMemo`, previniendo que la evaluación ocurra en re-renders no relacionados. En la iteración actual, dado que el tamaño de `todos` es presumiblemente bajo, omitir memoización es una decisión correcta para evitar el overhead en la memoria.

---

## 4. Flujo de Datos

El flujo de datos en esta arquitectura respeta rigurosamente el paradigma de **flujo unidireccional (Unidirectional Data Flow)** intrínseco de React, pero se orquesta de manera sofisticada mediante el patrón de Contexto y Custom Hooks para evitar el antipatrón de *Prop Drilling*.

### Estado Local vs Global
El estado se ha bifurcado semánticamente:
- **Estado Global de Dominio:** Gestionado a través de `TodoContext` y el hook `useTodos`. Este estado encapsula la colección de entidades (todos), el estado de carga (`loading`), errores (`error`) y los filtros activos (`searchValue`). Al ser de dominio cruzado, permite que múltiples ramas del árbol de componentes (`TodoSearch`, `TodoList`, `TodoForm`) reaccionen a mutaciones sin acoplamiento directo.
- **Estado Persistente (I/O):** Delegado al hook `useLocalStorage`, el cual actúa como una capa de infraestructura (Data Layer). Aísla los efectos secundarios de lectura/escritura en el navegador del núcleo de la lógica de negocio.

### Principios de React Hooks Aplicados
El proyecto hace un uso idiomático de los Hooks para separar responsabilidades (*Separation of Concerns*). El estado derivado (como `completedTodos` o `searchedTodos`) se calcula al vuelo en el ciclo de renderizado dentro de `useTodos`, garantizando una fuente única de verdad (Single Source of Truth) y previniendo la desincronización de estados redundantes.

### Diagrama ASCII del Estado y Flujo

```text
+-----------------------+        +--------------------------+       +------------------------+
|      Data Layer       |        |      Business Logic      |       |      State Layer       |
|                       |        |                          |       |                        |
|   useLocalStorage.js  | <====> |        useTodos.js       | ====> |    TodoContext.js      |
|  (I/O, Persistencia)  |        | (Mutaciones, Derivados)  |       | (Proveedor Global)     |
+-----------------------+        +--------------------------+       +------------------------+
                                                                                 |
                                                                                 | (Distribución)
                                                                                 v
+-----------------------+        +--------------------------+       +------------------------+
|       Feature         |        |         Widget           |       |        Feature         |
|                       |        |                          |       |                        |
|      TodoForm.jsx     | =====> |      TodoList.jsx        | <==== |     TodoSearch.jsx     |
| (Dispara mutación)    |        |  (Consume y Renderiza)   |       | (Filtra Estado Global) |
+-----------------------+        +--------------------------+       +------------------------+
```

---

## 5. Convenciones de Código y Clean Code

El repositorio exhibe una clara madurez en la aplicación de principios de **Clean Code** y estándares de nomenclatura, fundamentales para la escalabilidad en aplicaciones empresariales.

### La Convención de Prefijos `f_`
Un rasgo distintivo de la base de código es el uso sistemático del prefijo `f_` (ej. `f_onSubmit`, `f_onChange`, `f_onComplete`, `f_toggleShow`). 
Desde una perspectiva académica, esta es una **notación húngara mitigada** aplicada a funciones en un entorno funcional. Resuelve la ambigüedad cognitiva en componentes de React donde conviven variables de estado (primitivos/objetos) con funciones controladoras de eventos (*handlers*). Al anteponer `f_`, el desarrollador identifica inmediatamente que el identificador es una referencia a una función ejecutable, facilitando la auditoría de *closures* y la asignación de eventos en el JSX:

```jsx
// Ejemplo extraído del codebase (features/create-todo/ui/TodoForm/index.jsx)
const f_onChange = (event) => { /* ... */ };
const f_onSubmit = (event) => { /* ... */ };

return (
  <form onSubmit={f_onSubmit}>
    <textarea onChange={f_onChange} />
  </form>
);
```

### División de Responsabilidades y Arquitectura FSD
El proyecto adopta conceptos de **Feature-Sliced Design (FSD)**. Se observa una partición estricta en dominios:
- `entities/`: Modelos de negocio puros (`todo`).
- `features/`: Interacciones de usuario específicas (`create-todo`, `filter-todo`).
- `shared/`: Infraestructura agnóstica (`useLocalStorage`).
- `widgets/`: Bloques de UI compuestos (`header`, `todo-list`).

Esta división modulariza el acoplamiento y promueve una alta cohesión, donde cada directorio encapsula su propia interfaz (`ui`) y lógica (`model`).

---

## 6. Componentes Principales

A continuación se realiza un análisis arquitectónico de las entidades topológicas del sistema:

### `HomePage.jsx` (Orquestador / Page Component)
- **Rol Arquitectónico:** Actúa como el *Root Presenter*. No posee lógica de negocio intrínseca; su responsabilidad exclusiva es consumir el Contexto (`useTodoContext`) y orquestar el layout combinando *Widgets* y *Features*.
- **Decisiones de Diseño:** Implementa el patrón *Container/Presenter* a gran escala. Las dependencias se inyectan en forma de hijos (composición) en lugar de pasar propiedades jerárquicas extensas.

### `useTodos.js` (Custom Hook / Business Model)
- **Rol Arquitectónico:** Es el *Facade* de la lógica de dominio de la aplicación.
- **Responsabilidad:** Engloba las operaciones CRUD (crear, completar, eliminar), procesa los estados derivados (filtrado por búsqueda) y gestiona la dependencia de infraestructura de almacenamiento.
- **Comentario sugerido:**
  ```javascript
  /**
   * @hook useTodos
   * @description Actúa como el Aggregate Root del dominio TODO. 
   * Encapsula la mutación inmutable del estado y orquesta la persistencia.
   */
  ```

### `useLocalStorage.js` (Infrastructure Hook)
- **Rol Arquitectónico:** Adaptador de persistencia (*Data Access Layer*).
- **Responsabilidad:** Abstraer la API sincrónica de `localStorage` y simular un comportamiento asincrónico (mediante `setTimeout` y `STORAGE_SIMULATED_DELAY`) para modelar correctamente estados de interfaz de carga y error.

---

## 7. Tecnologías, Librerías y Justificación Académica

- **React 19 (Hooks & Context API):** Se utiliza como librería base para la reconciliación del DOM y la gestión de estado reactivo. La elección de la *Context API* sobre herramientas externas está académicamente justificada dado que el dominio del estado (TODOs) es de complejidad moderada.
- **Vite:** Herramienta de *bundling* y servidor de desarrollo. Representa el estándar moderno, ofreciendo un *Hot Module Replacement (HMR)* casi instantáneo gracias al aprovechamiento de ES Modules nativos en el navegador.
- **CSS Vanilla (Módulos/Hojas de Estilo):** Aunque el enfoque actual es funcional, el uso de CSS estándar favorece la comprensión profunda del modelo de caja y posicionamiento web, sin la curva de abstracción de *utility-first frameworks*.
- **Arquitectura de Módulos (Alias `@/`):** El uso de alias para la resolución de rutas (ej. `@/shared/lib`) evita el problema de *Relative Path Hell* (`../../../`), mejorando la mantenibilidad y refactorización topológica en FSD.

---

## 8. Posibles Mejoras (Nivel Profesional)

Para elevar este proyecto a estándares corporativos de alta demanda, se sugieren los siguientes refactorings y adiciones:

1. **Migración a TypeScript:**
   - **Justificación:** La introducción de tipado estático erradicará errores de acceso a propiedades en tiempo de compilación y documentará implícitamente la forma de las entidades para otros ingenieros.
2. **Server-State Management (SWR o React Query):**
   - **Justificación:** Aunque `useLocalStorage` simula asincronismo, si el sistema evoluciona para consumir una API REST/GraphQL, una librería de caché como **TanStack Query** manejaría heurísticas avanzadas (reintentos, deduplicación de *requests*) que actualmente están ausentes.
3. **Code Splitting y Lazy Loading (`React.lazy`):**
   - **Justificación:** El componente `Modal` y su contenido (`TodoForm`) no son críticos para el *First Contentful Paint (FCP)*. Deberían cargarse de forma asíncrona solo cuando el usuario haga clic en "Crear Todo", reduciendo el tamaño del *bundle* inicial.
4. **Testing Automatizado (Vitest + React Testing Library):**
   - **Justificación:** Implementar pruebas unitarias para `useTodos` y pruebas de integración para el ciclo completo. Esto garantiza la resiliencia del código ante futuras iteraciones.
5. **Generación de Identificadores Únicos (UUID):**
   - **Justificación:** Actualmente los TODOs utilizan su propio `text` como `key` en el mapa de React y como identificador en las mutaciones. Esto generará colisiones y bugs si el usuario ingresa dos TODOs con el mismo texto. Se debe implementar `crypto.randomUUID()` para generar identificadores deterministas.

---

## 9. Conclusión Académica

El proyecto examinado constituye una demostración excepcional de ingeniería de front-end estructurada. Transciende la típica aplicación "To-Do" al implementar principios arquitectónicos avanzados como la **inversión de dependencias mediante Context**, la **separación de infraestructura mediante Custom Hooks**, y un esbozo robusto de **Feature-Sliced Design (FSD)**. 

Las convenciones léxicas aplicadas (como el prefijo funcional `f_`) y la segregación de responsabilidades demuestran un nivel de madurez técnica enfocado en la mantenibilidad a largo plazo. La base de código no solo resuelve el requerimiento funcional de gestionar tareas, sino que sienta una base de arquitectura de software escalable sobre la cual es factible integrar abstracciones de mayor complejidad teórica.