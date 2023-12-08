import CompleteIcon from "./CompleteIcon";
import DeleteIcon from "./DeleteIcon";

const TodoItem = ({ completed, onComplete, text, onDelete }) => {
  const pStyle = `TodoItem-p  ${completed && "TodoItem-p--complete"} `;
  return (
    <li className="TodoItem">
      <CompleteIcon completed={completed} onComplete={onComplete} />
      <p className={pStyle}>{text}</p>
      <DeleteIcon onDelete={onDelete} />
    </li>
  );
};

export default TodoItem;
