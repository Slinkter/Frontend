import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import ErrorElement from "./components/ErrorElement";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <h1>error</h1>,
    children: [
      {
        index: true,
        element: <div>HOME PAGE</div>,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <div>products</div>,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorElement />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorElement />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
