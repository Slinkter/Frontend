//
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//
import { getPokemonData } from "./api";
import { getPokemonsWithDetails } from "./tools/promise";
// Componentes
import Searcher from "./components/Searcher";
import PokemonList from "./components/PokemonList";
// style
import { Col } from "antd";
import logo from "./statics/logo.svg";
import "./App.css";
//---------->
const App = () => {
    //
    const pokemons = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();
    //
    const fetchPokemons = async () => {
        const pokemonsRes = await getPokemonData(); // Array de pokemonsData
        const pokemonsAll = getPokemonsWithDetails(pokemonsRes); //
        dispatch(pokemonsAll);
    };
    //
    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div className="container">
            <div className="App">
                <Col span={4} offset={10}>
                    <img src={logo} alt="" />
                </Col>
                <Col span={8} offset={8}>
                    <Searcher />
                </Col>

                <Col>
                    <PokemonList pokemons={pokemons} />
                </Col>
            </div>
        </div>
    );
};

export default App;
