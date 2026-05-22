import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoProvider } from "./entities/todo";
import App from "./app/App";
import "./app/index.css";

/**
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación.
 * Renderiza el árbol de componentes dentro del elemento 'root' del DOM.
 */

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <TodoProvider>
            <App />
        </TodoProvider>
    </StrictMode>,
);
