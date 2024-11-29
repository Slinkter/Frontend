import React from "react";
import { TodoProvider } from "../components/TodoContext";
import { AppUI } from "./AppUI";
import "./App.css";

/* 
T0doProvider :It provides access to global application state related to todos to any descendant component.
AppUI: This component is responsible for rendering the user interface of the Todo List application.
*/

function App() {
    return (
        <TodoProvider>
            <AppUI />
        </TodoProvider>
    );
}

export default App;
