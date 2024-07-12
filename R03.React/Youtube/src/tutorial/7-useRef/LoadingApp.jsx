import React, { useState } from "react";
import Card from "./Loading/Card";

const LoadingApp = () => {
    const [showBtn, setShowBtn] = useState(true);
    return (
        <div>
            <button onClick={() => setShowBtn(!showBtn)}>Show Button</button>
            {showBtn && <Card />}
        </div>
    );
};

export default LoadingApp;
