import React from "react";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

const TodoCounter = () => {
    const { countTotal, countTotalCompleted } = useContext(TodoContext);

    console.log(countTotal, " > ", countTotalCompleted);

    return (
        <div>
            <p>
                tu haz completado {countTotalCompleted} de {countTotal}
            </p>
        </div>
    );
};

export default TodoCounter;
