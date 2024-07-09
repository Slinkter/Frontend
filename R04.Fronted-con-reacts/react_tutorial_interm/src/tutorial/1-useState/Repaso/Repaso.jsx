import React, { useState } from "react";
const initialValue = {
    name: "",
    age: "",
    dni: "",
};
const Repaso = () => {
    const [objectPerson, setObjectPerson] = useState(initialValue);

    function handleOnchangeInput(e) {
        const { name, value } = e.target;
        setObjectPerson({ ...objectPerson, [name]: value });
    }

    function printPerson(e) {
        e.preventDefault();
        console.log(objectPerson);
    }

    return (
        <>
            {/*  */}
            <section className="container">
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={objectPerson.name}
                    onChange={handleOnchangeInput}
                />
                <input
                    type="text"
                    placeholder="age"
                    name="age"
                    value={objectPerson.age}
                    onChange={handleOnchangeInput}
                />
                <input
                    type="text"
                    placeholder="dni"
                    name="dni"
                    value={objectPerson.dni}
                    onChange={handleOnchangeInput}
                />
                <button className="btn" onClick={(e) => printPerson(e)}>
                    click
                </button>
            </section>

            {}

            <pre className="container">
                {JSON.stringify(objectPerson, null, 2)}
            </pre>
        </>
    );
};

export default Repaso;
