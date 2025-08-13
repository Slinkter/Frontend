import axios from "axios";
import { setError } from "../slices/uiSlice";

// modelos asycn  await

const urlapi = "https://pokeapi.co/api/v2/pokemon?limit=151";

export const getPokemon = async (dispatch) => {
    try {
        const res = await axios.get(urlapi);
        return res.data.results;
    } catch (err) {
        console.log(err);
        dispatch(setError("Msg Error:  " + err.message + " " + err.name));
    }
};

export const getPokemonDetails = async (pokemon, dispatch) => {
    try {
        const res = await axios.get(pokemon.url);
        return res.data;
    } catch (err) {
        dispatch(
            setError(`Msg Error: no fetching details for ${pokemon.name}`)
        );
        console.log(err);
    }
};
