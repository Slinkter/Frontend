import React from "react";
import { useGlobalContext } from "./context";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

const App = () => {
  const { loading } = useGlobalContext();

  console.log(loading);

  if (loading) {
    return (
      <main>
        <div className="loading"></div>
      </main>
    );
  }

  return (
    <main>
      App
      <Navbar />
      <Cart />
    </main>
  );
};

export default App;
