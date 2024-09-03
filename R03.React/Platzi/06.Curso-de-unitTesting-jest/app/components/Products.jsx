import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Product from "./Product";
import "../styles/Products.css";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToPros = {
  addToCart: actions.addToCart,
};

const Products = (props) => {
  const { products, addToCart } = props;
  const handleAddToCart = (product) => () => {
    addToCart(product);
  };
  const style = {
    p: "Products",
    pItems: "Products-items",
  };

  return (
    <div className={style.p}>
      <div className={style.pItems}>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToPros)(Products);
