import React, { useState } from "react";

const initialProduct = {
    title: " init title",
    description: "init description",
    image: {
        small: "",
        medium: "",
        big: "",
    },
};

const ProductApp = () => {
    // hooks
    const [product, setProduct] = useState(initialProduct);
    // f1
    const updateProductoTitle = (property, value) =>
        setProduct({ ...product, [property]: value });
    // f2
    const updateProductoDesc = (property, value) =>
        setProduct({ ...product, [property]: value });
    // render
    return (
        <div>
            <div className="">
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
                <img src={product.image.small} alt={product.title} />
            </div>
            <button
                className=""
                onClick={() => updateProductoTitle("title", "title edit")}
            >
                Change Title
            </button>
            <button
                className=""
                onClick={() => updateProductoDesc("description", "desc edit")}
            >
                Change Desc
            </button>
            <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
    );
};

export default ProductApp;
