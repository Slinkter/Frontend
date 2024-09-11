import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
    pokemons: [],
    searchFilter: "",
};

/* createSlice y createAsyncThunk son funciones de la librería Redux Toolkit 
que nos ayudan a crear slices y acciones asíncronas de manera más sencilla. */

export const fetchPokemonWithDetails = createAsyncThunk(
    "data/fetch",
    async (_, { dispatch }) => {
        dispatch(setLoading(true));
        const pokemonsRes = await getPokemon();
        const pokemonDetailed = await Promise.all(
            pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
        );
        dispatch(setPokemons(pokemonDetailed));
        dispatch(setLoading(false));
    }
);

export const dataSliece = createSlice({
    name: "data",
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setFavorite: (state, action) => {
            const currentPokeemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
            });

            if (currentPokeemonIndex >= 0) {
                const isFavorite =
                    state.pokemons[currentPokeemonIndex].favorite;
                state.pokemons[currentPokeemonIndex].favorite = !isFavorite;
            }
        },
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload;
        },
    },
});

export const { setPokemons, setFavorite, setSearchFilter } = dataSliece.actions;

export default dataSliece.reducer;
