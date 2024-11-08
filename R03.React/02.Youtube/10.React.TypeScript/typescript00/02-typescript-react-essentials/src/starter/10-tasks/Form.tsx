import React, { useState } from "react";
import { Task } from "./types";

type FormProps = {
    addTask: (task: Task) => void;
};

const Form = (props: FormProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            alert("please enter a task");
            return;
        }
        console.log("text:", text);
        props.addTask({
            id: new Date().getTime().toString(),
            description: text,
            isCompleted: false,
        });

        setText("");
    };

    return (
        <>
            <form className="form task-form" onSubmit={handleSubmit}>
                <input
                    placeholder="some..."
                    type="text"
                    className="form-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="btn">
                    add task
                </button>
            </form>
        </>
    );
};

export default Form;
