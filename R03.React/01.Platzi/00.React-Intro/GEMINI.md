# Descripción General del Proyecto

Esta es una aplicación sencilla de tareas (TODO) construida con React. Permite a los usuarios crear, ver, completar y eliminar ítems de su lista de tareas. El estado de la aplicación se gestiona mediante la Context API de React y todos los datos se persisten en el `localStorage` del navegador.

## Tecnologías

- **React:** El núcleo de la aplicación está construido con React 18, enfocándose en componentes funcionales y hooks.
- **React Context API:** Utilizada para la gestión del estado global, proporcionando un `TodoProvider` que encapsula toda la lógica y los datos de la aplicación.
- **Hooks Personalizados:** El proyecto cuenta con un hook personalizado `useLocalStorage` para abstraer la lógica de interacción con `localStorage`, haciendo el código más limpio y reutilizable.
- **Vite:** Utilizado como herramienta de construcción y servidor de desarrollo para un alto rendimiento.
- **PNPM:** El gestor de paquetes preferido para este proyecto.
- **CSS con Propiedades Personalizadas:** El estilizado se realiza mediante CSS puro con propiedades personalizadas (variables) definidas en `index.css` para un sistema de diseño consistente.

## Arquitectura

La aplicación sigue una arquitectura basada en componentes:

- **`src/main.jsx`:** El punto de entrada donde se renderizan el `TodoProvider` y `AppUI`.
- **`src/App.jsx`:** El componente de diseño principal que consume el `TodoContext`.
- **`src/context/customContext.jsx`:** Define `TodoContext` y `TodoProvider`, gestionando el estado global (tareas, búsqueda, modal).
- **`src/hook/useLocalStorage.js`:** Hook personalizado para la gestión persistente del estado.
- **`src/components/`:** Componentes de interfaz de usuario reutilizables.
- **`src/style/`:** Archivos CSS específicos para cada componente.

## Construcción y Ejecución

Este proyecto utiliza `pnpm`. Para ejecutarlo localmente:

1.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```
2.  **Ejecutar el servidor de desarrollo:**
    ```bash
    pnpm run dev
    ```
3.  **Construir para producción:**
    ```bash
    pnpm run build
    ```
4.  **Analizar el código (Lint):**
    ```bash
    pnpm run lint
    ```

## Convenciones de Desarrollo

- **Basado en Componentes:** Divide la interfaz en componentes pequeños y reutilizables.
- **Estado Global:** Utiliza `TodoContext` para compartir el estado entre componentes.
- **Estilizado:** Usa CSS puro con un archivo por componente. Sigue la convención de nombres `PascalCase.css` para los estilos de los componentes.
- **Documentación JSDoc:** Cada archivo, componente y función de utilidad debe estar documentado con JSDoc, explicando el "por qué" en lugar de solo el "qué".

# Mejores Prácticas de JSDoc

El principio fundamental es que **la documentación debe explicar el "por qué", no solo el "qué"**. El código ya muestra lo que hace; una buena documentación explica el razonamiento, el contexto y los detalles no obvios.

## Patrones de Documentación

### Preámbulos de Archivo

Cada archivo debe tener un comentario de preámbulo en la parte superior:

```javascript
/**
 * @file nombre_del_archivo.jsx
 * @description Breve descripción del propósito del archivo.
 * @module nombreDelModulo
 */
```

### Documentación de Componentes/Funciones

Usa `@remarks` para documentar el "por qué" y el contexto importante:

```javascript
/**
 * Breve descripción de lo que hace la función.
 * @param {Type} nombreParam - Descripción del parámetro.
 * @returns {Type} Descripción del valor de retorno.
 * @remarks
 * - Explica decisiones de diseño.
 * - Restricciones de uso o comportamientos no obvios.
 */
```

## Descripciones de Parámetros y Retorno

Evita repetir nombres; aporta valor explicando restricciones, unidades o casos borde.
