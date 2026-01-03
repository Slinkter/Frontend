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

    <StrictMode>
        <TodoProvider>
            <App />
        </TodoProvider>
    </StrictMode>
);
