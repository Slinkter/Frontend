# 🎓 Masterclass: Arquitectura y Patrones Avanzados en React

Bienvenido a esta Masterclass inmersiva sobre React. Este documento no es un simple resumen, sino un tratado educativo diseñado para llevarte desde los fundamentos hasta el dominio de patrones arquitectónicos avanzados, utilizando como caso de estudio una aplicación real de gestión de estado (Todo App).

---

## 📘 Módulo 1: Fundamentos de React (Básicos)

Antes de construir arquitecturas complejas, debemos dominar los cimientos. React es una biblioteca declarativa para construir interfaces de usuario basadas en componentes.

### 1.1 Componentes y JSX
La UI se divide en piezas independientes y reutilizables llamadas componentes. Escribimos estos componentes usando JSX, una extensión de sintaxis que permite mezclar HTML con JavaScript.

*   **Regla de Oro:** Un componente debe retornar un único elemento raíz (o un Fragmento `<>...</>`).
*   **En la práctica:** `TodoItem`, `TodoSearch`, `TodoCounter` son componentes atómicos que se encargan de renderizar una parte minúscula de la pantalla.

### 1.2 Props: Comunicación Top-Down
Las `props` (propiedades) son el mecanismo para pasar datos de un componente padre a un componente hijo. Son de **solo lectura** (inmutables).

*   **Ejemplo:** `AppUI` pasa `totalTodos` a `TodoCounter`. `TodoCounter` no puede modificar ese número, solo mostrarlo.

### 1.3 Estado Local (`useState`)
A diferencia de las props, el estado es **mutable** y pertenece al componente. Cuando el estado cambia, React re-renderiza el componente para reflejar el nuevo dato.

*   **Controlled Components:** En formularios, el estado de React controla el valor del input. En `TodoForm`, el input de texto está atado al estado `newTodoValue` mediante el evento `onChange`.

---

## 📙 Módulo 2: React Intermedio (Gestión de Flujos)

A medida que la aplicación crece, necesitamos manejar cómo los datos fluyen y cómo la UI reacciona a los estados asíncronos.

### 2.1 Elevación del Estado (Lifting State Up)
¿Qué pasa cuando dos componentes hermanos necesitan compartir el mismo estado? (Ej. `TodoSearch` necesita actualizar el texto de búsqueda, y `TodoList` necesita ese texto para filtrar las tareas).
*   **Solución:** Movemos el estado al ancestro común más cercano (en este caso, `App.jsx`).
*   **Consecuencia (Prop Drilling):** Tenemos que pasar las funciones actualizadoras (callbacks) y el estado a través de componentes intermedios mediante props.

### 2.2 Renderizado Condicional
Las interfaces no son estáticas; cambian según el estado de los datos (cargando, error, vacío, con datos).
*   **Operador Lógico (`&&`):** Usado para renderizar si una condición es verdadera (ej. `{isLoading && <TodosLoading />}`).
*   **Operador Ternario (`? :`):** Útil para alternar clases CSS (ej. `className={isCompleted ? "complete" : ""}`).
*   **Guard Clauses (Retornos tempranos):** En `ChangeAlert`, si `!hasChanges`, hacemos un `return null;` para evitar renderizar el resto del componente. Esto reduce el anidamiento y mejora la legibilidad (Clean Code).

### 2.3 El Ciclo de Vida y Efectos (`useEffect`)
`useEffect` nos permite sincronizar un componente con un sistema externo (como una API, el DOM o, en nuestro caso, el `localStorage` y eventos de la ventana).
*   **Dependencias:** El array `[]` al final del `useEffect` asegura que el efecto (leer del `localStorage` inicial o suscribirse al evento `storage`) se ejecute **solo una vez** al montar el componente.
*   **Cleanup Function:** Es crucial retornar una función desde `useEffect` para limpiar suscripciones (ej. `window.removeEventListener`) y evitar memory leaks cuando el componente se desmonta.

---

## 📕 Módulo 3: React Avanzado (Abstracción y Patrones)

Aquí es donde la ingeniería de software brilla. Dejamos de escribir simple código UI y comenzamos a diseñar sistemas robustos.

### 3.1 Custom Hooks (Separation of Concerns)
Un Custom Hook es una función de JavaScript que empieza con `use` y que puede llamar a otros Hooks.
*   **El Problema:** La lógica de estado compleja (leer de localStorage, filtrar todos, manejar errores) ensucia los componentes visuales.
*   **La Solución:** Extraemos toda esa lógica de negocio a funciones como `useTodos` y `useLocalStorage`.
*   **Beneficio:** Los componentes se vuelven "tontos" (agnósticos de dónde vienen los datos), y la lógica se vuelve testeable y reutilizable. `useTodos` es la "fuente de la verdad" de nuestro dominio.

### 3.2 Patrón Reducer (`useReducer`)
Cuando un componente tiene múltiples sub-valores de estado que cambian juntos, o cuando el próximo estado depende del anterior de forma compleja, `useState` se vuelve frágil.
*   **Implementación:** En `useLocalStorage`, en lugar de tener `setIsLoading`, `setHasError`, `setItem`, usamos un **Reducer**.
*   **Concepto:** Despachamos *Acciones* (ej. `SUCCESS`, `ERROR`). El Reducer es una función pura externa que toma el estado actual y la acción, y retorna el *nuevo estado completo*. Esto centraliza la lógica de mutación de estado y la hace predecible.

### 3.3 React Portals
A veces, un componente (como un Modal o un Tooltip) necesita visualmente sobreponerse a todo lo demás, pero anidarlo profundamente en el árbol del DOM causa problemas de `z-index` y `overflow`.
*   **La Solución:** `ReactDOM.createPortal`. Permite renderizar el `Modal` en un nodo físico del DOM completamente distinto (ej. `<div id="modal"></div>` en el `index.html`), mientras lógicamente sigue siendo hijo en el árbol de React.

### 3.4 Composición de Componentes y Prop Injection
Evitamos componentes monolíticos gigantes pasando componentes como `props.children`.
*   **Ejemplo Básico:** `<TodoList>` no sabe qué va a renderizar adentro. Solo pinta un `<section>` y arroja sus `children` dentro.
*   **Ejemplo Avanzado (Prop Injection):** En `<TodoHeader>`, necesitamos que todos sus hijos (`TodoCounter`, `TodoSearch`) reciban la prop `isLoading`. En lugar de pasarla manualmente a cada uno en `AppUI`, usamos `React.Children.toArray(children).map(child => React.cloneElement(child, { isLoading }))`. El padre "inyecta" la prop invisiblemente.

---

## 🏛️ Módulo 4: Arquitectura Frontend y Clean Code

Construir software no es solo hacer que funcione, es hacer que sea mantenible por humanos.

### 4.1 Patrón Container / Presenter
Divide el código en dos capas claras:
1.  **Container (`App.jsx`):** Inteligente. Se conecta a la lógica de negocio (llama a los Custom Hooks). No tiene HTML (divs, spans). Decide *qué* datos existen.
2.  **Presenter (`AppUI.jsx`):** Tonto (Dumb). Recibe datos por `props`. No tiene lógica de negocio. Solo tiene HTML/JSX. Decide *cómo* se ven los datos.

### 4.2 Naming Conventions (Convenciones de Nomenclatura)
El código se lee más veces de las que se escribe.
*   **PascalCase:** Archivos de componentes y declaraciones (`AppUI`, `TodoItem`).
*   **camelCase:** Funciones, variables, props (`addTodo`, `searchedTodos`).
*   **Regla de Booleanos:** Todo booleano debe sonar a una pregunta que responde Sí/No. Nunca usar `loading`, usar `isLoading`. Nunca usar `error`, usar `hasError`. Nunca `modal`, usar `isOpenModal`.

### 4.3 Arquitectura de Archivos (Layered Component-Based)
*   `/hook`: Capa de dominio y persistencia.
*   `/components`: Capa de presentación (UI). Cada componente en su propia carpeta con su `index.jsx` y su `.css`, manteniendo los estilos escopados lógicamente a su componente.
*   **Barrel Files (`index.js`):** En la raíz de `/components`, un archivo que exporta todo para permitir importaciones limpias: `import { TodoForm, Modal } from './components';`.

---

## 🔬 Módulo 5: Caso de Estudio - El Patrón Observer en Múltiples Pestañas

¿Cómo logramos que si el usuario abre la app en dos pestañas diferentes, y borra un TODO en la Pestaña A, la Pestaña B se entere y le avise al usuario?

1.  **El Evento Nativo:** Los navegadores disparan un evento llamado `storage` en el objeto `window` cada vez que el `localStorage` es modificado *desde otra pestaña/ventana* del mismo dominio.
2.  **El Listener (`useStorageListener`):** Usamos `useEffect` para suscribirnos a este evento (`window.addEventListener('storage', ...)`).
3.  **Reacción:** Si el evento indica que la llave `TODOS_V1` cambió, actualizamos un estado local `hasStorageChanges` a `true`.
4.  **UI Feedback (`ChangeAlert`):** Este cambio de estado hace que el componente renderice un popup diciendo: "Hubo cambios, ¿quieres sincronizar?".
5.  **Sincronización:** Al hacer clic en "Sí", se ejecuta la función `onSync`, que dispara un `dispatch` en el reducer del `useLocalStorage` para poner `isLoading` en true, lo que vuelve a montar la lógica de lectura del `localStorage`, obteniendo los datos más frescos.

---

## 🎯 Conclusión de la Masterclass

Al dominar esta arquitectura, has pasado de construir "páginas web" a diseñar **Sistemas de Software Frontend**. Entiendes que el estado no debe mezclarse con los botones, que la persistencia de datos es un detalle de infraestructura oculto en un hook, y que la legibilidad de tu código es tan importante como su funcionalidad. 

Estás listo para escalar estas bases hacia herramientas más complejas como Context API, Redux, Zustand o React Query, porque los principios fundamentales de **Separación de Responsabilidades** y **Flujo Unidireccional de Datos** son los mismos.
