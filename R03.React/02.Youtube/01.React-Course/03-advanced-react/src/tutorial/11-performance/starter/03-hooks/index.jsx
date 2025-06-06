import { useCallback, useMemo, useState } from "react";
import { data } from "../../../../data";
import List from "./List";
import { slowFuntions } from "./slowFunctions";
/*  */
const LowerState = () => {
  const [people, setPeople] = useState(data);
  const [count, setCount] = useState(0);
  /*  useMemo*/
  const value = useMemo(() => slowFuntions(), []);
  /* useCallback  */
  const removePerson = useCallback(
    (id) => {
      const newPeople = people.filter((person) => person.id !== id);
      setPeople(newPeople);
    },
    [people]
  );

  console.log(value);
  return (
    <section>
      <button
        className="btn"
        onClick={() => setCount(count + 1)}
        style={{ marginBottom: "1rem" }}
      >
        count {count}
      </button>
      <List people={people} removePerson={removePerson} />
    </section>
  );
};
export default LowerState;
