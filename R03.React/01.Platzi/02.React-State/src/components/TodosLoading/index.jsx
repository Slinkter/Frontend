import React from "react";
import "./TodosLoading.css";

/**
 * Renders a loading animation or message while TODOs are being fetched or processed.
 * This component provides visual feedback to the user during asynchronous operations.
 *
 * @returns {React.ReactElement} The loading indicator UI.
 */
function TodosLoading() {
    return (
        <div className="LoadingTodo-container">
            <span className="LoadingTodo-completeIcon"></span>
            <p className="LoadingTodo-text">Cargando TODOs...</p>
            <span className="LoadingTodo-deleteIcon"></span>
        </div>
    );
}

export { TodosLoading };
