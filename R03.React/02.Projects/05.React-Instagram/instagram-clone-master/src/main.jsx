import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import App from "./App.jsx";
import "./index.css";

const styles = {
    global: (props) => ({
        body: {
            bg: mode("gray.100", "#000")(props),
            color: mode("gray.800", "whiteAlpha.900")(props),
        },
    }),
};

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};


const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </BrowserRouter>
);
