import React from "react";
import { useState } from "react";
//
const initialBoolean = true;
//
const ConditionApp = () => {
    //
    const [condition, setCondition] = useState(initialBoolean);

    return (
        <div>
            <button onClick={() => setCondition(!condition)}>click </button>

            {condition ? (
                <h1> la condicion es true </h1>
            ) : (
                <h1> la condicion es false</h1>
            )}

            <h2> la condicion es {condition.toString()}</h2>
        </div>
    );
};

export default ConditionApp;
