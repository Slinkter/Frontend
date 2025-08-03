import React from "react";
import { useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsList = () => {
    const { products } = useLoaderData();

    return (
        <div>
            {products.map((product) => {
                const { title, price, image, company } = product.attributes;
                const dollarsAmount = formatPrice(price);
                return (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className=""
                    >
                        <img src={image} alt="" className="" />
                        <div className="">
                            <h3 className="">{title} </h3>
                            <h4 className="">{company}</h4>
                        </div>
                        <p>{dollarsAmount}</p>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductsList;
