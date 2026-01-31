import { useState } from "react";

type Person = {
  name: string;
  email: string;
};

function Component() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);

    const person: Person = {
      name: data.text as string,
      email: data.email as string,
    };

    console.log(person);
  };

  return (
    <div>
      <h2>React & Typescript</h2>
      <h2>Events</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="text"
          type="text"
          className="form-input mb-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          name="email"
          type="email"
          className="form-input mb-1"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </div>
  );
}
export default Component;
