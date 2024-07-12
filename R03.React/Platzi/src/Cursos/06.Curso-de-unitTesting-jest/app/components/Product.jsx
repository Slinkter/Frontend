import React from "react";

const Product = (props) => {
  const { product, handleAddToCart } = props;
  const style = {
    pItem: "Products-item",
    pItemInfo: "Products-item-info",
  };

  return (
    <div className={style.pItem}>
      <img src={product.image} alt={product.title} />
      <div className={style.pItemInfo}>
        <h2>
          {product.title}
          <span>$ {product.price}</span>
        </h2>
        <p>{product.description}</p>
      </div>
      <button type="button" onClick={handleAddToCart(product)}>
        Comprar
      </button>
    </div>
  );
};

export default Product;
