import React, { useEffect, useRef, useState } from "react";
import { schema, TypeApi, User } from "./Type/user";
const URL_USER = "https://randomuser.me/api/?results=50";

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isPaintRow, setIsPaintRow] = useState(false);
    const [isOrderByCountry, setIsOrderByCountry] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");

    const listOrigin = useRef<User[]>([]);

    useEffect(() => {
        fethData();
    }, []);

    const fethData = async () => {
        try {
            const res = await fetch(URL_USER);
            const data: TypeApi = await res.json();
            const result = schema.safeParse(data);

            if (result.success) {
                setUsers(result.data.results);
                listOrigin.current = result.data.results;
            } else {
                console.log(result.error);
            }

            console.log(data);
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("fin");
        }
    };

    /* function */

    const btnTogglePaintRows = () => {
        setIsPaintRow(!isPaintRow);
    };
    const btnToggleOrderByCountry = () => {
        setIsOrderByCountry((prev) => !prev);

        if (isOrderByCountry) {
            setUsers(listOrigin.current);
            return;
        }

        const listsort = [...users].sort((a, b) => {
            return a.location.country.localeCompare(b.location.country);
        });

        setUsers(listsort);
    };
    const btnDeleteUserById = (id: string) => {
        const newlist = [...users].filter((u) => u.login.uuid !== id);
        setUsers(newlist);
    };
    const btnRestoreOriginUser = () => {
        setUsers(listOrigin.current);
    };

    const userSorted = isOrderByCountry
        ? users.sort((u1, u2) => {
              return u1.location.country.localeCompare(u2.location.country);
          })
        : users;

    const userRender = userSorted.filter((user) => {
        return user.location.country
            .toLowerCase()
            .includes(countrySearch.toLowerCase());
    });

    return (
        <div>
            <h1>Tabla de paises</h1>
            <section className="main-section ">
                <button onClick={btnTogglePaintRows}>colorear fila</button>
                <button onClick={() => btnToggleOrderByCountry()}>
                    ordernar por pais
                </button>
                <button onClick={() => btnRestoreOriginUser()}>
                    restaurar estado inicial{" "}
                </button>
                <input
                    className="text-cyan-600"
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                />
            </section>

            <table className={isPaintRow ? "paintRow" : ""}>
                <thead className="bg-slate-200">
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Pais</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {userRender.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <img src={user.picture.thumbnail} alt="" />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            btnDeleteUserById(user.login.uuid)
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
        </div>
    );
};

export default App;
