import React from "react";
import { connect } from "react-redux";
import actions from "../actions/index";
import "../styles/Checkout.css";

const mapStateToProps = (state) => {
    return { cart: state.cart };
};
const mapDispatchToProps = {
    removeFromCart: actions,
};

const Checkout = (props) => {
    const { cart, removeFromCart } = props;

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    };

    const remove = (product) => () => {
        removeFromCart(product);
    };

    const style = {
        c: "Checkout",
        cContent: "Checkout-content",
        cItem: "Checkout-item",
        cElement: "Checkout-element",
        cSidebar: "Checkout-sidebar",
    };

    return (
        <div className={style.c}>
            <div className={style.cContent}>
                {cart.length > 0 ? (
                    <h3> Lista de Pedidos </h3>
                ) : (
                    <h3> Sin Pedido </h3>
                )}
                {cart.map((item) => (
                    <div className={style.cItem}>
                        <div className={style.cElement}>
                            <h4>{item.title}</h4>
                            <span>${item.price}</span>
                        </div>
                        <button type="button" onClick={remove(item)}>
                            <i className="fas fa-trash-alt" />
                        </button>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className={style.cSidebar}>
                    <h3>{`Precio Total : $ ${handleSumTotal()}`}</h3>
                </div>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
