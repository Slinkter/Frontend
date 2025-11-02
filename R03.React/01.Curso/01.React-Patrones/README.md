# React Patterns Project

This project is a simple TODO application that demonstrates various React patterns and best practices.

## Description and Purpose

The main purpose of this project is to showcase how to apply Clean Architecture and Clean Code principles in a React application. It demonstrates how to refactor a project to improve its structure, reusability, and maintainability.

## Installation and Setup

To run this project, you need to have Node.js and pnpm installed.

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/react-patterns.git
    ```

2.  Install the dependencies:

    ```bash
    pnpm install
    ```

3.  Run the development server:

    ```bash
    pnpm dev
    ```

## Applied Architecture

This project follows the principles of Clean Architecture and Clean Code. The main patterns and techniques used are:

*   **Component Composition:** The application is built by combining small, reusable components to create more complex UIs.
*   **React Context:** The `TodoContext` is used to manage the application's global state and avoid prop drilling.
*   **Custom Hooks:** The `useTodos` hook encapsulates the logic for managing the TODOs, including fetching data from `localStorage`.
*   **Separation of Concerns:** The application is divided into components, hooks, and context, each with a specific responsibility.
*   **Conditional Rendering:** The `AppUI` component handles the conditional rendering of the different states of the application (loading, error, empty, etc.).