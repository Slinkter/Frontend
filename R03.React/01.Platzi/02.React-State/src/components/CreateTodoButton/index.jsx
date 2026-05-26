import React from "react";
import "./CreateTodoButton.css";

/**
 * A functional component that renders a button to create new TODOs.
 */
function CreateTodoButton({ setIsOpenModal }) {
    /**
     * Event Handler: Alterna la visibilidad del modal de creación
     */
    const handleToggleModal = () => {
        setIsOpenModal((prevState) => !prevState);
    };

    return (
        <button className="CreateTodoButton" onClick={handleToggleModal}>
            +
        </button>
    );
}

export { CreateTodoButton };
