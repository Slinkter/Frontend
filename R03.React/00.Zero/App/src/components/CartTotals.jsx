import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <div>
      <div>
        <p>
          <span>SubTotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </p>
        <p>
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </p>
        <p>
          <span>{tax}</span>
          <span>{formatPrice(tax)}</span>
        </p>
        <p>
          <span>Order Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
