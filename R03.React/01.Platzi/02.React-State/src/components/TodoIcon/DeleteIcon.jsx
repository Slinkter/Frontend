import React from "react";
import { TodoIcon } from ".";

/**
 * A specialized icon component for deleting items.
 * It renders a `TodoIcon` with the 'delete' type and passes through the `onDelete` callback.
 *
 * @param {object} props The component's properties.
 * @param {function(): void} props.onDelete A callback function to be called when the delete icon is clicked.
 * @returns {React.ReactElement} The rendered delete icon.
 */
function DeleteIcon({ onDelete }) {
    return <TodoIcon type="delete" onClick={onDelete} />;
}

export { DeleteIcon };
