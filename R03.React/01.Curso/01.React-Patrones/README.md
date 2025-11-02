# Todo Machine - React Application

## 1. Project Description

This project is a "Todo Machine" application built with React. It allows users to manage their daily tasks, including adding, completing, deleting, and searching for TODOs. The application is designed following Clean Architecture principles, emphasizing separation of concerns, reusability, and maintainability. It features a responsive and user-friendly interface.

A key feature of this application is its ability to synchronize the TODO list across different browser tabs or windows in real-time, providing a seamless user experience.

## 2. Key Features

-   **Create, Read, Update, Delete (CRUD)** operations for TODOs.
-   **Mark TODOs as complete**.
-   **Filter TODOs** through a real-time search input.
-   **Modal** for adding new TODOs without leaving the main view.
-   **Loading and Error States** to provide feedback to the user.
-   **Real-time Synchronization** of TODOs across multiple browser tabs/windows.
-   **Custom Hooks** for state management and business logic.
-   **Component-Based Architecture** for a modular and scalable structure.

## 3. Architectural Decisions

The project's architecture is based on Clean Architecture principles, focusing on a clear separation of concerns to create a scalable and maintainable application.

-   **State Management with React Context:** The global state of the application (such as the list of TODOs, loading/error states, and search values) is managed through `TodoContext`. This avoids *prop drilling* and allows any component in the tree to access the required state in a clean and efficient way.

-   **Business Logic in Custom Hooks:** All business logic is encapsulated in custom hooks (`useTodos`, `useLocalStorage`, `useStorageListener`). This separates the application's logic from the UI components, making them more reusable and easier to test.

-   **Component-Based Structure:** The application is divided into small, reusable components, each with a single responsibility. This improves modularity and makes the code easier to understand and maintain. For example, components like `TodoItem`, `TodoSearch`, and `CreateTodoButton` handle specific parts of the UI.

-   **Separation of UI and Logic:** The main `App.jsx` component is responsible for rendering the UI (`AppUI.jsx`), while the logic is managed by the `TodoProvider` and its associated hooks. This separation allows for greater flexibility and makes it easier to modify the UI without affecting the business logic.

## 4. Custom Hooks

The application's logic is primarily managed by three custom hooks:

### `useTodos()`

This is the main hook for managing the TODOs' state. It centralizes all the logic related to creating, completing, deleting, and filtering TODOs. It also manages the state of the search input and the modal for adding new tasks.

### `useLocalStorage(dbName, initialValue)`

A generic hook for persisting and retrieving data from `localStorage`. It handles loading and error states and provides a function to save the data. This hook is used by `useTodos` to store the TODOs in the browser.

### `useStorageListener(sincronize)`

This hook listens for changes in `localStorage` from other browser tabs or windows. When a change is detected, it displays an alert to the user, allowing them to synchronize their TODO list with the latest version.

## 5. Components

The application is composed of several reusable components, each with a specific responsibility:

| Component              | Description                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **`AppUI`**            | Renders the main user interface of the application, structuring all other visual components.              |
| **`ChangeAlert`**      | An alert that is displayed when changes are detected in `localStorage` from another tab.                |
| **`CreateTodoButton`** | A floating button that opens the modal to add a new TODO.                                               |
| **`EmptyTodos`**       | A message that is displayed when there are no TODOs to show.                                            |
| **`Modal`**            | A portal that renders a modal window for adding new TODOs.                                              |
| **`TodoContext`**      | The provider and context for managing the global state of the application.                              |
| **`TodoCounter`**      | Displays the total number of TODOs and how many have been completed.                                    |
| **`TodoForm`**         | The form inside the modal for adding new TODOs.                                                         |
| **`TodoHeader`**       | A container for the header components (`TodoCounter` and `TodoSearch`).                                 |
| **`TodoIcon`**         | A generic component for rendering icons, used for the complete and delete actions.                      |
| **`TodoItem`**         | Renders a single TODO item, including its text and buttons for completing and deleting it.              |
| **`TodoList`**         | The container that lists all the `TodoItem` components.                                                 |
| **`TodoSearch`**       | An input field that allows the user to search and filter TODOs in real-time.                            |
| **`TodosError`**       | A message that is displayed when there is an error loading the TODOs.                                   |
| **`TodosLoading`**     | A loading animation that is shown while the TODOs are being loaded for the first time.                  |

## 6. Project Structure

The project follows a clear and organized structure within the `src` directory:

```
/src
|
├───assets/              # SVG and other static assets
|
├───components/          # Reusable React components
│   ├───ChangeAlert/
│   ├───CreateTodoButton/
│   ├───EmptyTodos/
│   ├───Modal/
│   ├───TodoContext/
│   ├───TodoCounter/
│   ├───TodoForm/
│   ├───TodoHeader/
│   ├───TodoIcon/
│   ├───TodoItem/
│   ├───TodoList/
│   ├───TodoSearch/
│   ├───TodosError/
│   └───TodosLoading/
|
├───hook/                # Custom hooks for business logic
│   ├───useLocalStorage.js
│   ├───useStorageListener.js
│   └───useTodos.js
|
├───App.css              # Main styles for the App component
├───App.jsx              # Main application component
├───AppUI.jsx            # UI structure of the application
├───index.css            # Global styles
└───main.jsx             # Entry point of the application
```

## 7. Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/todo-machine.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd todo-machine
    ```

3.  **Install the dependencies:**
    If you are using `npm`:
    ```bash
    npm install
    ```
    If you are using `pnpm`:
    ```bash
    pnpm install
    ```

4.  **Run the project:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    pnpm dev
    ```

5.  **Open your browser** and navigate to `http://localhost:5173` (or the address indicated in your terminal) to see the application in action.
