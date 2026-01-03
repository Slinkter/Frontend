import React from "react";

/**
 * A functional component that displays a message when there are no TODOs to show.
 * It prompts the user to create their first TODO.
 *
 * @returns {React.ReactElement} The empty TODOs message UI.
 */
function EmptyTodos() {
    return <p>¡Crea tu primer TODO!</p>;
}

export { EmptyTodos };
