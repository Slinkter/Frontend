import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TodoForm.css";

/**
 * Formulario reutilizable para crear o editar TODOs.
 * Maneja el estado local del input y la navegación al cancelar o enviar.
 * Utiliza React.createElement explícitamente en lugar de JSX.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.defaultTodoText] - Texto inicial para modo edición.
 * @param {string} props.label - Título o etiqueta del formulario.
 * @param {string} props.submitText - Texto del botón de envío.
 * @param {Function} props.submitEvent - Función a ejecutar al enviar el formulario.
 * @returns {JSX.Element} Formulario controlado.
 */
function TodoForm(props) {
    const [newTodoValue, setNewTodoValue] = React.useState(
        props.defaultTodoText || ""
    );
    const navigate = useNavigate();

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        navigate("/");
        props.submitEvent(newTodoValue);
    };
    
    const onCancel = () => {
        navigate("/");
    };

    return React.createElement('form', { onSubmit }, [
        React.createElement('div', { key: 'label' }, props.label),
        React.createElement('textarea', {
            key: 'textarea',
            value: newTodoValue,
            onChange,
            placeholder: "Cortar la cebolla para el almuerzo"
        }),
        React.createElement('div', {
            key: 'buttons',
            className: "TodoForm-buttonContainer"
        }, [
            React.createElement('button', {
                key: 'cancel',
                type: "button",
                className: "TodoForm-button TodoForm-button--cancel",
                onClick: onCancel
            }, "Cancelar"),
            React.createElement('button', {
                key: 'submit',
                type: "submit",
                className: "TodoForm-button TodoForm-button--add"
            }, props.submitText)
        ])
    ]);
}

export { TodoForm };