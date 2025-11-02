import React from "react";
import { TodoProvider } from "./Context/TodoContext.jsx";
import TodoCounter from "./components/TodoCounter";
import TodoSearch from "./components/TodoSearch";
import TodoList from "./components/TodoList.jsx";
import TodoForm from "./components/TodoForm.jsx";
import TodoModal from "./components/TodoModal.jsx";
import TodoButton from "./components/TodoButton.jsx";

const App = () => {
    return (
        <TodoProvider>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <div
                    style={{
                        margin: "2px",
                    }}
                >
                    <TodoForm />
                </div>

                <TodoCounter />
                <TodoSearch />
                <TodoList />
            </div>
        </TodoProvider>
    );
};

export default App;
