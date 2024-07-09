import React, { useState } from "react";

const ConditionApp = () => {
    const [condition, setCondition] = useState(true);

    const handleBtnChange = () => setCondition(!condition);

    return (
        <div>
            <button onClick={handleBtnChange}>click</button>
            {condition ? (
                <h1>la condicion es true</h1>
            ) : (
                <h1>la condicion es falso</h1>
            )}
        </div>
    );
};

export default ConditionApp;
