import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const styles = {
    global: (props) => ({
        body: {
            bg: mode("white", "gray.900")(props),
            color: mode("gray.800", "whiteAlpha.900")(props),
            fontFamily: "console",
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
