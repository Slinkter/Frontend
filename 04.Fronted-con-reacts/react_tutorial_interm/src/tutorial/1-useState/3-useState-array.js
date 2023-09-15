import React from "react";
import { data } from "../../../data";
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
      {/* Show list */}
      {people.map(({ id, name }) => (
        <div key={id} className="item">
          <h4>{name}</h4>
          <button onClick={() => removeItem(id)}>remove</button>
        </div>
      ))}

      {/* Button */}
      <button className="btn" onClick={() => setPeople([])}>
        clear items
      </button>

      <div>
        <br />
        <pre>{JSON.stringify(people)}</pre>
      </div>
    </>
  );
};

export default UseStateArray;
