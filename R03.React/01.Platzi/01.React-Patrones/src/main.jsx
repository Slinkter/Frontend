/**
 * @file Entry point for the React application.
 * @description This file is responsible for rendering the main App component into the DOM.
 * It sets up the root of the application and wraps the App with the `TodoProvider`
 * to make the global state available to all components. It also uses `StrictMode`
 * to highlight potential problems in the application during development.
 * @see {@link https://react.dev/reference/react/StrictMode}
 * @see {@link https://react.dev/reference/react/createRoot}
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoProvider } from "./components/TodoContext/index.jsx";
import App from "./App.jsx";
import "./index.css";

// Get the root DOM element where the React app will be mounted.
const rootElement = document.getElementById("root");

// Create a root for the React application. This is the new API for concurrent mode.
const root = createRoot(rootElement);

// Render the application into the root.
root.render(
    // StrictMode is a development tool that helps identify potential problems in an application.
    // It activates additional checks and warnings for its descendants.
    <StrictMode>
        {/*
         * TodoProvider is a component that uses the React Context API to provide the
         * global state of the TODOs application to all components within the App.
         * This avoids "prop drilling" and makes the state accessible from anywhere in the app.
         */}
        <TodoProvider>
            <App />
        </TodoProvider>
    </StrictMode>
);
