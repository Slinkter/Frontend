import { BrowserRouter, Routes, Route } from "react-router-dom";
// layout = container de paginas
import Layout from "../components/Layout";
// Pages
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Player from "../containers/Player";
import NotFound from "../containers/NotFound";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/player/:id" element={<Player />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
