# Project Documentation

This document provides a detailed overview of the React Todo application, including its architecture, components, state management, and scope.

## 1. Project Overview

The React Todo application is a simple yet functional task management tool. It allows users to:

*   **Create new todos:** Add new tasks to their list.
*   **Mark todos as complete:** Toggle the completion status of each todo.
*   **Delete todos:** Remove tasks from their list.
*   **Search for todos:** Filter the list of todos based on a search query.

This project serves as a practical example of fundamental React concepts and best practices, including component-based architecture, state management with hooks, and the use of custom hooks for abstracting logic.

## 2. Core Concepts

This project is built upon the following core React concepts:

*   **Components:** The UI is divided into reusable, self-contained components. Each component is responsible for a specific part of the UI.
*   **Props:** Components communicate with each other by passing data through props (properties).
*   **State:** Components use state to manage their internal data. When the state of a component changes, React re-renders the component.
*   **Hooks:** Hooks are functions that let you "hook into" React state and lifecycle features from function components. This project uses `useState`, `useContext`, and `useEffect` extensively.

## 3. Component-Based Architecture

The application is structured as a tree of components. The main components are:

*   **`App.jsx`:** The root component that orchestrates the entire application. It brings together all the other components and provides the `TodoProvider` to its children.
*   **`TodoCounter.jsx`:** A presentational component that displays the number of completed and total todos.
*   **`TodoSearch.jsx`:** A controlled component that allows users to search for todos. It gets the search term and the function to update it from the `TodoContext`.
*   **`TodoList.jsx`:** A container component that renders the list of todos. It receives the list of todos as children.
*   **`TodoItem.jsx`:** A presentational component that displays a single todo item. It receives the todo text, completion status, and functions to update and delete the todo as props.
*   **`CreateTodoButton.jsx`:** A button component that opens the modal for creating a new todo.
*   **`TodoForm.jsx`:** A form component that allows users to create a new todo. It is displayed inside the `Modal`.
*   **`Modal.jsx`:** A portal component that renders its children in a modal overlay.

## 4. State Management

State management is handled using a combination of the `useState` and `useContext` hooks.

*   **`useState`:** Used for managing local component state, such as the search term in `TodoSearch.jsx` and the new todo value in `TodoForm.jsx`.
*   **`useContext`:** Used for managing global state that needs to be shared across multiple components. The `TodoContext` provides the following values to all components that consume it:
    *   `loading`: A boolean that indicates whether the todos are being loaded from `localStorage`.
    *   `error`: An error object if there was an error loading the todos.
    *   `totalTodos`: The total number of todos.
    *   `completedTodos`: The number of completed todos.
    *   `stateSearch`: The current search term.
    *   `setStateSearch`: A function to update the search term.
    *   `searchedTodos`: The list of todos filtered by the search term.
    *   `addTodo`: A function to add a new todo.
    *   `onUpdateItem`: A function to mark a todo as complete.
    *   `onDeleteItem`: A function to delete a todo.
    *   `openModel`: A boolean that indicates whether the modal is open.
    *   `setOpenModal`: A function to open or close the modal.

## 5. Custom Hooks

To promote reusability and separation of concerns, a custom hook `useLocalStorage` is used.

*   **`useLocalStorage.js`:** This hook is responsible for abstracting the logic of interacting with the browser's `localStorage`. It handles:
    *   **Reading data:** It retrieves the todos from `localStorage` when the application starts.
    *   **Writing data:** It saves the todos to `localStorage` whenever the list of todos changes.
    *   **Managing loading and error states:** It provides `loading` and `error` states to the rest of the application.

By using this custom hook, the `TodoProvider` component is simplified, as it doesn't need to know the details of how the data is stored and retrieved.

## 6. Styling

The application's styling is managed using a combination of global CSS variables and component-specific CSS files.

*   **`index.css`:** This file defines a set of global CSS variables for colors, spacing, and box shadows. This ensures a consistent design system across the entire application and makes it easy to update the theme.
*   **Component-specific CSS:** Each component has its own CSS file (e.g., `TodoItem.css`, `TodoSearch.css`). This encapsulates the styles for each component and prevents style conflicts.

## 7. Project Scope and Limitations

This project is a simple demonstration of React fundamentals and is not intended to be a full-featured production application. Its scope is limited to the following:

*   **Client-side only:** The application runs entirely in the browser and does not have a backend server. All data is stored in the browser's `localStorage`.
*   **Single user:** There is no concept of user accounts or authentication. All todos are stored in the same `localStorage` key.
*   **No routing:** The application is a single-page application with no routing.
*   **Basic styling:** The styling is simple and functional, but it is not a comprehensive design system.

### Future Improvements

Possible future improvements for this project include:

*   **Adding a backend:** Connect the application to a backend server to store todos in a database.
*   **User authentication:** Implement user accounts and authentication to allow multiple users to have their own todo lists.
*   **Routing:** Add routing to allow for multiple pages (e.g., a separate page for completed todos).
*   **More advanced features:** Add features such as due dates, priorities, and sub-tasks.
