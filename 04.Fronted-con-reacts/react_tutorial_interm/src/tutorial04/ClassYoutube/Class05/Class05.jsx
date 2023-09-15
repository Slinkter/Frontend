import React from "react";

const Class05 = () => {
    const getInput = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
    };

    const addNums = (num1, num2) => {
        console.log(num1 + num2);
    };

    return (
        <div>
            <input type="text" name="input" onChange={(e) => getInput(e)} />
            <button onClick={() => addNums(2, 3)}>add numbers</button>
        </div>
    );
};

export default Class05;
