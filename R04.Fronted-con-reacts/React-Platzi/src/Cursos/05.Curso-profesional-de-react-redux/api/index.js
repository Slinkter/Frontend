import axios from "axios";
//
const url = "https://pokeapi.co/api/v2/pokemon?limit=5";
//
const getPokemonData = () => {
  const data = axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => console.log(err));
  return data;
};

const getPokemonDetail = (pokemon) => {
  const data = axios
    .get(pokemon.url)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return data;
};

export { getPokemonData };
export { getPokemonDetail };
