import React from "react";
import { CompleteIcon } from "../TodoIcon/CompleteIcon";
import { DeleteIcon } from "../TodoIcon/DeleteIcon";
import { EditIcon } from "../TodoIcon/EditIcon";
import "../../styles/TodoItem.css";

/**
 * Representación individual de una tarea (TODO).
 * Incluye controles para completar, editar y borrar la tarea específica.
 * 
 * @param {Object} props - Datos y manejadores de eventos de la tarea.
 * @returns {JSX.Element} Elemento de lista (li).
 */
function TodoItem(props) {
  return (
    <li className="TodoItem">
      <CompleteIcon completed={props.completed} onComplete={props.onComplete} />
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      <EditIcon onEdit={props.onEdit} />
      <DeleteIcon onDelete={props.onDelete} />
    </li>
  );
}

export { TodoItem };
