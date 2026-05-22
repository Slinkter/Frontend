import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * [Ejecución: 1] Punto de entrada de la aplicación.
 * El navegador carga este script y React comienza el proceso de renderizado 
 * en el nodo con ID 'root'.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
