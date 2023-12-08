import TodoIcon from "./TodoIcon";

const CompleteIcon = ({ completed, onComplete }) => {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#4caf50" : "gray"}
      onClick={onComplete}
    />
  );
};

export default CompleteIcon;
