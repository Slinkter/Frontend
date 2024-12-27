import React from "react";
import logOut from "../functions/logout";
import Navbar from "../Components/Navbar";
import PendienteForm from "../Components/PendienteForm";

const Home = ({ user }) => {
    console.log(user);

    return (
        <div className="w-screen h-screen flex flex-col  items-center bg-red-200">
            <Navbar user={user} />
            <h1 className="text-3xl mb-2"> Home</h1>
            <PendienteForm />
        </div>
    );
};

export default Home;
