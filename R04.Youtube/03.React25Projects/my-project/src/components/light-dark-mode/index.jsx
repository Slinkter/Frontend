import useLocalStorage from "./useLocalStorate";
import "./style.css";

const LigthDarkMode = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="light-dark-mode" data-theme={theme}>
      <div className="container">
        <p> Hello world! </p>
        <button onClick={handleToggleTheme}> Change Theme</button>
      </div>
    </div>
  );
};

export default LigthDarkMode;
