import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);
