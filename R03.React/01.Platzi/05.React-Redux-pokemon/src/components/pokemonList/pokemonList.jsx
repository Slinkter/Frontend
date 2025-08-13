import "./pokemonList.css";
import { PokemonCard } from "../pokemonCard/pokemonCard";
import { useSelector } from "react-redux";

const PokemonList = ({ pokemons }) => {
    const searchFilter = useSelector((state) => state.data.searchFilter);

    const renderPokemons = pokemons
        .filter((pokemon) => {
            return pokemon.name.trim().toLowerCase().includes(searchFilter);
        })
        .map((pokemon) => {
            return (
                <PokemonCard
                    name={pokemon.name}
                    image={pokemon.sprites.front_default}
                    types={pokemon.types}
                    key={pokemon.name}
                    id={pokemon.id}
                    favorite={pokemon.favorite}
                />
            );
        });

    return <div className="PokemonList">{renderPokemons()}</div>;
};

export { PokemonList };
