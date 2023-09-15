import React from "react";

const Class06 = () => {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const details = [
        { name: "a", age: 21 },
        { name: "b", age: 22 },
        { name: "c", age: 23 },
        { name: "d", age: 24 },
        { name: "e", age: 25 },
        { name: "f", age: 28 },
    ];

    return (
        <div>
            <ul>
                {number.map((num) => {
                    return <li key={num}> {num}</li>;
                })}
            </ul>
            <ul>
                {details.map((det) => {
                    return (
                        <div key={det.name}>
                            <li>
                                {det.name} - {det.age}
                            </li>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default Class06;
