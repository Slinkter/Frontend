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

## Applied Architecture

This project follows the Clean Architecture principles to ensure a separation of concerns and a more maintainable codebase. The main architectural patterns used are:

*   **State Management:** The state of the application is managed using the `useReducer` hook within our custom hook `useTodos`. This helps to centralize the state logic and make it more predictable.

*   **Custom Hooks:** The business logic is encapsulated in custom hooks like `useTodos` and `useLocalStorage`. `useTodos` is responsible for managing the state of the TODOs, while `useLocalStorage` is responsible for persisting the data in the browser's local storage.

*   **Component-Based Architecture:** The UI is built using a component-based architecture. Each component is responsible for a specific part of the UI, making the code more modular and easier to understand.

*   **Barrel Exports:** The components are exported from a single `index.js` file in the `components` directory. This simplifies the import statements and makes the code more readable.
