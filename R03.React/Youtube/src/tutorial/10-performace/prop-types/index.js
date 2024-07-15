import React from "react";
import Product from "./Product";
import useFetch from "./useFetch";

const url = "https://course-api.com/react-prop-types-example";

const Index = () => {
    const { data: products } = useFetch(url);

    return (
        <>
            <h2>products</h2>
            <section className="products">
                {products.map((product) => {
                    return <Product key={product.id} {...product} />;
                })}
            </section>
        </>
    );
};

export default Index;
