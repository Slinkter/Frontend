/**
 * @file CreateTodoButton.jsx
 * @description Componente de botón para alternar el modal de creación de tareas.
 * @module components
 */

import React from "react";
import "../style/CreateTodoButton.css";

/**
 * Componente que representa el botón '+' para abrir el modal de creación de TODOs.
 * @param {object} props - Propiedades del componente.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsModalOpen - Actualizador de estado para alternar la visibilidad del modal.
 * @returns {JSX.Element} El botón renderizado.
 */
const CreateTodoButton = ({ setIsModalOpen }) => {
    /**
     * Manejador de eventos para alternar el estado de visibilidad actual del modal.
     */
    const handleToggleModal = () => {
        setIsModalOpen((previousState) => !previousState);
    };

    return (
        <button 
            className="CreateTodoButton" 
            onClick={handleToggleModal}
            aria-label="Añadir nuevo TODO"
        >
            +
        </button>
    );
};

export { CreateTodoButton };
