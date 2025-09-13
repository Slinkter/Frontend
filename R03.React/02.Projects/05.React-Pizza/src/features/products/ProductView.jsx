import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./productSlice";
import { useSelector } from "react-redux";

const ProductView = () => {
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    console.log("produts : ", products);

    useEffect(() => {
        dispatch(fetchProducts());
        return () => {};
    }, []);

    return (
        <div>
            <h2>List of products</h2>
            {products.loading && <h2>Loading...</h2>}
            {products.error && <h2>{products.error}</h2>}
            {products.products}
        </div>
    );
};

export default ProductView;
