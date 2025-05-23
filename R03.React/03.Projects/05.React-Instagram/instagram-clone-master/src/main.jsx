import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const styles = {
    global: (props) => ({
        body: {
            bg: mode("gray.100", "#000")(props),
            color: mode("gray.800", "whiteAlpha.900")(props),
        },
    }),
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </BrowserRouter>
);
