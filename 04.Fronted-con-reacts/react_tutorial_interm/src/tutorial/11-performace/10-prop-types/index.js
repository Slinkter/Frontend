import React from "react";
import Product from "./Product";
import { useFetch } from "../../9-custom-hooks/final/2-useFetch";

const url = "https://course-api.com/react-prop-types-example";

const Index = () => {
    const { products } = useFetch(url);
    return (
        <React.Fragment>
            <h2>products</h2>
            <section className="products">
                {products.map((product) => {
                    return <Product key={product.id} {...product} />;
                })}
            </section>
        </React.Fragment>
    );
};

export default Index;
