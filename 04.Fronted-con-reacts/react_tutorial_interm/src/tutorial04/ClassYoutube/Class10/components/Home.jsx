import React, { useContext } from "react";
import { ComponetContext } from "../GlobalContex";

const Home = () => {
    const { name } = useContext(ComponetContext);
    return (
        <div>
            <h1> your name is {name}</h1>
        </div>
    );
};

export default Home;
