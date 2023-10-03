import React from "react";
import { useState } from "react";

const errormsj = "";

const ErrorApp = () => {
    const [error, setError] = useState(errormsj);

    return (
        <div>
            <button onClick={() => setError("error a conectar a la api")}>
                Error 1
            </button>
            <button onClick={() => setError("error de credenciales ")}>
                Error 2
            </button>
            <button onClick={() => setError("")}>Not Error</button>

            {error && <h1> {error} </h1>}
        </div>
    );
};

export default ErrorApp;
