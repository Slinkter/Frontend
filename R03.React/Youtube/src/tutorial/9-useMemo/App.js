// # React memo, useMemo y useCallback
import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import List from "./components/List";

const initUsers = [
    { id: 1, name: "luis" },
    { id: 2, name: "ana" },
    { id: 3, name: "pepe" },
    { id: 4, name: "Carmen" },
];
const initSearch = "";
const initTextInput = "";

const App = () => {
    const [users, setUsers] = useState(initUsers);
    const [search, setSearch] = useState(initSearch);
    const [textInput, setTextInput] = useState(initTextInput);

    useEffect(() => {}, []);

    const filterUser = () =>
        users.filter((user) => {
            const x = user.name.toLowerCase();
            const y = search.toLowerCase();
            return x.includes(y);
        });

    // handleFilterUser es un arreglo que contiene los usuarios filtrados por el nombre en
    // función del valor de search, y se actualizará solo cuando se modifique alguno de
    // los estados users o search.

    const handleFilterUser = useMemo(filterUser, [users, search]);

    const handleInput = (e) => setTextInput(e.target.value);
    const handleSearch = () => setSearch(textInput);
    const handleNewUser = () => {
        const newUser = { id: Date.now(), name: textInput };
        setUsers([...users, newUser]);
    };

    // se utiliza useCallback para evitar que se vuelva
    // a crear la función handleDeleteUser cada vez que se actualice el estado user
    const handleDeleteUser = useCallback(
        (userId) => setUsers(users.filter((user) => user.id !== userId)),
        [users]
    );

    const handleClear = () => {
        setTextInput("");
        setSearch(""); // se agrega para que la lista se actualice
    };

    return (
        <div className="container p-5">
            <input
                value={textInput}
                onChange={(e) => handleInput(e)}
                type="text"
            />
            <button
                className="btn btn-outline-primary m-2"
                onClick={handleSearch}
            >
                Search
            </button>
            <button
                className="btn btn-outline-success m-2"
                onClick={handleNewUser}
            >
                Add
            </button>
            <button
                className="btn btn-outline-success m-2"
                onClick={handleClear}
            >
                Clear
            </button>
            <List
                users={handleFilterUser}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    );
};

export default App;

// ### Funcion computada
//
// es decir retornan un valor (retorn de un lista filtrada)
//
//
// ### useMemo
//
// Este hook  memoriza el resultado de lo filtrado
// para actulizar necesita tener las dependencias [users, search]
// cuando se agregar un usuario debe memorizar de nuevo la funcion filtro
// cuando se cambio el inpu debe meorizar de nuevo la funcion filtro
//
// ###useCallback
//
// guardar la definicion de la funcion
// este es una property nueva , cambia cada vez q se usa el input y se renderiza
// la memo lo ve como algo nuevo
// para eso se usa useCallback , para guardar memorizada una funciona definada
//
