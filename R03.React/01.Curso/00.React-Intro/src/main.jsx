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
