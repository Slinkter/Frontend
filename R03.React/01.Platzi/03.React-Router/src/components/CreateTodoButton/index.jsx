import React from "react";
import "../../styles/CreateTodoButton.css";

/**
 * Botón flotante para crear nuevos TODOs.
 * Navega a la ruta de creación cuando se hace clic.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onclick - Función manejadora del evento click.
 * @returns {JSX.Element} Botón de acción.
 */
function CreateTodoButton(props) {
    return React.createElement('button', {
        className: "CreateTodoButton",
        onClick: props.onclick
    }, '+');
}

export { CreateTodoButton };