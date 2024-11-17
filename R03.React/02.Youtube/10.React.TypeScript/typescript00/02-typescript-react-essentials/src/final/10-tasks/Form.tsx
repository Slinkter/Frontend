import { useState } from "react";
import { type Task } from "./types";

type FormProps = {
    addTask: (task: Task) => void;
};

function Form({ addTask }: FormProps) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            alert("please enter a task");
            return;
        }
        const newTask = {
            id: new Date().getTime().toString(),
            description: text,
            isCompleted: false,
        };
        addTask(newTask);
        setText("");
    };

    return (
        <form className="form task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn">
                add task
            </button>
        </form>
    );
}
export default Form;
