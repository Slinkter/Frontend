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
    const [product, setProduct] = useState(initialProduct);

    function updateProducTitle() {}

    return (
        <div>
            <div>
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
                <img src={product.image.small} alt="image-small" />
            </div>
            <div>
                <button
                    className="btn"
                    onClick={() => updateProducTitle("title", "title edit")}
                >
                    Change Title
                </button>
            </div>

            <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
    );
};

export default ProductApp;
