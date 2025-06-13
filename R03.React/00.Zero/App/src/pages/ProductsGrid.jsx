import React from "react";
import { useLoaderData } from "react-router";

const ProductsGrid = () => {
    const { products } = useLoaderData();

    return <div>ProductsGrid</div>;
};

export default ProductsGrid;
