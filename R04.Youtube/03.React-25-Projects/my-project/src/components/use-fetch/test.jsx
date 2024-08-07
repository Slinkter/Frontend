import React from "react";
import useFetch from ".";

const UseFetchHookTest = () => {
    const url_api = "https://dummyjson.com/products?limit=100";
    const { data, error, pending } = useFetch(url_api);
    console.log(data, error, pending);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>Use fetch hook</h1>
            {pending ? <h3>Pending!! please wait</h3> : null}
            {data && data.products && data.products.length
                ? data.products.map((item) => <p key={item.id}>{item.title}</p>)
                : null}
        </div>
    );
};

export default UseFetchHookTest;
