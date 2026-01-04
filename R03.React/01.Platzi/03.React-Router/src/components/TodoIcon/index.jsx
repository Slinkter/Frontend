import React from "react";
import checkIcon from "../../assets/check.svg";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import "../../styles/TodoIcon.css";

const iconTypes = {
  check: (color) => (
    <img 
      src={checkIcon} 
      className="Icon-svg Icon-svg--check" 
      style={{ filter: color === 'gray' ? 'grayscale(100%)' : 'none' }}
      alt="check"
    />
  ),
  edit: (color) => (
    <img 
      src={editIcon} 
      className="Icon-svg Icon-svg--edit"
      style={{ filter: color === 'gray' ? 'grayscale(100%)' : 'none' }}
      alt="edit"
    />
  ),

  delete: (color) => (
    <img 
      src={deleteIcon} 
      className="Icon-svg Icon-svg--delete"
      style={{ filter: color === 'gray' ? 'grayscale(100%)' : 'none' }}
      alt="delete"
    />
  ),
};

/**
 * Componente base para iconos SVG.
 * Centraliza la lógica de renderizado de imágenes SVG para Check, Edit y Delete.
 * Aplica filtros CSS dinámicos basados en el color.
 * 
 * @param {Object} props - Propiedades del icono.
 * @param {string} props.type - Tipo de icono ('check', 'edit', 'delete').
 * @param {string} props.color - Color del icono (afecta al filtro CSS).
 * @param {Function} props.onClick - Manejador del evento click.
 * @returns {JSX.Element} Icono SVG interactivo.
 */
function TodoIcon({ type, color = "gray", onClick }) {
  return (
    <span
      className={`Icon-container Icon-container--${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  );
}

export { TodoIcon };
