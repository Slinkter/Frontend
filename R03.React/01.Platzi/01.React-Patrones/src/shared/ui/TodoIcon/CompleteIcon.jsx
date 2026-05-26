/**
 * @file A specialized icon component for the complete action.
 * @description This component is a specific implementation of the generic `TodoIcon`.
 * It is pre-configured with `type="check"` and contains logic to dynamically change its color
 * based on the `completed` prop. This encapsulates the presentation logic for the completion
 * state, simplifying the `TodoItem` component that uses it.
 */

import React from "react";
import { TodoIcon } from ".";

/**
 * An icon for marking a TODO item as complete.
 * It wraps the generic `TodoIcon`, setting its `type` to "check" and dynamically
 * adjusting its color based on the completion status.
 *
 * @param {object} props The properties for the component.
 * @param {boolean} props.completed The completion status of the TODO item.
 * @param {function} props.onComplete The callback function to be executed when the icon is clicked. This is passed to the underlying `TodoIcon`'s `onClick` prop.
 * @returns {JSX.Element} A pre-configured `TodoIcon` for the complete action.
 */
function CompleteIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="check"
      // The color is dynamically set to green if completed, otherwise gray.
      color={completed ? "#4caf50" : "gray"}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };