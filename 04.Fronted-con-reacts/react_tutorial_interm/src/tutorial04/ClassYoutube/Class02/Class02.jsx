import React, { useState } from "react";

const Class02 = () => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const increment = () => {
        setCount(count + 1);
        setIsVisible(!isVisible);
    };
    return (
        <div className="card-github">
            <div className="card-inner-github ">
                <h2>Count : {count}</h2>
                {isVisible ? (
                    <p> is visible ? : true </p>
                ) : (
                    <p>is visible ? : false</p>
                )}
                <br />
            </div>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Class02;
