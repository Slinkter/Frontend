import React, { createContext } from "react";
import initialMovies from "../db/initialMovies";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const db_movies = { movies: initialMovies };
    return (
        <MovieContext.Provider value={db_movies}>
            {children}
        </MovieContext.Provider>
    );
};
export { MovieProvider };
export default MovieContext;
