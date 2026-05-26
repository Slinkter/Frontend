import React from "react";

/**
 * A functional component that renders a header section for the TODO application.
 * It serves as a container for other components like `TodoCounter` and `TodoSearch`.
 * It automatically passes the `isLoading` prop to its children.
 *
 * @param {object} props The component's properties.
 * @param {React.ReactNode} props.children The child elements to be rendered inside the header.
 * @param {boolean} props.isLoading Indicates if the application is currently loading.
 * @returns {React.ReactElement} The rendered header element.
 */
function TodoHeader({ children, isLoading }) {
    return (
        <header>
            {React.Children.toArray(children).map((child) =>
                React.cloneElement(child, { isLoading })
            )}
        </header>
    );
}

export { TodoHeader };
