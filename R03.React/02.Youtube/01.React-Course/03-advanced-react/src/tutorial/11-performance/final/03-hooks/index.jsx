import { useState, useCallback, useMemo } from "react";
import { data } from "../../../../data";
import List from "./List";
import slowFunction from "./slowFunction";
const LowerState = () => {
  const [people, setPeople] = useState(data);
  const [count, setCount] = useState(0);

  const value = useMemo(() => slowFunction(), []);
  console.log(value);

  const removePerson = useCallback(
    (id) => {
      console.log(people);
      const newPeople = people.filter((person) => person.id !== id);
      setPeople(newPeople);
    },
    [people]
  );

  return (
    <section>
      <button
        className="btn"
        style={{ marginBottom: "1rem" }}
        onClick={() => setCount(count + 1)}
      >
        count {count}
      </button>
      <List people={people} removePerson={removePerson} />
    </section>
  );
};
export default LowerState;
