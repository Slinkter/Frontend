import React from "react";
import { useGlobalContext } from "../context";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, clearCart, totalCost } = useGlobalContext();
  console.log(cart, clearCart, totalCost);
  const cartArray = Array.from(cart.entries());
  console.log(cartArray);
  if (cartArray.length === 0) {
    return (
      <section>
        <header>
          <h2>2</h2>
          <h4>4</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
        <h4></h4>
      </header>
      <div>
        {cartArray.map((cartitem) => {
          const [id, item] = cartitem;

          return <CartItem key={id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${totalCost.toFixed(2)}</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={clearCart}>
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default Cart;
