/**
 * @file A presentational component that displays an error message.
 * @description This component is responsible for informing the user that an error has occurred,
 * for instance, during the process of fetching the TODO items from `localStorage`.
 * It is a simple, "dumb" component with no internal logic, purely for UI representation of the error state.
 */

import React from "react";

/**
 * A component that displays a generic error message.
 *
 * @returns {JSX.Element} A `<p>` element containing the error text.
 */
function TodosError() {
    return <p>Desespérate, hubo un error...</p>;
}

export { TodosError };