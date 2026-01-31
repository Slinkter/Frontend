import { ThemeProvider, useTheme } from "./context";

export const ComponentParent = () => {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
};

function Component() {
  const context = useTheme();
  console.log(context);

  return (
    <div>
      <h2>React & Typescript</h2>
      <h2>Context API</h2>
      <button
        className="btn btn-center"
        onClick={() => {
          if (context?.theme === "dark") {
            context.setTheme("system");
            return;
          }
          context?.setTheme("dark");
        }}
      >
        toggle theme
      </button>
    </div>
  );
}
export default Component;
