import { useEffect, useState } from "react";

function HigherOrder(title, Component, nameRequest) {
  return function HOC() {
    // URL
    const url_api = `https://jsonplaceholder.typicode.com/${nameRequest}`;
    // hooks
    const [data, setData] = useState([]);
    // servidor
    const getData = async () => {
      const res = await fetch(url_api);
      const data = await res.json();
      setData(data);
    };
    // cycle data
    useEffect(() => {
      getData();
    }, []);
    // render
    return (
      <div>
        <h2>{title}</h2>
        <Component data={data} />
      </div>
    );
  };
}

export default HigherOrder;
