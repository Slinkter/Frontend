import axios from "axios";
import React, { useEffect, useState } from "react";
// class 15 : 2:01:58
// npm i axios

const initValues = { data: [], name: "" };

const Class09 = () => {
    // hooks
    const [data, setData] = useState(initValues.data);
    const [name, setName] = useState(initValues.name);
    // method : Post
    const postData = () => {
        const url = "http://dominioapi.com/users";
        const newobj = { name: "someone", age: 26, hobbie: ["a", "b", "c"] };
        //
        axios
            .post(url, newobj)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };
    // method : Get
    const getData = () => {
        const url = "http://dominioapi.com/users";
        axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
        setData([
            { name: "someone", age: 26, hobbie: ["a", "b", "c"] },
            { name: "someone", age: 26, hobbie: ["a", "b", "c"] },
            { name: "someone", age: 26, hobbie: ["a", "b", "c"] },
            { name: "someone", age: 26, hobbie: ["a", "b", "c"] },
            { name: "someone", age: 26, hobbie: ["a", "b", "c"] },
        ]);
    };
    // method : Update by id
    const updateData = (id) => {
        const url = `http://dominioapi.com/users/${id}`;
        const newobj = { name: "someone", age: 26, hobbie: ["a", "b", "c"] };
        axios
            .put(url, newobj)
            .then((res) => getData())
            .catch((err) => console.error(err));
    };
    // method : Delete by id
    const deleteData = (id) => {
        const url = `http://dominioapi.com/users/${id}`;
        axios
            .delete(url)
            .then((res) => getData())
            .catch((err) => console.error(err));
    };
    // cycle data
    useEffect(() => {
        getData();
        return () => {};
    }, []);

    return (
        <div className="container">
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <button onClick={postData}> Send Data</button>

            <br />
            {data.map((item) => {
                return (
                    <div>
                        <h2>{item.name}</h2>
                        <h3>{item.age}</h3>
                        <h3>{item.hobbie}</h3>
                        <button onClick={() => updateData(item.id)}>
                            update
                        </button>
                        <button onClick={() => deleteData(item.id)}>
                            delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Class09;
