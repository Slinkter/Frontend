import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../Page/HomePage";
import ErrorPage from "../Page/ErrorPage";
import AuthLayout, { AuthRoute } from "../Layout/AuthLayout";
import ProfilePage from "../Page/ProfilePage";
import LoginPage from "../Page/LoginPage";
import BlogPost from "../Page/BlogPost";
import LogoutPage from "../Page/LogoutPage";
import BlogPage from "../Page/BlogPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/blog",
                element: <BlogPage />,
                children: [
                    {
                        path: ":slug",
                        element: <BlogPost />,
                    },
                ],
            },
            {
                path: "/profile",
                element: (
                    <AuthRoute>
                        <ProfilePage />
                    </AuthRoute>
                ),
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
