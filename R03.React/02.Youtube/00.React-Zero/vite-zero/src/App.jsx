import React from "react";
import About from "./components/About";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Error from "./components/Error";
import HomeLayout from "./components/HomeLayout";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Register from "./components/Register";
import SingleProduct from "./components/SingleProduct";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cheackout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/register", element: <Register />, errorElement: <Error /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
