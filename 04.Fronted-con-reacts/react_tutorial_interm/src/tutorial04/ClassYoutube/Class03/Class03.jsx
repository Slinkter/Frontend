import React, { useState } from "react";

const Class03 = () => {
    //hooks
    const [name, setName] = useState("Luis");
    // funcion
    const handleChangeName = (value) => {
        setName(value);
    };

    return (
        <div>
            <ComponentChild name={name} handleChangeName={handleChangeName} />
        </div>
    );
};

const ComponentChild = (props) => {
    const { name, handleChangeName } = props;

    return (
        <div>
            <h1> {name} </h1>
            <button
                onClick={() => {
                    handleChangeName("Jhonny");
                }}
            >
                Change Name
            </button>
        </div>
    );
};

export default Class03;
