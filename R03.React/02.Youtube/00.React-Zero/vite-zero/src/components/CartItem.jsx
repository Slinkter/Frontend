import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGlobalContext } from "../context";

const CartItem = ({ id, img, title, price, amount }) => {
  console.log({ id, img, title, price, amount });
  const { remove, increase, decrease } = useGlobalContext();

  return (
    <article className="cart-item">
      <img src={img} alt="" />
      <div>
        <h5>{title}</h5>
        <span className="item-price">$ {price}</span>
        <button className="remove-btn" onClick={() => remove(id)}>
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={() => increase(id)}>
          <FaChevronUp className="amount-icon" />
        </button>
        <span className="amount">{amount}</span>
        <button className="amount-btn" onClick={() => decrease(id)}>
          <FaChevronDown className="amount-icon" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
