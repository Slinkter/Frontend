import React, { useState } from "react";

const initialPerson = {
    name: "peter",
    age: 24,
    message: "random message",
    hobby: "read books",
};
// operador de propagacion
// copia las propiedades existente del objecto
// solo modifica la propiedad name

const UseStateObject = () => {
    const [person, setPerson] = useState(initialPerson);

    const changeName = () => {
        setPerson({ ...person, name: "Juan" });
    };
    const changeAge = () => {
        setPerson({ ...person, age: 25 });
    };
    const changeMessage = () => {
        setPerson({ ...person, message: "hello world" });
    };

    const resetPerson = () => {
        setPerson(initialPerson);
    };

    return (
        <>
            <h3>{person.name}</h3>
            <h3>{person.age}</h3>
            <h3>{person.message}</h3>
            <h3>{person.hobby}</h3>
            <>
                <button className="btn" onClick={changeName}>
                    change Name
                </button>
                <button className="btn" onClick={changeAge}>
                    change age
                </button>
                <button className="btn" onClick={changeMessage}>
                    change message
                </button>
                <button className="btn" onClick={resetPerson}>
                    reset
                </button>
            </>
        </>
    );
};

export default UseStateObject;
