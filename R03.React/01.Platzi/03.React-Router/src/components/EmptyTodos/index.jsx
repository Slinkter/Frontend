import React from "react";

/**
 * Componente de estado vacío.
 * Se muestra cuando no existen TODOs en la lista.
 * 
 * @returns {JSX.Element} Mensaje invitando a crear el primer TODO.
 */
function EmptyTodos() {
    return <p>¡Crea tu primer TODO!</p>;
}

export { EmptyTodos };
