# Apuntes del Curso de React - Proyecto "To-Do List"

## Metodología Cornell para NotebookLM

Este documento está estructurado para facilitar el estudio. A la izquierda (o en **negrita**) encontrarás las **"Pistas" o "Preguntas Clave"**. A la derecha, las notas detalladas. Al final de cada sección principal, encontrarás un **resumen** para consolidar el conocimiento.

---

## Módulo 1: Configuración del Proyecto con Vite

| Pistas / Preguntas Clave | Notas Detalladas |
| :--- | :--- |
| **¿Qué es Vite? ¿Por qué usarlo?** | **Vite** es una herramienta de construcción y un servidor de desarrollo extremadamente rápido. A diferencia de herramientas más antiguas como Create React App, Vite no empaqueta toda la aplicación durante el desarrollo. En su lugar, sirve los archivos directamente al navegador usando módulos ES nativos, lo que resulta en un arranque casi instantáneo y actualizaciones ultra rápidas (Hot Module Replacement - HMR). En tu `package.json`, los scripts `dev`, `build` y `preview` usan Vite. |
| **`package.json`** | Es el corazón de tu proyecto Node.js. Define: <br> - **`name`**: El nombre de tu proyecto. <br> - **`scripts`**: Comandos que puedes ejecutar (ej: `pnpm run dev`). <br> - **`dependencies`**: Paquetes necesarios para que la aplicación funcione en producción (ej: `react`, `react-dom`). <br> - **`devDependencies`**: Paquetes solo para desarrollo (ej: `vite`, `eslint`). |
| **¿Qué significa `"type": "module"`?** | Esta línea en tu `package.json` le dice a Node.js que tu proyecto usa **Módulos de ECMAScript (ESM)**. Esto te permite usar la sintaxis `import ... from '...'` y `export ...` de forma nativa, que es el estándar moderno de JavaScript y es lo que usa Vite. |
| **`eslint.config.js`** | Este archivo configura **ESLint**, una herramienta para analizar tu código en busca de errores y forzar un estilo de código consistente. Tu configuración es moderna (usa el formato "flat config"), extiende reglas recomendadas para React (`eslint-plugin-react-hooks`) y está integrada con Vite. |

<br>

> **Resumen del Módulo 1:**
> Tu proyecto está configurado con herramientas modernas. Usas **Vite** para un desarrollo rápido y **ESLint** para mantener un código limpio y consistente. El `package.json` gestiona todas las dependencias y scripts, y el uso de **módulos ESM** te alinea con las prácticas actuales de JavaScript.

---

## Módulo 2: Fundamentos de React

| Pistas / Preguntas Clave | Notas Detalladas |
| :--- | :--- |
| **`index.html` y el `div#root`** | React es una librería para construir "Single Page Applications" (SPA). Tu `index.html` es muy simple. Solo contiene un `<div id="root"></div>`. React tomará el control total de este `div` para renderizar toda tu aplicación dentro de él, sin necesidad de recargar la página. |
| **`main.jsx` - El punto de entrada** | Este archivo es donde la magia comienza. La línea `createRoot(document.getElementById("root"))` le dice a React dónde renderizar. Luego, `.render(<App />)` le dice qué renderizar. Es el punto de conexión entre el DOM tradicional y tu aplicación de React. |
| **¿Qué es JSX?** | **JSX (JavaScript XML)** es una extensión de sintaxis para JavaScript que se parece mucho a HTML. Te permite escribir de forma declarativa cómo se deben ver tus componentes. En `App.jsx`, todo lo que está dentro del `return` es JSX. Aunque parece HTML, en realidad es transformado por Vite/Babel en llamadas a funciones de `React.createElement()`. |
| **Componentes Funcionales** | En React moderno, los componentes son simplemente funciones de JavaScript que devuelven JSX. En tu proyecto, `AppUI`, `TodoCounter`, `TodoItem`, etc., son todos componentes funcionales. Deben empezar con mayúscula. |
| **¿Qué son las `props`?** | Las **props (propiedades)** son la forma en que los componentes se comunican entre sí. Se pasan de un componente padre a un hijo, de forma similar a los atributos de HTML. Son de **solo lectura**. <br> **Ejemplo:** En `App.jsx`, `TodoItem` recibe `text`, `completed` y funciones como `props`: `<TodoItem text={item.text} completed={item.completed} />` |
| **`props.children`** | Es una `prop` especial. Contiene todo lo que pasas *entre* las etiquetas de apertura y cierre de un componente. <br> **Ejemplo:** En `main.jsx`, `<AppUI />` es el `children` de `<TodoProvider>`. En `TodoProvider.jsx`, `props.children` se renderiza para mostrar tu aplicación. Esto permite crear componentes "envoltorio" o "layouts". |
| **`React.StrictMode`** | Es un componente especial que envuelve tu aplicación (lo ves en `main.jsx`). No renderiza nada visible, pero activa chequeos y advertencias adicionales para sus descendientes durante el desarrollo. Te ayuda a encontrar problemas comunes y a escribir mejor código React. |

<br>

> **Resumen del Módulo 2:**
> Una aplicación de React se renderiza en un único elemento del DOM. Usamos **JSX** para describir la UI de forma declarativa dentro de **componentes funcionales**. Estos componentes son reutilizables y se comunican entre sí pasando datos de padres a hijos a través de **props**.

---

## Módulo 3: Estado, Ciclo de Vida y Eventos

| Pistas / Preguntas Clave | Notas Detalladas |
| :--- | :--- |
| **El Hook `useState`** | Es el hook más fundamental. Permite a los componentes funcionales tener su propio **estado** (datos que cambian con el tiempo y que provocan un nuevo renderizado). <br> **Uso:** `const [valor, setValor] = useState(valorInicial);` <br> - `valor`: La variable que contiene el estado actual. <br> - `setValor`: La función para actualizar ese estado. <br> **Ejemplo:** En `customContext.jsx`, `const [openModel, setOpenModal] = useState(false);` controla si el modal está visible o no. |
| **El Hook `useEffect`** | Permite ejecutar **efectos secundarios** en componentes funcionales. Los efectos secundarios son operaciones que interactúan con el "mundo exterior", como peticiones a APIs, suscripciones, o manipulación del DOM. Se ejecuta después de cada renderizado, a menos que especifiques dependencias. <br> **Uso:** `useEffect(() => { /* código del efecto */ }, [dependencias]);` <br> - El array de `dependencias` controla cuándo se vuelve a ejecutar el efecto. Si está vacío `[]`, solo se ejecuta una vez (al montar). <br> **Ejemplo:** En `useLocalStorage.js`, se usa para cargar los datos del `localStorage` la primera vez. |
| **Estado Derivado** | Es una práctica muy importante. En lugar de crear un estado para cada pieza de información, calculas valores a partir de tu estado principal. Esto evita la duplicación de datos y posibles inconsistencias. <br> **Ejemplo:** En `customContext.jsx`, `completedTodos` y `totalTodos` no son estados (`useState`). Son variables que se calculan en cada renderizado a partir del array `data`. Lo mismo ocurre con `searchedTodos`. |
| **Manejo de Eventos** | En JSX, los manejadores de eventos se escriben en `camelCase` (ej: `onClick`, `onChange`). Les pasas una función que se ejecutará cuando ocurra el evento. <br> **Ejemplo:** En `TodoItem.jsx`, el `span` para borrar tiene un `onClick={() => onDeleteItem()}`. El uso de una función de flecha `() => ...` es crucial here para asegurar que `onDeleteItem` solo se llame *cuando* se hace clic, y no durante el renderizado. |
| **Flujo de Datos Unidireccional** | En React, los datos fluyen en una sola dirección: **de arriba hacia abajo** (de componentes padres a hijos) a través de las `props`. Para comunicar un cambio desde un hijo hacia un padre (ej: un clic en `TodoItem` que debe borrar un "todo" del estado principal), el padre pasa una **función como prop** al hijo. El hijo llama a esa función when ocurre el evento. |

<br>

> **Resumen del Módulo 3:**
> El estado de un componente se maneja con `useState`, causando nuevos renderizados cuando cambia. Los efectos secundarios (como llamadas a APIs o `localStorage`) se gestionan con `useEffect`. El manejo de eventos se logra pasando funciones como `props`, respetando el flujo de datos unidireccional de React. Calcular **estado derivado** es una práctica clave para un estado limpio y predecible.

---

## Módulo 4: Hooks Avanzados y Arquitectura

| Pistas / Preguntas Clave | Notas Detalladas |
| :--- | :---|
| **¿Qué es "Prop Drilling"?** | Es un problema que ocurre en React cuando tienes que pasar `props` a través de varios niveles de componentes anidados, incluso si los componentes intermedios no usan esas `props`. Hace que el código sea difícil de mantener. **React Context** es la solución. |
| **React Context API** | Es el mecanismo nativo de React para compartir estado global o "global-ish" sin tener que pasar `props` manualmente a través de todos los niveles. <br> **1. `React.createContext()`**: Crea un objeto de contexto. En tu caso, `const TodoContext = React.createContext();`. <br> **2. `<Context.Provider>`**: Este componente "provee" el valor a todos sus descendientes. En `customContext.jsx`, el `TodoProvider` envuelve a `props.children` y le pasa el objeto `value`. <br> **3. `useContext(Context)`**: Este hook permite a cualquier componente funcional descendiente leer el valor del contexto. En `AppUI.jsx`, `const { loading, error, ... } = React.useContext(TodoContext);` consume los datos. |
| **Hooks Personalizados (Custom Hooks)** | Son la herramienta de reutilización de lógica más potente de React. Un Custom Hook es simplemente una función JavaScript cuyo nombre empieza por `use` y que puede llamar a otros hooks (como `useState` o `useEffect`). <br> **Beneficios**: Abstraen lógica compleja, limpian tus componentes y son reutilizables. <br> **Ejemplo**: Tu hook `useLocalStorage` es perfecto. Encapsula toda la lógica de estado, carga, error y persistencia en `localStorage`, devolviendo una API simple (`{ loading, error, item, saveItem }`) para que `TodoProvider` la use. |
| **Renderizado Condicional** | Es la técnica para mostrar diferente JSX según el estado. En React no hay `v-if` como en Vue. Se usa JavaScript puro: <br> - **Operador ternario**: `condicion ? <JSX_A /> : <JSX_B />`. <br> - **Operador `&&`**: `condicion && <JSX_A />`. Ideal para mostrar algo o nada. <br> **Ejemplo**: En `AppUI.jsx`, usas `&&` para mostrar los mensajes de carga y error: `loading && <p>Estamos cargando</p>`. |
| **Modales (`Modal.jsx`)** | Tu implementación del modal es un gran ejemplo de cómo usar **Portales de React** (aunque no lo usas directamente, `createPortal` es la herramienta subyacente para esto) para renderizar un elemento fuera de la jerarquía del DOM de su componente padre. El `Modal` se renderiza condicionalmente en `AppUI` basado en el estado `openModel` del contexto, mostrando el `TodoForm`. |

<br>

> **Resumen del Módulo 4:**
> Has implementado patrones avanzados y muy importantes. Usas **React Context** para evitar el "prop drilling" y gestionar un estado global de forma limpia. Has creado un **Hook Personalizado** (`useLocalStorage`) para encapsular y reutilizar lógica compleja, lo cual es una práctica excelente. La arquitectura de tu aplicación, combinando estos patrones con el **renderizado condicional**, es robusta y escalable.
