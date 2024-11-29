import { createSlice } from "@reduxjs/toolkit"; // Importa `createSlice` de Redux Toolkit.

// Estado inicial del slice de UI. Solo tiene una propiedad para manejar el estado de carga (loading).
const initialState = {
    loading: false,
    error: null,
};

// Slice para manejar el estado de la interfaz de usuario (UI).
export const uiSlice = createSlice({
    name: "ui", // Nombre del slice.
    initialState, // Estado inicial.
    reducers: {
        /* Acción para establecer el estado de carga (loading). */
        setLoading: (state, action) => {
            state.loading = action.payload; // Actualiza el estado de `loading` con el valor recibido en la acción.
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Exporta la acción `setLoading`.
export const { setLoading, setError } = uiSlice.actions;

// Exporta el reducer generado por el slice para ser usado en el store de Redux.
export default uiSlice.reducer;
