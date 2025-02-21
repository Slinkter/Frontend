import { createContext } from "react";
import { db_movies } from "../db/movies";

const ThemeContextMovie = createContext();
const ThemeProviderMovie = ({ children }) => {
  const props = { movies: db_movies };

  return (
    <ThemeContextMovie.Provider value={props}>
      {children}
    </ThemeContextMovie.Provider>
  );
};

export { ThemeProviderMovie, ThemeContextMovie };
