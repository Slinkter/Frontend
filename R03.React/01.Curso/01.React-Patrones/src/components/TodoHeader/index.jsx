import React from "react";

/**
 * @file TodoHeader.jsx
 * @description A header component for the Todo application.
 * It clones its children to pass down the `loading` state.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the header.
 * @returns {JSX.Element} - The TodoHeader component.
 */
/* 
Iterate over children, clone them, and pass the loading prop.
This is a flexible way to share state with child components without coupling them.
*/
function TodoHeader({ children }) {
    return (
        <header>
            {React.Children.toArray(children).map((child) =>
                React.cloneElement(child, { loading: child.props.loading })
            )}
        </header>
    );
}

export { TodoHeader };
