import React from "react";
import { useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
import { Link } from "react-router-dom";

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatPrice(price);
        return (
          <Link key={product.id} to={`/products/${product.id}`} class="">
            <figure className="">
              <img src={image} alt={title} className="" />
            </figure>
            <div className="">
              <h2 className="">{title}</h2>
              <span className="">{dollarsAmount} </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
