/**
 * @file A presentational component that displays a loading indicator.
 * @description This component provides visual feedback to the user, indicating that the
 * application is in the process of fetching data (in this case, the TODO items).
 * It's a simple, "dumb" component that doesn't contain any logic and is only concerned with rendering the UI for the loading state.
 * The CSS provides a shimmer or skeleton screen effect, which is a modern UX pattern for loading states.
 */

import React from "react";
import "./TodosLoading.css";

/**
 * A component that displays a placeholder/skeleton screen to indicate a loading state.
 *
 * @returns {JSX.Element} A `div` containing the loading animation elements.
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