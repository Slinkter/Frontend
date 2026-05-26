/**
 * @file A specialized icon component for the delete action.
 * @description This component is a specific implementation of the generic `TodoIcon`.
 * It is pre-configured with `type="delete"`, abstracting away this detail
 * from the components that will use it (like `TodoItem`). This promotes reusability
 * and simplifies the API of the consuming components.
 */

import React from "react";
import { TodoIcon } from ".";

/**
 * An icon component specifically for deleting a TODO item.
 * It wraps the generic `TodoIcon` and sets its `type` to "delete".
 *
 * @param {object} props The properties for the component.
 * @param {function} props.onDelete The callback function to be executed when the icon is clicked. This is passed directly to the underlying `TodoIcon`'s `onClick` prop.
 * @returns {JSX.Element} A pre-configured `TodoIcon` for the delete action.
 */
function DeleteIcon({ onDelete }) {
  return (
    <TodoIcon
      type="delete"
      onClick={onDelete}
    />
  );
}

export { DeleteIcon };