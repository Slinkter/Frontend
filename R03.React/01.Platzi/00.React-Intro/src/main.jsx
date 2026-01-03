/**
 * @file This is the main entry point for the React application.
 * It initializes the React root, wraps the main `AppUI` component
 * with the necessary context providers (`TodoProvider`) and development tools (`StrictMode`),
 * and then renders the entire application into the DOM element with the id 'root'.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoProvider } from "./context/customContext.jsx";
import { AppUI } from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <TodoProvider>
            <AppUI />
        </TodoProvider>
    </StrictMode>
);
