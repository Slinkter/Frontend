import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../Views/Home";
import Detail from "../Views/Detail";
import Error404 from "../Views/Error404";
import Profile from "../Views/Profile";
import LikedEvents from "../Views/Profile/components/LikedEvents";
import MyInfo from "../Views/Profile/components/MyInfo";
import { Suspense } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error404 />,
    },
    {
        path: "/detail/:eventId",
        element: (
            <Suspense fallback={<div> Cargando ... </div>}>
                <Detail />
            </Suspense>
        ),
    },
    {
        path: "/profile",
        element: <Profile />,
        children: [
            {
                path: "my-info",
                element: <MyInfo />,
            },
            {
                path: "liked-events",
                element: <LikedEvents />,
            },
        ],
    },
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;
