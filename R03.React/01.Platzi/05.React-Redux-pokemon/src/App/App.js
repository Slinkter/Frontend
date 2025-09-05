import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Col, Spin, Row, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Searcher } from "../components/searcher/searcher.jsx";
import { PokemonList } from "../components/pokemonList/pokemonList.jsx";

import { fetchPokemonWithDetails } from "../slices/dataSlice.js";
import logo from "../assets/logo.svg";
import "./App.css";

function App() {
    // init
    const loading = useSelector((state) => state.ui.loading);
    const error = useSelector((state) => state.ui.error);
    const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
    const dispatch = useDispatch();
    const { Header, Footer, Content } = Layout;

    useEffect(() => {
        dispatch(fetchPokemonWithDetails());
    }, [dispatch]);

    return (
        <Layout className="layout">
            <Header>
                <Row justify="center" align="middle">
                    <Col>
                        <img src={logo} alt="Pokedex" height={80} />
                    </Col>
                    <Col offset={2}>
                        <Searcher />
                    </Col>
                </Row>
            </Header>
            <Content className="content">
                <Row
                    justify="center"
                    align="middle"
                    style={{ minHeight: "60vh" }}
                >
                    {loading ? (
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{ fontSize: 48, color: "#1890ff" }} // Azul principal
                                    spin
                                />
                            }
                        />
                    ) : (
                        <PokemonList pokemons={pokemons} />
                    )}
                </Row>
            </Content>
            <Footer className="footer">
                {error && <p className="error-message">{error}</p>}
            </Footer>
        </Layout>
    );
}

export default App;
