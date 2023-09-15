import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import { data } from "../../../db/data";
import Counter from "./Counter";
import List from "./List";
import Form from "./Form";
import slowFunction from "./slowFunction";

const LowerState = () => {
  const [people, setPeople] = useState(data);
  const [count, setCount] = useState(0);

  const value = useMemo(() => slowFunction(), []);
  console.log(value);

  const addPerson = (name) => {
    const newPerson = {
      id: Date.now(),
      name: name,
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = useCallback(
    (id) => {
      const newPeople = people.filter((person) => person.id !== id);
      setPeople(newPeople);
    },
    [people]
  );

  return (
    <section>
      <Counter />
      <Form addPerson={addPerson} />
      <List people={people} removePerson={removePerson} />
    </section>
  );
};

export default LowerState;
