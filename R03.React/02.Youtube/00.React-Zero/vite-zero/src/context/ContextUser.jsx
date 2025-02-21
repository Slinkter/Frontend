import { createContext, useState } from "react";
import { db_user } from "../db/user";

const ThemeContextUser = createContext();

const ThemeProviderUser = ({ children }) => {
  const [user, setUser] = useState(db_user);

  const logIn = () => {
    setUser(db_user);
  };
  const logOut = () => {
    setUser(null);
  };

  const btnFav = (id) => {
    const isOnList = user.favoriteMovies.includes(id);
    if (isOnList) {
      user.favoriteMovies = user.favoriteMovies.filter((idFav) => idFav !== id);
    } else {
      user.favoriteMovies.push(id);
    }
    setUser({ ...user });
  };

  const props = { user, logIn, logOut, btnFav };

  return (
    <ThemeContextUser.Provider value={props}>
      {children}
    </ThemeContextUser.Provider>
  );
};

export { ThemeProviderUser, ThemeContextUser };
