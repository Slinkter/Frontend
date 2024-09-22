import { useState } from "react";
import { createContext } from "react";
//
import initialUser from "../db/initialUser";
//
const UserContext = createContext();
//
const UserProvider = ({ children }) => {
    // Hook
    const [user, setUser] = useState(initialUser);
    // f1
    const login = () => {
        setUser(initialUser);
    };
    // f2
    const logout = () => {
        setUser(null);
    };
    // f3
    const toogleFavoriteMovieToUser = (movieId) => {
        // boolean
        // true  , quitarlo by id
        // false , agregarlo by id
        const isFavorite = user.favoriteMovies.includes(movieId);
        // Devolver array
        const favoriteMovies = isFavorite
            ? [...user.favoriteMovies.filter((id) => id !== movieId)]
            : [...user.favoriteMovies, movieId];
        // actualizar el estado de user
        const newUser = { ...user, favoriteMovies };
        setUser(newUser);
    };
    //
    const props = { user, login, logout, toogleFavoriteMovieToUser };
    return (
        <UserContext.Provider value={props}>{children}</UserContext.Provider>
    );
};

export { UserProvider };
export default UserContext;
