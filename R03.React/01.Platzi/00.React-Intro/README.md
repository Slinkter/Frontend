# Aplicación de TODOs con React

## Descripción y Propósito

Este proyecto es una aplicación sencilla de tareas (Todo) construida con React, diseñada para demostrar conceptos fundamentales de la biblioteca como componentes, props, manejo de estado con hooks (`useState`, `useContext`, `useEffect`) y hooks personalizados (`useLocalStorage`). La aplicación permite a los usuarios crear, marcar como completadas y eliminar tareas. También cuenta con una funcionalidad de búsqueda para filtrar las tareas y un modal para la creación de nuevos ítems.

## Instalación y Configuración

Para poner en marcha este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el repositorio:**

    ```bash
    git clone <url-del-repositorio>
    cd 00.React-Intro
    ```

2.  **Instalar dependencias:**
    Este proyecto utiliza `pnpm` como gestor de paquetes. Si no tienes `pnpm` instalado, puedes hacerlo de forma global:

    ```bash
    npm install -g pnpm
    ```

    Luego, instala las dependencias del proyecto:

    ```bash
    pnpm install
    ```

3.  **Ejecutar el servidor de desarrollo:**

    ```bash
    pnpm run dev
    ```

    Esto iniciará el servidor de desarrollo de Vite. Puedes ver la aplicación en tu navegador, normalmente en `http://localhost:5173`.

4.  **Construir para producción:**
    Para crear una versión de producción de la aplicación:
    ```bash
    pnpm run build
    ```
    Los archivos generados se ubicarán en el directorio `dist/`.

## Arquitectura Aplicada

La aplicación sigue una arquitectura basada en componentes, típica de los proyectos de React, con un enfoque en la separación de responsabilidades y la reutilización. Los patrones y estructuras clave incluyen:

- **Estructura Basada en Componentes:** La interfaz de usuario se divide en componentes pequeños y reutilizables (ej., `TodoItem`, `TodoList`, `TodoSearch`, `TodoForm`).
- **Context API para el Manejo de Estado:** Se utiliza `TodoContext` para gestionar el estado global (tareas, término de búsqueda, visibilidad del modal). Esto evita el "prop drilling" y hace que el estado sea accesible para todos los componentes necesarios.
- **Hooks Personalizados:** Se ha implementado un hook personalizado `useLocalStorage` para abstraer la lógica de interacción con el `localStorage` del navegador. Esto promueve la reutilización y mantiene limpia la lógica de los componentes.
- **Separación de Responsabilidades:** La lógica relacionada con la persistencia de datos está encapsulada en el hook `useLocalStorage`, mientras que la lógica de la interfaz reside en los componentes.
- **Variables CSS:** Se definen variables globales en `index.css` para mantener un sistema de diseño consistente. Los estilos específicos de cada componente se encuentran en sus respectivos archivos CSS.
- **JSX para la UI:** Todos los componentes que renderizan elementos de la interfaz utilizan la extensión `.jsx`.

### Estructura del Proyecto

```
src/
├── App.jsx             # Componente principal de la aplicación
├── main.jsx            # Punto de entrada de React
├── index.css           # Estilos globales y variables CSS
├── assets/             # Activos estáticos
├── components/         # Componentes de UI reutilizables
│   ├── CreateTodoButton.jsx
│   ├── Modal.jsx
│   ├── TodoCounter.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── TodoSearch.jsx
├── context/
│   └── customContext.jsx # Contexto de React para estado global
├── hook/
│   └── useLocalStorage.js # Hook personalizado para localStorage
└── style/              # Estilos específicos de componentes
    ├── CreateTodoButton.css
    ├── modal.css
    ├── TodoCounter.css
    ├── TodoForm.css
    ├── TodoItem.css
    ├── TodoList.css
    └── TodoSearch.css
```

# Documentación del Proyecto

Este documento proporciona una visión detallada de la arquitectura, los componentes y el manejo de estado.

## 1. Descripción General

La aplicación de TODOs es una herramienta funcional para la gestión de tareas que permite:

- **Crear nuevas tareas:** Añadir ítems a la lista.
- **Completar tareas:** Cambiar el estado de cada tarea.
- **Eliminar tareas:** Quitar ítems de la lista.
- **Buscar tareas:** Filtrar la lista mediante una consulta de búsqueda.

## 2. Conceptos Clave

- **Componentes:** La UI está dividida en piezas independientes y reutilizables.
- **Props:** Los componentes se comunican pasando datos a través de propiedades.
- **Estado (State):** Los componentes gestionan sus datos internos. Al cambiar el estado, React re-renderiza el componente.
- **Hooks:** Funciones que permiten "engancharse" al estado y al ciclo de vida en componentes funcionales (`useState`, `useContext`, `useEffect`).

## 3. Arquitectura de Componentes

- **`App.jsx`:** Componente raíz que orquesta la aplicación y provee el `TodoProvider`.
- **`TodoCounter.jsx`:** Muestra el número de tareas completadas y el total.
- **`TodoSearch.jsx`:** Input controlado para filtrar tareas.
- **`TodoList.jsx`:** Contenedor que renderiza la lista de tareas.
- **`TodoItem.jsx`:** Representa una única tarea con acciones para completar o eliminar.
- **`CreateTodoButton.jsx`:** Botón que abre el modal de creación.
- **`TodoForm.jsx`:** Formulario para añadir una nueva tarea.
- **`Modal.jsx`:** Utiliza portales de React para renderizar el formulario en un overlay.

## 4. Gestión de Estado

Se utiliza una combinación de `useState` y `useContext`.

- **`TodoContext`** provee los siguientes valores:
  - `isLoading`: Indica si los datos se están cargando desde `localStorage`.
  - `hasError`: Indica si hubo un error en la persistencia.
  - `totalTodos`: Cantidad total de tareas.
  - `completedTodos`: Cantidad de tareas finalizadas.
  - `searchValue`: Término de búsqueda actual.
  - `setSearchValue`: Función para actualizar la búsqueda.
  - `searchedTodos`: Lista de tareas filtrada.
  - `addTodo`: Función para añadir tareas.
  - `completeTodo`: Función para marcar como completada.
  - `deleteTodo`: Función para borrar una tarea.
  - `isModalOpen`: Estado de visibilidad del modal.
  - `setIsModalOpen`: Función para abrir/cerrar el modal.

## 5. Hooks Personalizados

- **`useLocalStorage.js`:** Abstrae la lógica de lectura y escritura en el `localStorage`. Maneja estados de carga y error, y sincroniza los cambios automáticamente.

## 6. Estilos

- **`index.css`:** Define el sistema de diseño mediante variables CSS (colores, espaciado, sombras).
- **Estilos por componente:** Cada componente tiene su propio archivo CSS, encapsulando su apariencia y evitando conflictos globales.

## 7. Alcance y Limitaciones

Este proyecto es una demostración técnica y no una aplicación de producción completa.
- **Solo cliente:** Los datos se guardan localmente en el navegador.
- **Usuario único:** No hay cuentas ni autenticación.
- **Sin enrutamiento:** Es una aplicación de una sola página (SPA).

### Futuras Mejoras
- Integración con un backend (API + Base de datos).
- Autenticación de usuarios.
- Implementación de rutas con React Router.
- Fechas de vencimiento y prioridades para las tareas.
