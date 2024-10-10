import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa herramientas de Redux Toolkit.
import { getPokemon, getPokemonDetails } from "../api"; // Importa funciones API que obtienen la lista de pokemons y sus detalles.
import { setLoading } from "./uiSlice"; // Importa una acción del slice de la interfaz de usuario para manejar el estado de carga.

// Estado inicial del slice de datos. Inicia con una lista vacía de pokemons y un filtro de búsqueda vacío.
const initialState = {
    pokemons: [],
    searchFilter: "",
};

/* Acción asíncrona para obtener pokemons con sus detalles. 
`createAsyncThunk` se usa para crear acciones que manejan llamadas asíncronas a APIs. */
export const fetchPokemonWithDetails = createAsyncThunk(
    "data/fetch", // Nombre de la acción.
    async (_, { dispatch }) => {
        dispatch(setLoading(true)); // Activa el estado de carga (loading).
        const pokemonsRes = await getPokemon(); // Obtiene la lista de pokemons de la API.
        const pokemonDetailed = await Promise.all(
            pokemonsRes.map((pokemon) => getPokemonDetails(pokemon)) // Obtiene los detalles de cada pokemon.
        );
        dispatch(setPokemons(pokemonDetailed)); // Despacha la acción para guardar los pokemons detallados en el estado.
        dispatch(setLoading(false)); // Desactiva el estado de carga.
    }
);

/* Slice de datos que maneja las acciones relacionadas con los pokemons. */
export const dataSlice = createSlice({
    name: "data", // Nombre del slice.
    initialState, // Estado inicial.
    reducers: {
        /* Acción para establecer la lista de pokemons en el estado. */
        setPokemons: (state, action) => {
            state.pokemons = action.payload; // Actualiza la lista de pokemons con los datos recibidos en la acción.
        },
        /* Acción para marcar o desmarcar un pokemon como favorito. */
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId; // Encuentra el índice del pokemon correspondiente.
            });

            if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite; // Verifica si el pokemon ya es favorito.
                state.pokemons[currentPokemonIndex].favorite = !isFavorite; // Cambia el estado de favorito.
            }
        },
        /* Acción para establecer un filtro de búsqueda. */
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload; // Actualiza el filtro de búsqueda con el valor de la acción.
        },
    },
});

// Exporta las acciones generadas por el slice.
export const { setPokemons, setFavorite, setSearchFilter } = dataSlice.actions;

// Exporta el reducer generado por el slice para ser usado en el store de Redux.
export default dataSlice.reducer;
