import React from "react";
import { memo } from "react";

const ProductList = memo(({ products }) => {
    return (
        <div className="product-container">
            {products.map((product) => (
                <div key={product.id} className="product">
                    <img src={product.thumbnail} alt="" />
                    {product.title}
                    {product.description}
                </div>
            ))}
        </div>
    );
});

ProductList.displayName = "ProductList";

export default ProductList;
