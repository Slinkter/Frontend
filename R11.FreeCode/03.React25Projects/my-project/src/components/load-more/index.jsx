import React, { useEffect } from "react";
import { useState } from "react";

import "./style.css";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      const url_api = `https://dummyjson.com/products?limit=20&skip=${
        count === 0 ? 0 : count * 20
      }`;
      const res = await fetch(url_api);
      const data = await res.json();
      if (data && data.products && data.products.length) {
        setProducts((prevData) => [...prevData, ...data.products]);
        setLoading(false);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) {
      setDisableButton(true);
    }
  }, [products]);

  if (loading) {
    return <div>Loading data !!! please wait</div>;
  }

  return (
    <div className="container-load-more">
      <div className="product-container">
        {products && products.length
          ? products.map((item, index) => (
              <div key={index} className="product">
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load more products
        </button>
        {disableButton ? <p>you have reached to 100</p> : null}
      </div>
    </div>
  );
};

export default LoadMoreData;
