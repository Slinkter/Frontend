import React from "react";
import { TodoIcon } from ".";

/**
 * A specialized icon component for marking items as complete.
 * It renders a `TodoIcon` with the 'check' type, dynamically changes its color based on `completed` status,
 * and passes through the `onComplete` callback.
 *
 * @param {object} props The component's properties.
 * @param {boolean} props.completed The completion status of the item.
 * @param {function(): void} props.onComplete A callback function to be called when the complete icon is clicked.
 * @returns {React.ReactElement} The rendered complete icon.
 */
function CompleteIcon({ completed, onComplete }) {
    return (
        <TodoIcon
            type="check"
            color={completed ? "#4caf50" : "gray"}
            onClick={onComplete}
        />
    );
}

export { CompleteIcon };
