import React from "react";
import { ThemeProviderUser } from "./context/ContextUser";
import { ThemeProviderMovie } from "./context/ContextMovie";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";

const App = () => {
  return (
    <ThemeProviderUser>
      <ThemeProviderMovie>
        <Navbar />
        <Movies />
      </ThemeProviderMovie>
    </ThemeProviderUser>
  );
};

export default App;
