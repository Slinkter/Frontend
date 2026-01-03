import React from "react";

/**
 * A functional component that renders a header section for the TODO application.
 * It serves as a container for other components like `TodoCounter` and `TodoSearch`.
 *
 * @param {object} props The component's properties.
 * @param {React.ReactNode} props.children The child elements to be rendered inside the header.
 * @returns {React.ReactElement} The rendered header element.
 */
function TodoHeader({ children }) {
    return <header>{children}</header>;
}

export { TodoHeader };
