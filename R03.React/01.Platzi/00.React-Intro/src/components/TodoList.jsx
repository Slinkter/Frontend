/**
 * @file TodoList.jsx
 * @description Componente contenedor para la lista de ítems TODO.
 * @module components
 */

import React from "react";
import "../style/TodoList.css";

/**
 * Componente que envuelve un grupo de ítems TODO en una estructura de lista.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Ítems de la lista o mensajes de estado.
 * @returns {JSX.Element} La lista renderizada.
 */
const TodoList = ({ children }) => {
    return (
        <section className="TodoList-container">
            <ul className="TodoList">
                {children}
            </ul>
        </section>
    );
};

export { TodoList };
