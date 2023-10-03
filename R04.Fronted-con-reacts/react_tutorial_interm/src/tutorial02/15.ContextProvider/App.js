import React from "react";
// Context
import { UserProvider } from "./context/UserContext";
import { MovieProvider } from "./context/MovieContext";
// Components
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";

const App = () => {
    return (
        <UserProvider>
            <MovieProvider>
                <Navbar />
                <MovieList />
            </MovieProvider>
        </UserProvider>
    );
};

export default App;
