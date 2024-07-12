import React, { useState, useCallback, useMemo } from "react";
import { useFetch } from "../../8-custom-hooks/useFetch02";
//
const url = "https://course-api.com/javascript-store-products";
//
const calculate = (data) => {
  return (
    data.reduce((total, item) => {
      const price = item.fields.price;
      if (price >= total) {
        total = price;
      }
      return total;
    }, 0) / 100
  );
};
//
const Index = () => {
  //
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);

  const mostExpensive = useMemo(() => calculate(products), [products]);
  //
  return (
    <div>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: "3rem" }}> cart : {cart}</h1>
      <h1>Most Expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart} />
    </div>
  );
};

const BigList = React.memo(({ addToCart, products }) => {
  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct key={product.id} addToCart={addToCart} {...product} />
        );
      })}
    </section>
  );
});

const SingleProduct = (props) => {
  //
  const { fields, addToCart } = props;
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;
  //
  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};
export default Index;
