import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/Header.css";

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    };
};
const mapDispatchToPros = null;

const style = {
    h: "Header",
    hTitlle: "Header-title",
    hCheckout: "Header-checkout",
    hAlert: "Header-alert",
    icon: "fas fa-shopping-basket",
};
const Header = (props) => (
    <div className="Header">
        <h1 className="Header-title">
            <Link to="/">Team Store</Link>
        </h1>
        <div className="Header-checkout">
            <Link to="/checkout">
                <i className="fas fa-shopping-basket" />
            </Link>
            {props.cart.length > 0 && (
                <div className="Header-alert">{props.cart.length}</div>
            )}
        </div>
    </div>
);

export default connect(mapStateToProps, mapDispatchToPros)(Header);
