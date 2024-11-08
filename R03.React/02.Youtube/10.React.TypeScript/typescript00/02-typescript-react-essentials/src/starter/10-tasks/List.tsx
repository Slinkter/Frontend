import React from "react";
import { Task } from "./types";

type ListProps = {
    tasks: Task[];
    toggleTask: ({ id }: { id: string }) => void;
};

const List = ({ tasks, toggleTask }: ListProps) => {
    return (
        <ul className="list">
            {tasks.map((t) => {
                return (
                    <li key={t.id}>
                        <p>{t.description}</p>
                        <input
                            type="checkbox"
                            checked={t.isCompleted}
                            onChange={() => {
                                toggleTask({ id: t.id });
                            }}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default List;
