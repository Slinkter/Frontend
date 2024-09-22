import React, { useEffect, useState } from "react";

const MultipleEffects = () => {
    // hook
    const [firstValue, setFistValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);
    // funciona a ejecutar
    const handleUpdateFirstValue = () => {
        setFistValue(firstValue + 1);
    };
    // funciona a ejecutar
    const handleUpdateSecondValue = () => {
        setSecondValue(secondValue + 1);
    };

    // firtValue
    useEffect(() => {
        console.log(" useEffect value");
    }, [firstValue]);
    // secondValue
    useEffect(() => {
        console.log(" useEffect secondvalue");
    }, [secondValue]);

    console.log("1- Componet Render", firstValue);
    return (
        <>
            <h1>MultipleEffects </h1>
            <br />
            <h2>value : {firstValue}</h2>
            <button onClick={handleUpdateFirstValue}>value</button>
            <h2>secondValue : {secondValue}</h2>
            <button onClick={handleUpdateSecondValue}>second value</button>
        </>
    );
};

export default MultipleEffects;
