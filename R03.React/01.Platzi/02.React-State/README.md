# 🚀 Todo App - React State Management

Este proyecto es una aplicación de gestión de tareas (TODOs) diseñada para demostrar patrones avanzados de **React**, **Clean Architecture** y **Gestión de Estado** eficiente.

---

## 🏗️ Análisis Arquitectónico

La aplicación sigue una arquitectura basada en **capas** y **composición**, asegurando una separación estricta de responsabilidades (Separation of Concerns).

### 1. Capa de Lógica de Negocio (Custom Hooks)
Toda la lógica de estado y persistencia está encapsulada en hooks personalizados en `src/hook/`.
- **`useLocalStorage`**: Abstrae la persistencia mediante un patrón **Reducer**, manejando estados de carga (`isLoading`), error (`hasError`) y sincronización.
- **`useTodos`**: Centraliza la lógica de negocio (CRUD y filtrado), actuando como la "fuente de la verdad" para el dominio de tareas.
- **`useModal` & `useSearch`**: Hooks especializados en estados específicos de la UI.

### 2. Capa de Orquestación (Container Pattern)
- **`App.jsx`**: Actúa como el orquestador principal. No renderiza UI directamente; invoca los hooks y distribuye el estado hacia la capa de presentación.

### 3. Capa de Presentación (Presenter Pattern)
- **`AppUI.jsx`**: Componente de presentación puro que recibe datos vía props y compone la interfaz mediante **Composición de Componentes**.

---

## 🛠️ Patrones de Diseño Implementados

| Patrón | Descripción | Ubicación |
| :--- | :--- | :--- |
| **Custom Hooks** | Encapsula lógica con estado reutilizable. | `src/hook/` |
| **Reducer Pattern** | Transiciones de estado predecibles y complejas. | `useLocalStorage.js` |
| **Component Composition** | Construcción de UI flexible mediante `props.children`. | `TodoHeader`, `TodoList` |
| **React Portal** | Renderizado de elementos fuera del nodo principal (DOM injection). | `Modal` |
| **State Lifting** | Elevación del estado al ancestro común más cercano. | `App.jsx` |
| **Prop Injection (Clone)** | Paso implícito de props a hijos mediante `React.cloneElement`. | `TodoHeader` |

---

## 📋 Convenciones de Desarrollo

### Naming & Style
- **PascalCase**: Para componentes y tipos de React.
- **camelCase**: Para variables, constantes y funciones locales.
- **Booleanos**: Siempre con prefijos descriptivos (`isLoading`, `hasError`, `isOpenModal`, `isCompleted`).

### Clean Code
- **Guard Clauses**: Uso de retornos tempranos para simplificar la lógica de renderizado.
- **Controlled Components**: Todos los inputs (búsqueda y formulario) están sincronizados con el estado de React.
- **Single Responsibility (SRP)**: Cada componente y hook cumple una única función atómica.

---

## 🚀 Comandos del Proyecto

Este proyecto utiliza `pnpm` para la gestión de dependencias.

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Ejecutar Linter (ESLint)
pnpm run lint

# Construir para producción
pnpm build
```

---

## 📈 Futuras Mejoras (Roadmap)
- [ ] **Context API**: Migrar de *Prop Drilling* a un sistema de Proveedores para evitar el paso excesivo de props.
- [ ] **Performance**: Implementar `React.memo` y `useCallback` para optimizar re-renders innecesarios.
- [ ] **Unique IDs**: Cambiar el uso de `text` como `key` por identificadores únicos (UUID).

---
*Documentación generada para análisis técnico y académico.*
