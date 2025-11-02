import React from "react";
import { TodoContext } from "../TodoContext/index.jsx";

/**
 * @file TodoHeader.jsx
 * @description The header component for the Todo application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the header.
 * @returns {JSX.Element} - The TodoHeader component.
 */

function TodoHeader({ children }) {
  const { loading } = React.useContext(TodoContext);

  return (
    <header>
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading })
      )}
    </header>
  );
}

export { TodoHeader };


