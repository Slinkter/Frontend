/* Esta función generadora devuelve 3 valores */
function* gen() {
    yield 1; // Pausa y devuelve 1
    yield 2; // Pausa y devuelve 2
    yield 3; // Pausa y devuelve 3
}

const g = gen(); // Crea un iterador a partir de la función generadora

console.log(g.next().value); // Imprime 1
console.log(g.next().value); // Imprime 2
console.log(g.next().value); // Imprime 3

/* Esta función generadora itera sobre un array y devuelve cada valor */
function* iterable(array) {
    for (let value of array) {
        yield value; // Pausa y devuelve el valor actual del array
    }
}

// Crea un iterador a partir del array
const it = iterable(["oscar", "omar", "ana", "lucia", "juan"]);
console.log(it.next().value); // Imprime "oscar"
