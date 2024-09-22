import React, { createContext } from "react";
import initialMovies from "../db/initialMovies";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const props = { movies: initialMovies };

    return (
        <MovieContext.Provider value={props}>{children}</MovieContext.Provider>
    );
};
export { MovieProvider };
export default MovieContext;
