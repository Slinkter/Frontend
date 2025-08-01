import React from "react";

import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartems);

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cardID} CartItem={CartItem}></CartItem>;
      })}
    </>
  );
};

export default CartItemsList;
