import React from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import ProductsList from "./ProductsList";
import ProductsGrid from "./ProductsGrid";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const ProductsContainer = () => {
    const { meta } = useLoaderData();
    const totalProducts = meta.pagination.total;
    const [layout, setLayout] = useState("grid");

    const setActiveStyles = (pattern) => {
        return `text ${pattern === layout ? "" : ""}`;
    };

    return (
        <>
            <div className="">
                <h4>
                    {totalProducts} product {totalProducts > 1 && "s"}
                </h4>
                <div className="">
                    <button
                        type="button"
                        onClick={() => setLayout("grid")}
                        className=""
                    >
                        <BsFillGridFill />
                    </button>
                    <button
                        type="button"
                        onClick={() => setLayout("list")}
                        className=""
                    >
                        <BsList />
                    </button>
                </div>
            </div>
            {/*  */}
            <div>
                {totalProducts === 0 ? (
                    <h5></h5>
                ) : layout === "grid" ? (
                    <ProductsGrid />
                ) : (
                    <ProductsList />
                )}
            </div>
        </>
    );
};

export default ProductsContainer;
