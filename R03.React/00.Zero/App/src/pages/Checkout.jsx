import React from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import SectionTitle from "../components/SectionTitle";
import CartTotals from "../components/CartTotals";
import CheckoutForm from "../components/CheckoutForm";

export const loader = (store) => () => {
    const user = store.getState().userState.user;
    if (!user) {
        toast.warn("you must be logged in to checkout");
        return redirect("/login");
    }
    return null;
};

const Checkout = () => {
    const cartTotal = useSelector((state) => state.cartState.cartTotal);
    if (cartTotal === 0) {
        return <SectionTitle text={"place your order"} />;
    }
    return (
        <>
            <SectionTitle />
            <div className="">
                <CheckoutForm />
                <CartTotals />
            </div>
        </>
    );
};

export default Checkout;
