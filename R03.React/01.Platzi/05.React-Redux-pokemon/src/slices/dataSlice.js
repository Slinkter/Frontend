import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa herramientas de Redux Toolkit.
import { getPokemon, getPokemonDetails } from "../api"; // Importa funciones API que obtienen la lista de pokemons y sus detalles.
import { setError, setLoading } from "./uiSlice"; // Importa una acción del slice de la interfaz de usuario para manejar el estado de carga.

// Estado inicial del slice de datos.
// Inicia con una lista vacía de pokemons
// un filtro de búsqueda vacío.
const initialState = {
    pokemons: [],
    searchFilter: "",
};

/* Slice de datos que maneja las acciones relacionadas con los pokemons. */
/* setPokemons : Acción para establecer la lista de pokemons en el estado. */
/* setSearchFilter : Acción para establecer un filtro de búsqueda. */
/* setFavorite : Acción para marcar o desmarcar un pokemon como favorito. */
export const dataSlice = createSlice({
    name: "data", // Nombre del slice.
    initialState: initialState, // Estado inicial.
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload; // Actualiza la lista de pokemons con los datos recibidos en la acción.
        },
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload; // Actualiza el filtro de búsqueda con el valor de la acción.
        },
        setFavorite: (state, action) => {
            // Encuentra el índice del pokemon correspondiente.
            const index = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
            });

            if (index >= 0) {
                const isFavorite = state.pokemons[index].favorite; // Verifica si el pokemon ya es favorito.
                state.pokemons[index].favorite = !isFavorite; // Cambia el estado de favorito.
            }
        },
    },
});
// Nombre de la acción.
/* 
Acción asíncrona para obtener pokemons con sus detalles. 

`createAsyncThunk` se usa para crear acciones que manejan llamadas asíncronas a APIs. 
*/
export const fetchPokemonWithDetails = createAsyncThunk(
    "data/fetch",
    async (_, { dispatch }) => {
        dispatch(setLoading(true)); // Activa el estado de carga (loading).
        try {
            // Obtiene la lista de pokemons de la API.
            const pokemons = await getPokemon(dispatch);
            console.log(pokemons);
            // Obtiene los detalles de cada pokemon.
            const pokemonsPlus = await Promise.all(
                pokemons.map((pokemon) => getPokemonDetails(pokemon, dispatch))
            );
            console.log(pokemonsPlus);
            // Despacha la acción para guardar los pokemons detallados en el estado.
            dispatch(setPokemons(pokemonsPlus));
        } catch (error) {
            // dispatch(setError("Error fetchhing pokemon data " + error));
            console.log(error);
        } finally {
            dispatch(setLoading(false)); // Desactiva el estado de carga.
        }
    }
);

// Exporta las acciones generadas por el slice.
export const { setPokemons, setSearchFilter, setFavorite } = dataSlice.actions;

// Exporta el reducer generado por el slice para ser usado en el store de Redux.
export default dataSlice.reducer;
