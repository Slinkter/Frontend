import { useEffect, useRef, useState } from "react";
import { User } from "./type/user";

const URL_API_USERRANDOM = "https://randomuser.me/api/?results=100";

const App = () => {
    // hooks States
    const [users, setUsers] = useState<User[]>([]);
    const [isPaintRow, setisPaintRow] = useState(false);
    const [isOrderByCountry, setisOrderByCountry] = useState(false);
    const [countrySearch, setCountrySearch] = useState<string>("");
    //
    const originuser = useRef<User[]>([]);
    // hook efect
    useEffect(() => {
        getUsers();
    }, []);

    // funtions
    const getUsers = async () => {
        try {
            const res = await fetch(URL_API_USERRANDOM);
            if (!res.ok) {
                throw Error("error en la api");
            }
            const data = await res.json();
            setUsers(data.results);
            originuser.current = data.results;
            console.log(res);
            console.log(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTogglePaintRows = () => {
        setisPaintRow(!isPaintRow);
    };

    const handleToggleOrderByCountry = () => {
        setisOrderByCountry(!isOrderByCountry);

        if (isOrderByCountry) {
            setUsers(originuser.current);
            return;
        }

        const listsort = [...users].sort((a, b) => {
            return a.location.country.localeCompare(b.location.country);
        });

        setUsers(listsort);

        console.log(listsort);
    };
    const handleDeleteUserById = (uuid: string) => {
        const newlist = [...users].filter((u) => u.login.uuid !== uuid);
        setUsers(newlist);
    };

    const restoreOriginUsers = () => {
        setUsers(originuser.current);
    };

    const usersSorted = isOrderByCountry
        ? [...users].sort((a, b) => {
              return a.location.country.localeCompare(b.location.country);
          })
        : users;

    const usersRender = usersSorted.filter((u) =>
        u.location.country.toLowerCase().includes(countrySearch.toLowerCase())
    );

    return (
        <div>
            <h1>Lista de usuarios </h1>
            <section
                style={{
                    margin: "1rem 0",
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "center",
                }}
            >
                <button onClick={handleTogglePaintRows}>Colorear filar</button>
                <button onClick={handleToggleOrderByCountry}>
                    Ordenar por pais
                </button>
                <button onClick={restoreOriginUsers}>
                    Restaurar estado inicial
                </button>
                <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                />
            </section>
            <table
                style={{
                    width: "100%",
                }}
                className={isPaintRow ? "colorOddRows" : ""}
            >
                <thead
                    style={{
                        fontSize: "1.5rem",
                        color: "white",
                        background: "black",
                    }}
                >
                    <tr>
                        <th>foto</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th> Pais </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usersRender.map((u, index) => {
                        return (
                            <tr key={u.login.uuid}>
                                <td>
                                    <img
                                        src={u.picture.thumbnail}
                                        alt={u.name.first}
                                    />
                                </td>
                                <td>{u.name.first}</td>
                                <td>{u.name.last}</td>
                                <td>{u.location.country}</td>
                                <td>
                                    {index + 1}
                                    <button
                                        onClick={() =>
                                            handleDeleteUserById(u.login.uuid)
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/*   <pre>{JSON.stringify(listUser.results[0], null, 2)}</pre> */}
        </div>
    );
};

export default App;
