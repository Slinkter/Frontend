import { useState } from "react";
import { createContext } from "react";
//
import initialUser from "../db/initialUser";

const UserContext = createContext();

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
    const isFavorite = user.favoriteMovies.includes(movieId);
    // true  , quitarlo by id
    // false , agregarlo by id
    // se crear un array
    const favoriteMovies = isFavorite
      ? [...user.favoriteMovies.filter((id) => id !== movieId)]
      : [...user.favoriteMovies, movieId];
    // actualizar el estado de user
    const newStateuser = { ...user, favoriteMovies };
    setUser(newStateuser);
  };
  //

  return (
    <UserContext.Provider
      value={(user, login, logout, toogleFavoriteMovieToUser)}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
