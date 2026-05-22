# 🎓 Cornell Note-Taking: Análisis de Arquitectura React

| **Fecha:** 15 de Abril, 2026 | **Materia:** Arquitectura de Software Frontend |
| :--- | :--- |
| **Proyecto:** Todo App - React State Management | **Tema:** Patrones, Estado y Composición |

---

## 🏗️ Sección 1: Arquitectura y Estructura

| **Claves (Cues)** | **Notas de la Masterclass (Notes)** |
| :--- | :--- |
| **¿Cuál es el patrón arquitectónico principal?** | El proyecto utiliza una **Arquitectura de Capas Estricta** (Layered Architecture) para separar la lógica de negocio de la interfaz visual. |
| **Capa de Dominio (Hooks)** | Centralizada en `src/hook/`. Aquí vive la "verdad" de los datos y las reglas de negocio (CRUD). |
| **Capa de Orquestación** | Representada por `App.jsx`. Actúa como un **Container** que conecta los hooks con la UI. No contiene lógica pesada, solo invoca y distribuye. |
| **Capa de Presentación** | Ubicada en `src/components/` y `AppUI.jsx`. Son componentes "tontos" (Presentational) que solo saben renderizar props. |
| **Estructura de Carpetas** | Basada en componentes: cada componente tiene su propia carpeta con `index.jsx` (lógica visual) y `.css` (estilos), asegurando alta cohesión. |

> **Resumen de Sección:** La separación de capas garantiza que la lógica de negocio (hooks) sea independiente de cómo se ve la app (componentes), facilitando el mantenimiento y las pruebas.

---

## 🧠 Sección 2: Gestión de Estado Avanzada

| **Claves (Cues)** | **Notas de la Masterclass (Notes)** |
| :--- | :--- |
| **¿Cómo se maneja el estado complejo?** | Se prefiere **`useReducer`** sobre `useState` para estados con múltiples sub-valores o transiciones dependientes (ej. carga, error, datos). |
| **Patrón Reducer** | La lógica del reducer en `useLocalStorage` se define **fuera del hook**. Esto permite que la función sea pura, predecible y fácil de debuguear. |
| **Custom Hooks** | Abstraen la complejidad. `useTodos` encapsula el filtrado, creación y borrado, devolviendo un objeto `state` y un objeto `stateUpdaters`. |
| **Lifting State Up** | El estado de búsqueda (`searchValue`) y el modal (`isOpenModal`) se elevan a `App.jsx` para que puedan ser compartidos entre componentes hermanos. |

> **Resumen de Sección:** El uso de Reducers y Custom Hooks transforma el manejo de estado de algo imperativo y disperso a un sistema declarativo y centralizado.

---

## 🎨 Sección 3: Patrones de Diseño UI

| **Claves (Cues)** | **Notas de la Masterclass (Notes)** |
| :--- | :--- |
| **Component Composition** | Se usa `props.children` para evitar componentes rígidos. `TodoList` y `TodoHeader` son contenedores flexibles. |
| **Prop Injection (Clone)** | En `TodoHeader`, se usa `React.cloneElement` para inyectar automáticamente la prop `isLoading` a todos sus hijos, evitando pasarla manualmente. |
| **React Portals** | El componente `Modal` usa `createPortal` para renderizar contenido en un nodo del DOM fuera del `#root`. Ideal para modales y overlays. |
| **Naming Conventions** | Se aplica **Boolean Prefixing** (`isLoading`, `hasError`, `isOpenModal`). Esto mejora la legibilidad inmediata del código (Clean Code). |

> **Resumen de Sección:** Los patrones de composición y portales permiten que la UI sea escalable y evitan problemas comunes de CSS (z-index) y jerarquía de datos (prop drilling).

---

## 🔄 Sección 4: Sincronización y Persistencia

| **Claves (Cues)** | **Notas de la Masterclass (Notes)** |
| :--- | :--- |
| **Persistencia** | Los datos se guardan en el `localStorage` del navegador bajo la llave `TODOS_V1`. |
| **¿Cómo funciona el Sync entre pestañas?** | Se implementa un **Storage Observer** mediante el hook `useStorageListener`. |
| **Evento 'storage'** | El navegador dispara este evento cuando otra pestaña modifica los datos. El hook detecta este cambio y activa una alerta visual (`ChangeAlert`). |
| **Resincronización** | Al aceptar la alerta, se dispara una acción al reducer que fuerza una nueva lectura del storage, actualizando la pestaña actual sin recargar la página. |

> **Resumen de Sección:** La sincronización multi-pestaña añade una capa de robustez profesional, asegurando que el usuario siempre vea los datos más recientes sin importar dónde los editó.

---

## 💡 Resumen Final (The Summary)

El proyecto es un ecosistema de React diseñado bajo principios de ingeniería de software modernos. No solo "funciona", sino que está construido para ser **escalable** (mediante composición), **mantenible** (mediante clean code y capas) y **robusto** (mediante reducers y sincronización). La clave del éxito de esta arquitectura reside en que cada pieza de código tiene una responsabilidad única y bien definida, siguiendo el principio **SRP (Single Responsibility Principle)**.
