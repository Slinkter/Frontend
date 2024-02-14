import { BrowserRouter, useRoutes } from "react-router-dom";
import React from "react";
import Home from "../Components/Home";
import MyAccont from "../Components/MyAccont";
import MyOrder from "../Components/MyOrder";
import MyOrders from "../Components/MyOrders";
import SingIn from "../Components/SingIn";
import NotFound from "../Components/NotFound";

const AppRoutes = () => {
  let router = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/my-account", element: <MyAccont /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/sing-ing", element: <SingIn /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return router;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
