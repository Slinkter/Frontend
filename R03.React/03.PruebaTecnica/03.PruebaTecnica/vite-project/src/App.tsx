import React, { useEffect, useRef, useState } from "react";
import { schema, TypeApi, User } from "./Type/user";
const URL_USER = "https://randomuser.me/api/?results=5";

const App = () => {
    const [isPaintRow, setIsPaintRow] = useState(false);
    const [isOrderByCountry, setIsOrderByCountry] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");

    const [users, setUsers] = useState<User[]>([]);

    const listOrigin = useRef<User[]>([]);

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

    useEffect(() => {
        fethData();
    }, []);

    /* function */

    const btnTogglePaintRows = () => {
        setIsPaintRow(!isPaintRow);
    };
    const btnToggleOrderByCountry = () => {};
    const btnDeleteUserById = () => {};
    const btnRestoreOriginUser = () => {};

    const userSorted = isOrderByCountry ? users : users;

    const userRender = userSorted;

    return (
        <div>
            <h1>Tabla de paises</h1>
            <section className="main-section ">
                <button onClick={btnTogglePaintRows}>colorear fila</button>
                <button>ordernar por pais</button>
                <button>restaurar estado inicial </button>
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
                                    <button>Eliminar</button>
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
