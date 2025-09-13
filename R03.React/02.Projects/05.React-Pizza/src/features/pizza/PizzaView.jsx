import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { customer_choice, pizza_order } from "./pizzaSlice";
import { useState } from "react";

const PizzaView = () => {
    const [number, setNumber] = useState(1);

    const pizzaBase = useSelector((state) => state.pizza.pizzaBase);
    const dispath = useDispatch();
    console.log("pizzaBase : ", pizzaBase);

    return (
        <div>
            <h2>Number of Pizza - {pizzaBase}</h2>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button onClick={() => dispath(customer_choice(number))}>
                Customer choise
            </button>
            <button onClick={() => dispath(pizza_order())}>Order Pizza</button>
        </div>
    );
};

export default PizzaView;
