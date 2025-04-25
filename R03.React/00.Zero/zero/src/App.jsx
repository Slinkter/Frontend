import React from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Home</div>,
            errorElement: <div>Error0</div>,
            children: [
                {
                    index: true,
                    element: <div>Home</div>,
                    errorElement: <div>Error1</div>,
                },
            ],
        },
        {
            path: "/register",
            element: <Register />,
            errorElement: <div>Error2</div>,
        },
        {
            path: "login",
            element: <Login />,
            errorElement: <div>Error3</div>,
        },
    ]);
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
