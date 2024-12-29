import React from "react";
import { useEffect, useState } from "react";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div
            className={`container-1 ${
                isLoading ? "bg-gray-800" : "bg-slate-500"
            }`}
        >
            {isLoading ? <div>Loading ...</div> : <div>Terminado</div>}
        </div>
    );
};

export default App;
