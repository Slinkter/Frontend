import React from "react";
import TodoIcon from "./TodoIcon";

const DeleteIcon = ({ onDelete }) => {
  return <TodoIcon type="delete" onClick={onDelete} />;
};

export default DeleteIcon;
