import { useState, useCallback, useMemo } from "react";
import { data } from "../../../../data";
import List from "./List";
import slowFunction from "./slowFunction";

const LowerState = () => {
    const [people, setPeople] = useState(data);
    const [count, setCount] = useState(0);

    // 🧠 Memoriza el resultado de una función costosa
    const expensiveValue = useMemo(() => slowFunction(), []);
    console.log("Expensive value:", expensiveValue);

    // 🧠 Memoriza la función para evitar recrearla en cada render
    const removePerson = useCallback(
        (id) => {
            setPeople((prevPeople) =>
                prevPeople.filter((person) => person.id !== id)
            );
        },
        [] // No depende de `people` directamente, usamos función de actualización
    );

    return (
        <section>
            <button
                className="btn"
                style={{ marginBottom: "1rem" }}
                onClick={() => setCount((prev) => prev + 1)}
            >
                Count: {count}
            </button>
            <List people={people} removePerson={removePerson} />
        </section>
    );
};

export default LowerState;
