import React from "react";
import { useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./store";
import { types } from "./types";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const btnShow = (product) => {
    dispatch({ type: types.show, payload: product });
  };
  const btnAdd = (product) => {
    dispatch({ type: types.add, payload: product });
  };
  const btnRemove = (product) => {
    dispatch({ type: types.remove, payload: product });
  };
  const btnClear = (product) => {
    dispatch({ type: types.clear, payload: product });
  };

  return (
    <div className="container-main">
      <section>
        <h2>Product</h2>
        <ul>
          {state.products.map((product) => {
            return (
              <li key={product.id}>
                {product.title}
                <button
                  className="btn-default"
                  onClick={() => btnShow(product)}
                >
                  Show{" "}
                </button>
                <button className="btn-default" onClick={() => btnAdd(product)}>
                  Add{" "}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2>Cart</h2>
        <ul>
          {state.cart.map((item) => {
            return (
              <li key={item.id}>
                {item.title}{" "}
                <span>
                  {item.quantity}

                  <button
                    className="btn-default"
                    onClick={() => btnRemove(item)}
                  >
                    remove one
                  </button>
                  <button
                    className="btn-default"
                    onClick={() => btnClear(item)}
                  >
                    remove all
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2>preview</h2>
        <p>{state.activeProduct.title}</p>
      </section>
    </div>
  );
};

export default App;
