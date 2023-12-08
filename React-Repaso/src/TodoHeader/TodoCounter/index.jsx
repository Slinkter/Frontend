import "./index.css";

const TodoCounter = (props) => {
  const { totalTodos, completedTodos, loading } = props;
  const style = `TodoCounter ${!!loading && "TodoCounter--loading "}`;
  return (
    <h2 className={style}>
      has completado {completedTodos} de {totalTodos} TODOs
    </h2>
  );
};

export default TodoCounter;
