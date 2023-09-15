import React from "react";
import { useFetch } from "./useFetch02";

const url = "https://course-api.com/javascript-store-products";

const Example = () => {
  const { loading, products } = useFetch(url);
  console.log(products[0]);
  return (
    <>
      <h2>{loading ? "loading..." : "data"}</h2>
      <div>
        <pre>{JSON.stringify(products[0], null, 2)}</pre>
      </div>
    </>
  );
};

export default Example;
