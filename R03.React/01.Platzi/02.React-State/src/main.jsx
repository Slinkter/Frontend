import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * Main entry point of the React application.
 * Renders the `App` component into the DOM element with the ID 'root'.
 * Uses `React.StrictMode` for highlighting potential problems in an application.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
