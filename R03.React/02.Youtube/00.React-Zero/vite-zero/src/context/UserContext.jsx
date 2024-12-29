import React from "react";
import { useState } from "react";
import { initialUser } from "../data/db_user";

const UserContext = React.createContext(); //div

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialUser);

    async function logOut() {
        setUser(null);
    }
    async function logIn() {
        setUser(initialUser);
    }
    function toogleFavMoviesUser(idMovie) {
        const isFavorite = user.favoriteMovies.includes(idMovie);
        const newFavoriteMovies = isFavorite
            ? []
            : [...user.favoriteMovies, idMovie];

        const newUser = { ...user, newFavoriteMovies };
        setUser(newUser);
    }

    const props = { user, setUser, logOut, logIn, toogleFavMoviesUser }; // variables estados y/o funciones
    return (
        <UserContext.Provider value={props}>{children}</UserContext.Provider>
    );
};

export default UserContext;
export { UserProvider };
