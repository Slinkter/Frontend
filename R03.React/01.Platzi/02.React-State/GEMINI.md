# 💎 GEMINI.md - Todo App React State Management

This project serves as a reference for advanced React state management, clean architecture, and modular component design. It implements a Todo application with persistent storage and multi-tab synchronization.

## 🏗️ Architectural Blueprint

The application follows a **Strict Layered Architecture** to achieve high cohesion and low coupling.

### 1. Business Logic Layer (`src/hook/`)
- **`useLocalStorage`**: Custom hook managing persistent state. It implements a **Reducer Pattern** with the logic defined *outside* the hook for pure state transitions and better testability.
- **`useTodos`**: Domain-specific hook that orchestrates the Todo list logic (CRUD, filtering, and derived state).
- **`useModal` & `useSearch`**: Specialized hooks for UI-specific state management.

### 2. Orchestration Layer (`src/App.jsx`)
- Implements the **Container/Presenter Pattern**. `App.jsx` handles data fetching and logic orchestration via custom hooks, while `AppUI.jsx` focuses exclusively on presentation.

### 3. Presentation Layer (`src/components/`)
- **Atomic Components**: Small, reusable units (e.g., `TodoItem`, `TodoSearch`).
- **Composition Components**: Higher-level components that use `props.children` and **Prop Injection** (via `React.cloneElement` in `TodoHeader`) to provide flexibility.

---

## 🛠️ Key Technical Patterns

- **Reducer Pattern**: Used in `useLocalStorage` for complex state transitions, making them predictable and debuggable.
- **React Portals**: Utilized in the `Modal` component to render content outside the main DOM tree, solving z-index and overflow issues.
- **Observer Pattern**: The `ChangeAlert` component listens to cross-tab storage events to notify the user of external updates.
- **Guard Clauses**: Extensive use of early returns in rendering (e.g., `AppUI.jsx`, `ChangeAlert/index.jsx`) for cleaner code.

---

## 📋 Engineering Standards

### Naming Conventions
- **PascalCase**: Components and custom types.
- **camelCase**: Functions, variables, and constants.
- **Boolean Prefixes**: Mandatory use of `isLoading`, `hasError`, `isOpenModal`, `isCompleted`, etc., to signify boolean intent.

### Documentation & Clean Code
- **High-Signal Comments**: Critical local functions and rendering blocks are documented with precise, one-line explanations of *what* or *why*.
- **Controlled Inputs**: All form elements are synchronized with React state.
- **Validation**: Forms include basic validation (e.g., preventing empty Todo creation) to maintain data integrity.

---

## 🚀 Operations

Commands are executed via `pnpm`.

- **Development**: `pnpm dev`
- **Quality Assurance**: `pnpm run lint` (ESLint)
- **Production Build**: `pnpm build` (Vite)

---

## 📝 Ongoing Refinement (Technical Debt)
- **Context API**: High priority to eliminate prop-drilling from `App` to `AppUI`.
- **Memoization**: Potential to implement `React.memo` and `useCallback` if the Todo list grows significantly.
- **Unique IDs**: Transitioning from `todo.text` keys to UUIDs for robust list rendering.
