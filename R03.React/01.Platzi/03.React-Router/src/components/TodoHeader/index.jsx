import React from "react";

/**
 * Encabezado compuesto que clona a sus hijos para inyectarles props adicionales (como loading).
 * Utiliza React.Children y React.cloneElement, un patrón avanzado para composición implícita.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos (TodoCounter, TodoSearch).
 * @param {boolean} props.loading - Estado de carga global.
 * @returns {JSX.Element} Header contenedor.
 */
function TodoHeader({ children, loading }) {
    return (
        <header>
            {React.Children.toArray(children).map((child) =>
                React.cloneElement(child, { loading })
            )}
        </header>
    );
}

export { TodoHeader };
