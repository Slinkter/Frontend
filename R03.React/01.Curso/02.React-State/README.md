# React TODOs

This is a simple TODOs application built with React.

## Installation and Setup

To run this application, you need to have Node.js and npm installed on your machine. Then, you can follow these steps:

1.  Clone the repository:

```bash
git clone https://github.com/your-username/react-todos.git
```

2.  Install the dependencies:

```bash
npm install
```

3.  Start the development server:

```bash
npm run dev
```

## Project Structure

The project is structured as follows:

*   **`src/components`**: Contains all the reusable React components.
*   **`src/hook`**: Contains all the custom hooks for managing the application's state.
*   **`src/context`**: Contains the React context providers.
*   **`src/App.jsx`**: The main container component that orchestrates the application.
*   **`src/AppUI.jsx`**: The main presentational component.
*   **`src/index.js`**: The entry point of the application.

## Applied Architecture

This project follows Clean Architecture principles to ensure a separation of concerns, scalability, and maintainability. The main architectural patterns and principles used are:

### SOLID Principles

*   **Single Responsibility Principle (SRP):** Each component and hook has a single, well-defined responsibility.
    *   **Custom Hooks:** State management is decoupled from the UI through the use of custom hooks (`useTodos`, `useModal`, `useSearch`). Each hook manages a specific piece of the application's state.
    *   **Components:** Components are responsible only for rendering the UI and delegating user interactions to the appropriate hooks.

*   **Open/Closed Principle (OCP):** The application is open for extension but closed for modification. The use of custom hooks and components allows for adding new features without modifying existing code.

### DRY (Don't Repeat Yourself) Principle

*   **Reusable Components:** The UI is built from small, reusable components (`Button`, `Modal`, `Input`, etc.) that are composed to create more complex UIs.
*   **Custom Hooks:** By extracting the state logic into custom hooks, we avoid duplicating the same logic in multiple components.

### State Management

*   **`useReducer`:** For complex state logic, we use the `useReducer` hook. This is particularly evident in our custom hooks, where it helps to manage state transitions in a predictable and organized manner.
*   **Custom Hooks for State:**
    *   `useTodos`: Manages the state of the TODOs list (loading, error, data).
    *   `useModal`: Manages the state of the modal (open/closed).
    *   `useSearch`: Manages the state of the search input.
    *   `useLocalStorage`: A generic hook to synchronize state with the browser's local storage.

### Component Architecture

*   **Container/Presentational Pattern:**
    *   `App.jsx` (Container): Acts as a container component that is responsible for fetching data and managing the application's state by orchestrating the different custom hooks.
    *   `AppUI.jsx` (Presentational): Is a presentational component that is only responsible for rendering the UI. It receives all the necessary data and functions as props from `App.jsx`.
*   **Component-Based Architecture:** The UI is broken down into a tree of small, independent, and reusable components.
*   **Barrel Exports:** We use `index.js` files (barrel files) to group and export related components from a single entry point, which simplifies the import statements in other parts of the application.
