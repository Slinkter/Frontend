import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { burger_order } from "./burgerSlice";

const BurgerView = () => {
    const burgerBuns = useSelector((state) => state.burger.burgerBuns);
    const dispath = useDispatch();

    return (
        <div>
            <h2>Number of Burger buns - {burgerBuns}</h2>
            <button onClick={() => dispath(burger_order())}>
                Order burger
            </button>
        </div>
    );
};

export default BurgerView;
