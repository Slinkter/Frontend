# React Todo Application

## Description and Purpose

This project is a simple Todo application built with React, demonstrating fundamental React concepts such as components, props, state management with hooks (`useState`, `useContext`, `useEffect`), and custom hooks (`useLocalStorage`). The application allows users to create, mark as completed, and delete todo items. It also features a search functionality to filter todos and a modal for creating new todos.

## Installation and Setup

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd 00.React-Intro
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it globally:
    ```bash
    npm install -g pnpm
    ```
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    This will start the Vite development server, and you can view the application in your browser, usually at `http://localhost:5173`.

4.  **Build for production:**
    To create a production-ready build of the application:
    ```bash
    pnpm run build
    ```
    The build artifacts will be located in the `dist/` directory.

## Applied Architecture

This application follows a component-based architecture, typical for React projects, with a focus on separation of concerns and reusability. Key architectural patterns and structures include:

*   **Component-Based Structure:** The UI is broken down into small, reusable components (e.g., `TodoItem`, `TodoList`, `TodoSearch`, `TodoForm`).
*   **Context API for State Management:** The `TodoContext` is used to manage the global state of the application (todos, search term, modal visibility). This avoids prop drilling and makes state accessible to all necessary components.
*   **Custom Hooks:** A `useLocalStorage` custom hook is implemented to abstract the logic for interacting with the browser's `localStorage`. This promotes reusability and keeps component logic clean.
*   **Separation of Concerns:** Logic related to data fetching and persistence is encapsulated within the `useLocalStorage` hook, while UI logic resides within components.
*   **CSS Modules/Variables:** Global CSS variables are defined in `index.css` to maintain a consistent design system across the application. Component-specific styles are kept in their respective CSS files.
*   **JSX for UI:** All components that render UI elements use `.jsx` file extensions to explicitly indicate the presence of JSX syntax.

### Project Structure

```
src/
├── App.jsx             # Main application component
├── main.jsx            # Entry point of the React application
├── index.css           # Global styles and CSS variables
├── assets/
├── components/         # Reusable UI components
│   ├── CreateTodoButton.jsx
│   ├── Modal.jsx
│   ├── TodoCounter.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── TodoSearch.jsx
├── context/
│   └── customContext.jsx # React Context for global state management
├── hook/
│   └── useLocalStorage.js # Custom hook for localStorage interaction
└── style/              # Component-specific styles
    ├── CreateTodoButton.css
    ├── modal.css
    ├── TodoCounter.css
    ├── TodoItem.css
    ├── TodoList.css
    └── TodoSearch.css
```