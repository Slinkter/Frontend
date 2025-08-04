import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemsList = () => {
    const cartItems = useSelector((state) => state.cartState.cartItems);

    return (
        <>
            {cartItems.map((item) => (
                <CartItem key={item.cartID} cartItem={item} />
            ))}
        </>
    );
};

export default CartItemsList;
