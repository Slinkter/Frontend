import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
];

export const router = createBrowserRouter(routes);
