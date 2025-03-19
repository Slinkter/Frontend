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

const App = () => {
  return (
    <section className="">
      Taildiwnd project
      <About />
      <Cart />
      <Checkout />
      <Error />
      <HomeLayout />
      <Landing />
      <Login />
      <Login />
      <Orders />
      <Products />
      <Register />
      <SingleProduct />
    </section>
  );
};

export default App;
