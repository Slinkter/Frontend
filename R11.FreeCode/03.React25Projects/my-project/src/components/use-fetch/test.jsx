import React from "react";
import useFetch from ".";

const UseFetchHookTest = () => {
  const { data, error, pending } = useFetch(
    "https://dummyjson.com/products?limit=100"
  );
  console.log(data, error, pending);
  return (
    <div>
      <h1>Use fetch hook</h1>
      {pending ? <h3>Pending!! please wait</h3> : null}
      {data && data.products && data.products.length
        ? data.products.map((item) => <p key={item.id}>{item.title}</p>)
        : null}
    </div>
  );
};

export default UseFetchHookTest;
