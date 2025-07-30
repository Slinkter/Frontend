import React from "react";
import Hero from "./Hero";
import { customFetch } from "../utils";
import ProductsGrid from "./ProductsGrid";
const url = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch(url);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <div>
      {/* <Hero /> */}

      {/*  <ProductsGrid /> */}
    </div>
  );
};

export default Landing;
