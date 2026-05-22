/**
 * @file A header component that acts as a container for its children.
 * @description `TodoHeader` is a structural component designed to wrap other components
 * that will be displayed in the header section of the application (e.g., `TodoCounter`, `TodoSearch`).
 * It uses an advanced React pattern, `React.cloneElement`, to dynamically pass additional props
 * to its children. In this case, it is intended to pass down a `loading` state, although the
 * implementation shown has a slight issue (see comment below).
 */

import React from "react";

/**
 * A header component that clones its children to pass down props.
 * This pattern allows the parent to inject props into its children without the children
 * needing to be aware of the parent's state, promoting decoupling.
 *
 * @param {object} props The properties for the component.
 * @param {React.ReactNode} props.children The child components to be rendered (e.g., TodoCounter, TodoSearch).
 * @param {boolean} props.loading The loading state to be passed down to the children.
 * @returns {JSX.Element} A `<header>` element containing the cloned children.
 */
function TodoHeader({ children, loading }) {
    return (
        <header>
            {
                /*
                 * `React.Children.toArray` converts the opaque `children` prop into a flat array.
                 * `React.cloneElement` creates a new React element using an existing one as a starting point.
                 * This is used here to pass the `loading` prop from `TodoHeader` down to each of its children.
                 * This pattern is powerful for creating highly reusable and decoupled layout components.
                 */
                React.Children.toArray(children).map((child) =>
                    React.cloneElement(child, { loading })
                )
            }
        </header>
    );
}

export { TodoHeader };