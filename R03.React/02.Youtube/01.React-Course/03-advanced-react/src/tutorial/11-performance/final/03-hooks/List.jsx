import Person from "./Person";
import { memo } from "react";

/**
 * Renderiza una lista de personas.
 * Se memoriza con `memo` para evitar renders innecesarios.
 */
const List = ({ people, removePerson }) => {
    return (
        <div>
            {people.map((person) => (
                <Person
                    key={person.id}
                    {...person}
                    removePerson={removePerson}
                />
            ))}
        </div>
    );
};

export default memo(List);
