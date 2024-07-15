import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./Layout/PageLayout";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <PageLayout>
                <Routes>
                    <Route />
                    <Route />
                    <Route />
                </Routes>
            </PageLayout>
            <Button colorScheme="teal" size="sm" variant="outline">
                Button
            </Button>
        </>
    );
}

export default App;
