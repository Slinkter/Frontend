import { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { type Task } from "./types";

function loadTasks(): Task[] {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateStorage(tasks: Task[]): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function Component() {
    const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

    const addTask = (task: Task): void => {
        setTasks([...tasks, task]);
    };

    const toggleTask = ({ id }: { id: string }) => {
        setTasks(
            tasks.map((t) => {
                if (t.id === id) {
                    return { ...t, isCompleted: !t.isCompleted };
                }
                return t;
            })
        );
    };

    useEffect(() => {
        updateStorage(tasks);
    }, [tasks]);

    return (
        <div>
            <Form addTask={addTask} />
            <List tasks={tasks} toggleTask={toggleTask} />
        </div>
    );
}
export default Component;
