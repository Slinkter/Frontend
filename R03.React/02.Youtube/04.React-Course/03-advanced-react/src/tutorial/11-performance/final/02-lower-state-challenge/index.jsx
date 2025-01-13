import { useState } from "react";
import { data } from "../../../../data";
import Form from "./Form";
import List from "./List";
const LowerStateChallenge = () => {
    const [people, setPeople] = useState(data);

    const addPerson = (name) => {
        const newPerson = { id: Date.now(), name };
        setPeople([...people, newPerson]);
    };
    return (
        <section>
            <Form addPerson={addPerson} />
            <List people={people} />
        </section>
    );
};
export default LowerStateChallenge;
