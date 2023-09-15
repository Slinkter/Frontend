import React, { useEffect, useState } from "react";

const Class01 = () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [users, setUsers] = useState([]);
    const [number, setNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // Funciones version 01 - (async await)
    const getDataV1 = async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.group("getDataV1");
        console.log("const res = await fetch(url);: \n", res);
        console.log("const data = await res.json(); \n", data);
        console.groupEnd();
    };
    // Funciones version 02 - promesa???
    const getDataV2 = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    };
    // react hook
    useEffect(() => {
        getDataV1();
        getDataV2();
        return () => {};
    }, []);

    const btnSearchFilter = () => {
        let filterData = users.filter((user) => user.id <= 5);
        setUsers(filterData);
    };
    // esta funcion
    // mulplica cada uno de los elmentos del array
    // y luego filtra a cada uno con la condicion que sea menor a 100
    const mapNumberData = () => {
        //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let filterNumber = number
            .map((num) => {
                return num * num;
            })
            .filter((num) => {
                return num <= 100;
            });
        setNumber(filterNumber);
    };

    return (
        <div className="App">
            <h1>Users</h1>
            <div className="card-github ">
                {users.map((user) => (
                    <div key={user.id} className="card-inner-github ">
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>

            <div className="card-github ">
                <br />
                <button onClick={btnSearchFilter}>show filter</button>
            </div>

            <h1>Number</h1>
            <div className="card-github ">
                {number.map((num) => (
                    <div key={num} className="card-inner-github ">
                        {num}
                    </div>
                ))}
            </div>
            <div className="card-github ">
                <br />
                <button onClick={mapNumberData}>show filter</button>
            </div>

            <div className="  ">
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Class01;
