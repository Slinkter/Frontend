import { useState } from "react";

type Person = {
    name: string;
};

function Component() {
    const [text, setText] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    //
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //const formData = new FormData(e.target as HTMLFormElement)
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        console.log(data);
        const text = formData.get("text") as string;
        const person: Person = { name: data.text as string };
        console.log(text);
        console.log(person);
    };

    return (
        <div>
            <h2>React & Typescript</h2>
            <h2>Events</h2>
            <form onSubmit={handleSubmit} className="form" action="">
                <input
                    placeholder="text"
                    type="text"
                    className="form-input mb-1"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    name="text"
                />
                <input
                    placeholder="email"
                    type="email"
                    className="form-input mb-1"
                    value={email}
                    onChange={handleChange}
                    name="email"
                />
                <button type="submit" className="btn btn-block">
                    submit
                </button>
            </form>
        </div>
    );
}
export default Component;
