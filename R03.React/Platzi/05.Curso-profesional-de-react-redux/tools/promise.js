import { getPokemonDetail } from "../api";
import { SET_POKEMONS } from "./types";
//
const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});
// funcion de orden superior
const getPokemonsWithDetails = (pokemons) => async (dispatch) => {
  //
  const pokemonDetailed = await Promise.all(
    pokemons.map((pokemon) => getPokemonDetail(pokemon))
  );
  // actualizar es el state de store redux
  const updateState = setPokemons(pokemonDetailed);
  console.log("updateState : ", updateState);
  dispatch(updateState);
};

export { setPokemons };
export { getPokemonsWithDetails };
