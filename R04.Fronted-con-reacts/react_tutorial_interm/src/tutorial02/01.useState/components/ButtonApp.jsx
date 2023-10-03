import React, { useState } from "react";
//
const initialValue = {
    firstName: "",
    lastName: "",
    age: "",
};
//
const ButtonApp = () => {
    // useState
    // 1
    const [name, setName] = useState("Liam");
    const handleName = () => setName("Juan");
    // 2
    const [fullName, setFulllName] = useState("Liam Jhonny");
    const handleChangeName = () =>
        fullName === "alex" ? setFulllName("juan") : setFulllName("alex");
    // 3
    const [specialName, setSpecialName] = useState(true);
    const handleChangeSpecialName = () => setSpecialName((prev) => !prev);
    // 4
    const [objectName, setObjectName] = useState(initialValue);
    const onChangeObj = (e) => {
        const { name, value } = e.target;
        const newObject = { ...objectName, [name]: value };
        setObjectName(newObject);
    };
    //
    const handlePrintInfo = (e) => {
        e.preventDefault();
        console.log(objectName);
    };
    //->
    return (
        <React.Fragment>
            <section>
                <p>{name}</p>
                <button onClick={handleName}>click</button>
            </section>

            <br />

            <section>
                <p>{fullName}</p>
                <button onClick={handleChangeName}>click</button>
            </section>

            <br />
            <section>
                <p>el nombre es {specialName ? "alex" : "juan"}</p>
                <button onClick={handleChangeSpecialName}>click</button>
            </section>
            <br />
            <section>
                <input
                    name="firstName"
                    type="text"
                    placeholder="ingresar nombre"
                    value={objectName.firstName}
                    onChange={onChangeObj}
                />

                <input
                    name="lastName"
                    type="text"
                    placeholder="ingresar apellido"
                    value={objectName.lastName}
                    onChange={onChangeObj}
                />
                <input
                    name="age"
                    type="text"
                    placeholder="ingresar edad"
                    value={objectName.age}
                    onChange={onChangeObj}
                />

                <button onClick={(e) => handlePrintInfo(e)}>click</button>
            </section>
        </React.Fragment>
    );
};

export default ButtonApp;
