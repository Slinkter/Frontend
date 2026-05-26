/**
 * @file main.jsx
 * @description Punto de entrada para la aplicación de tareas (TODO) en React.
 * @module main
 */

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoProvider } from "./context/customContext.jsx";
import { AppUI } from "./App.jsx";
import "./index.css";

/**
 * Inicializa y renderiza la raíz de la aplicación React.
 * @remarks 
 * - Envuelve la aplicación en StrictMode para comprobaciones durante el desarrollo.
 * - Proporciona contexto global a través de TodoProvider.
 * - Renderiza en el elemento del DOM con id 'root'.
 */
const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <TodoProvider>
                <AppUI />
            </TodoProvider>
        </StrictMode>
    );
} else {
    console.error("Error Crítico: No se encontró el elemento raíz '#root' en el documento.");
}
