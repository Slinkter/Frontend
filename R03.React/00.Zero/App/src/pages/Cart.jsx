import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../components/SectionTitle";
import CartItemsList from "../components/CartItemsList";
import CartTotals from "../components/CartTotals";
import { Link } from "react-router-dom";

const Cart = () => {
    const user = useSelector((state) => state.userState.user);
    const numItemsInCart = useSelector(
        (state) => state.cartState.numItemsInCart
    );

    if (numItemsInCart === 0) {
        return <SectionTitle text={"your cart is empty"} />;
    }

    return (
        <>
            <SectionTitle text={"shopping cart"} />
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
                <div className="">
                    <CartItemsList />
                </div>
                <div className="">
                    <CartTotals />
                    {user ? (
                        <Link className="/checkout">proceed to checkout</Link>
                    ) : (
                        <Link className="/login">please login</Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
