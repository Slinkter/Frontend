import React from "react";

const Home = React.lazy(() => import("./Home"));
const Lorem = React.lazy(() => import("./Lorem"));

const Class12 = () => {
    return (
        <React.Suspense fallback={<h1> Loading... </h1>}>
            <Home />
            <Lorem />
        </React.Suspense>
    );
};

export default Class12;
