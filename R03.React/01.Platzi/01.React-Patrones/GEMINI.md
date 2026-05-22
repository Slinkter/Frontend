# 💡 Proyecto React: Patrones y Arquitectura (TODO Machine)

## 🎯 Resumen del Proyecto
Este proyecto es una aplicación de gestión de tareas (TODO Machine) diseñada como un caso de estudio para **Patrones de Diseño y Arquitectura de Software en React**. Implementa una separación estricta de responsabilidades (Separation of Concerns) y principios de **Clean Architecture** adaptados al ecosistema moderno de React.

**Tecnologías Principales:**
- **Core:** React 19 (Functional Components & Hooks).
- **Build Tool:** Vite.
- **Persistencia:** LocalStorage con sincronización entre pestañas.
- **Estilos:** CSS Modules / Archivos CSS por componente.
- **Calidad de Código:** ESLint (Flat Config) y JSDoc para documentación exhaustiva.

---

## 🏗️ Arquitectura y Patrones de Diseño

El proyecto sigue un flujo de dependencias hacia adentro, donde la UI consume la lógica de negocio sin que esta última dependa de la primera.

### 1. Custom Hook Pattern (`src/hook/`)
La lógica de negocio y el estado están encapsulados en hooks personalizados:
- **`useTodos.js`**: El "cerebro" de la aplicación. Maneja el estado de las tareas, búsqueda, filtrado y visibilidad del modal.
- **`useLocalStorage.js`**: Abstrae la persistencia de datos, manejando estados de carga (`loading`) y error.
- **`useStorageListener.js`**: Escucha eventos del navegador para sincronizar cambios entre múltiples pestañas.

### 2. Provider Pattern / Dependency Injection (`src/components/TodoContext/`)
Utiliza **React Context** para evitar el "prop drilling". 
- `TodoProvider` inyecta la lógica de `useTodos` en todo el árbol de componentes, actuando como un contenedor de dependencias.

### 3. Container/Presenter Pattern
- **Containers**: `App.jsx` y `TodoProvider` gestionan el "cómo funciona".
- **Presenters**: `AppUI.jsx` y componentes en `src/components/` se encargan del "cómo se ve", recibiendo datos vía props o contexto.

---

## 🚀 Comandos del Proyecto

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo (Vite). |
| `pnpm build` | Compila la aplicación para producción. |
| `pnpm lint` | Ejecuta el linter (ESLint) para verificar la calidad del código. |
| `pnpm preview` | Previsualiza localmente la compilación de producción. |

---

## 🛠️ Convenciones de Desarrollo

1.  **Separación de Archivos**: Cada componente reside en su propia carpeta dentro de `src/components/`, incluyendo su lógica (`index.jsx`) y sus estilos (`Componente.css`).
2.  **Documentación**: Se utiliza **JSDoc** en todos los hooks y componentes principales para describir parámetros, retornos y responsabilidades.
3.  **Estado Derivado**: Se prioriza el cálculo de valores (como `completedTodos` o `searchedTodos`) durante el renderizado en lugar de sincronizarlos manualmente con `useEffect`.
4.  **Estilo de Código**: Seguimiento estricto de las reglas de ESLint configuradas en `eslint.config.js`.

---

## 📂 Estructura de Directorios Clave

- `src/components/`: Componentes UI atómicos y modulares.
- `src/hook/`: Capa de lógica de negocio y hooks de infraestructura.
- `src/AppUI.jsx`: Orquestador principal de la interfaz.
- `src/main.jsx`: Punto de entrada que renderiza la aplicación.
