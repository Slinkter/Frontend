import React from "react";

const TodoHeader = (props) => {
  const { children, loading } = props;
  return (
    <header>
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading })
      )}
    </header>
  );
};

export default TodoHeader;
