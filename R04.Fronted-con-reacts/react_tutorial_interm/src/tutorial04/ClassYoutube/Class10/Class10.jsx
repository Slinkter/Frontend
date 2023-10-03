import React, { useState } from "react";
import { ComponetContext } from "./GlobalContex";
import Home from "./components/Home";
import Profile from "./components/Profile";

const Class10 = () => {
    // hooks-main
    const [name, setName] = useState("Jhonny");
    const values = { name, setName };
    // -->{ name, setName }
    return (
        <div className="container">
            <ComponetContext.Provider value={values}>
                <Home />
                <Profile />
            </ComponetContext.Provider>
        </div>
    );
};

export default Class10;
