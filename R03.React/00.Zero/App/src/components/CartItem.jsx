import React from "react";
import { useDispatch } from "react-redux";
import { formatPrice, generateAmountOptions } from "../utils";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const removeItemFromTheCart = () => {};
  const handleAmount = (e) => {};

  const { cartID, title, price, image, amout, company, productColor } =
    cartItem;

  return (
    <article key={cartID} className="">
      {}
      <img src={image} alt="" className="" />
      <div>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p>
          color: <span></span>
        </p>
      </div>
      <div>
        <div>
          <label htmlFor="amout">
            <span>Amount</span>
          </label>
          <select name="" id="">
            {generateAmountOptions(amout + 5)}
          </select>
        </div>

        <button>remove</button>
      </div>

      <p>{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
