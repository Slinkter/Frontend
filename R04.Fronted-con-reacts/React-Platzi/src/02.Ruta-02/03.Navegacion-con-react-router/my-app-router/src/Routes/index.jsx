import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../Page/HomePage";
import ErrorPage from "../Page/ErrorPage";
import AuthLayout from "../Layout/AuthLayout";
import ProfilePage from "../Page/ProfilePage";
import LoginPage from "../Page/LoginPage";
import BlogPost from "../Page/BlogPost";
import LogoutPage from "../Page/LogoutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                children: [
                    {
                        path: "blogpost",
                        element: <BlogPost />,
                    },
                ],
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/logout",
                element: <LogoutPage />,
            },
        ],
    },
]);

const MyRouter = () => <RouterProvider router={router} />;
export default MyRouter;
