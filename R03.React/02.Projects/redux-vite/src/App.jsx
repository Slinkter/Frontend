import React from "react";
import BurgerView from "./features/burger/BurgerView";
import PizzaView from "./features/pizza/PizzaView";
import { useSelector } from "react-redux";
import ProductView from "./features/products/ProductView";

const App = () => {
    const state = useSelector((state) => state);
    console.log("state : ", state);

    return (
        <div>
            <PizzaView />
            <BurgerView />
            <ProductView />
        </div>
    );
};

export default App;
