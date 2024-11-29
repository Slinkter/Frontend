import React from "react";

const URL_API_USERRANDOM = "https://randomuser.me/api/?results=10";

const App = () => {
    return (
        <div>
            App
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>img</td>
                            <td>liam</td>
                            <td>cave</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default App;
