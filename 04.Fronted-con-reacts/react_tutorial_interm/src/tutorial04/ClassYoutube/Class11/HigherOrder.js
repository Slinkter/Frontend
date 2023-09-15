import { useEffect, useState } from "react";

function HigherOrder(title, Component, nameRequest) {
    return function HOC() {
        // hooks
        const [data, setData] = useState([]);
        // servidor
        const getData = async () => {
            const url = `https://jsonplaceholder.typicode.com/${nameRequest}`;
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        };
        // cycle data
        useEffect(() => {
            getData();
        }, []);
        // -->
        return (
            <div>
                <h2>{title}</h2>
                <Component data={data} />
            </div>
        );
    };
}

export default HigherOrder;
