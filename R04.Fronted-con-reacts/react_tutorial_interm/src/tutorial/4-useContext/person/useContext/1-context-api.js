import React from "react";
import { data } from "../../../../db/data";
// create context
const PersonContext = React.createContext();
// Combine context and funciones
const ContextAPI = () => {
    // hook
    const [people, setPeople] = React.useState(data);
    // func-remove
    const removePerson = (id) => {
        setPeople((people) => {
            return people.filter((person) => person.id !== id);
        });
    };
    //
    const propValue = { people, removePerson };
    // render
    return (
        <PersonContext.Provider value={propValue}>
            <h3> CreateContext - Hook useContext</h3>
            <List />
        </PersonContext.Provider>
    );
};

const List = () => {
    // get data from PersonContext
    const data = React.useContext(PersonContext);
    // render component - list
    return (
        <>
            {data.people.map((person) => (
                <Person key={person.id} {...person} />
            ))}
        </>
    );
};
// Component
const Person = ({ id, name }) => {
    // get removePerson from PersonContext
    const { removePerson } = React.useContext(PersonContext);
    // use removePerson
    const handleRemove = () => removePerson(id);
    // render component
    return (
        <div className="item">
            <h4>{name}</h4>
            <button className="" onClick={handleRemove}>
                remove
            </button>
        </div>
    );
};

export default ContextAPI;
