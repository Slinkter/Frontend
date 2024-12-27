import React from "react";
import { data } from "../../db/data";

const UseStateArray = () => {
    //
    const [people, setPeople] = React.useState(data);
    //
    const removeItem = (id) => {
        const newPeople = people.filter((person) => person.id !== id);
        setPeople(newPeople);
    };
    //
    return (
        <>
            {people.map(({ id, name }) => (
                <div key={id} className="item">
                    <h4>{name}</h4>
                    <button onClick={() => removeItem(id)}>remove</button>
                </div>
            ))}
            <br />
            <button className="btn" onClick={() => setPeople([])}>
                clear items
            </button>
            <br />
            <div>
                <pre>{JSON.stringify(people)}</pre>
            </div>
        </>
    );
};

export default UseStateArray;
