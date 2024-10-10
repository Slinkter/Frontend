import "./App.css";
import logo from "../assets/logo.svg";
import { Col, Spin } from "antd";
import { useEffect } from "react";
import { Searcher } from "../components/searcher/searcher.jsx";
import { PokemonList } from "../components/pokemonList/pokemonList.jsx";

//rdux import
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchPokemonWithDetails } from "../slices/dataSlice.js";

function App() {
    const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
    const loading = useSelector((state) => state.ui.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPokemonWithDetails());
    }, []);

    return (
        <div className="App">
            <Col span={4} offset={10}>
                <img src={logo} alt="Pokedex"></img>
            </Col>
            <Col span={8} offset={8}>
                <Searcher />
            </Col>
            {loading ? (
                <Col offset={12}>
                    <Spin spinning size="large" />
                </Col>
            ) : (
                <PokemonList pokemons={pokemons} />
            )}
        </div>
    );
}

export default App;
