/**
 * Componente individual de persona.
 */
const Person = ({ name, id, removePerson }) => {
    return (
        <div>
            <h4>{name}</h4>
            <button onClick={() => removePerson(id)}>Remove</button>
        </div>
    );
};

export default Person;
