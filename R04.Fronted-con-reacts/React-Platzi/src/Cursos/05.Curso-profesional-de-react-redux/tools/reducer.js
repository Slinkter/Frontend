import { SET_POKEMONS } from "./types";

const pokemonsReducer = (state, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return { ...state, pokemons: action.payload };
    default:
      return state;
  }
};

export { pokemonsReducer };
