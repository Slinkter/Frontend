import React from "react";
import { useState } from "react";
import loginUser from "../functions/loginUser";
import registerUser from "../functions/registerUser";
import loginWithGoogle from "../functions/loginGoogle";

const Login = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (isLoggingIn) {
            await loginUser(email, password);
        } else {
            await registerUser(email, password);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold">
                    {isLoggingIn ? "Iniciar sesión" : "Registrarse"}
                </h1>
                <form className="flex flex-col" onSubmit={submitHandler}>
                    <label>Username</label>
                    <input
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        type="text"
                    />
                    <label>Password</label>
                    <input
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        type="password"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                        type="submit"
                    >
                        {isLoggingIn ? "Acceder" : "Registrar"}
                    </button>
                </form>

                <button
                    className="block bg-green-500 text-white"
                    onClick={loginWithGoogle}
                >
                    Acceder con Google
                </button>
                <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
                    {isLoggingIn
                        ? "¿No tienes cuenta? Crear una"
                        : "¿Ya tienes cuenta? Acceder"}
                </button>
            </div>
        </div>
    );
};

export default Login;
