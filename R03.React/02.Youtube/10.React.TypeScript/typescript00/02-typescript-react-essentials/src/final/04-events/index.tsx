import { useState } from "react";

type Person = { name: string };

function Component() {
    // hooks
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    // event 1
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    // event 2
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        const formData = new FormData(e.target as HTMLFormElement);
        // const data = Object.fromEntries(formData);
        const text = formData.get("text") as string;
        const person: Person = { name: text };
    };

    return (
        <section>
            <h2>events example</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    className="form-input mb-1"
                    type="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <input
                    className="form-input mb-1"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-block">
                    submit
                </button>
            </form>
        </section>
    );
}
export default Component;
