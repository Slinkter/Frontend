import { useEffect, useState } from "react";
import { APIschema, TypeApi, User } from "./Type/users";

const URL_API_USERRANDOM = "https://randomuser.me/api/?results=10";

const App = () => {
    const [toogleStyle, setToogleStyle] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    const fetchData = async () => {
        const res = await fetch(URL_API_USERRANDOM);
        const data: TypeApi = await res.json();
        const result = APIschema.safeParse(data);
        if (!result.success) {
            console.log(result.error);
        } else {
            setUsers(result.data.results);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const btn_ChangeStyle = () => setToogleStyle(!toogleStyle);

    console.log(users[0]?.name);

    return (
        <div>
            <section>
                <button onClick={btn_ChangeStyle}>Change Style</button>
                <button>Order by Country</button>
                <button>Reiniciar</button>
                <input type="text" />
            </section>
            <section>
                <table
                    className={
                        toogleStyle ? "table-fixed rowColored" : "table-fixed"
                    }
                >
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>País</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={user.picture.thumbnail}
                                        alt="User Thumbnail"
                                    />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default App;
