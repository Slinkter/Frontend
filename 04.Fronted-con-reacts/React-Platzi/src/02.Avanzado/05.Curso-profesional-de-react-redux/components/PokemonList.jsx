import React from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

function PokemonList(props) {
  //console.log("props : ", props);
  const { pokemons } = props;
  return (
    <div className="PokemonList">
      {pokemons.map((pokemon) => {
        return (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            url_img={pokemon.sprites.front_default}
          />
        );
      })}
    </div>
  );
}

export default PokemonList;
