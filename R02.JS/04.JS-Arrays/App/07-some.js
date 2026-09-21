/* al menos 1 cumple con la condicion es TRUE sino FALSE */
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.some((number) => number > 3)); // Devuelve true porque al menos uno de los elementos del array es mayor que 3

console.log(numbers.some((number) => number > 5)); // Devuelve false porque todos los elementos del array son menores o iguales que 3

console.log(numbers.some((number) => number > 3, 0));
// Devuelve true porque el primer elemento del array es mayor que 3

numbers.some((number) => number > 5, 0); // Devuelve false porque el primer elemento del array es menor o igual que 3

numbers.some((number) => number % 2 === 0); // Devuelve true porque al menos uno de los elementos del array es un número par

// Devuelve false porque todos los elementos del array son números impares
numbers.some((number) => number % 2 === 0);

// Devuelve true porque al menos uno de los elementos del array es una cadena
numbers.some((number) => typeof number === "string");

// Devuelve false porque todos los elementos del array son números
numbers.some((number) => typeof number === "string");

// Devuelve true porque al menos uno de los elementos del array es igual a 3
numbers.some((number) => number === 3);

// Devuelve false porque ninguno de los elementos del array es igual a 3
numbers.some((number) => number === 4);

/* 
¿Qué es array.some()?

El método array.some() es un método iterativo que devuelve true 
si al menos uno de los elementos de un array satisface 
una condición determinada. 
Devuelve false si todos los elementos del array 
no satisfacen la condición.
*/
const rta2 = numbers.some((item) => item % 2 === 0);
console.log("rta2", rta2);

const orders = [
    {
        customerName: "Nicolas",
        total: 60,
        delivered: true,
    },
    {
        customerName: "Zulema",
        total: 120,
        delivered: false,
    },
    {
        customerName: "Santiago",
        total: 180,
        delivered: true,
    },
    {
        customerName: "Valentina",
        total: 240,
        delivered: true,
    },
    {
        customerName: "Nicolas",
        total: 2322,
        delivered: false,
    },
];

const rta3 = orders.some((item) => item.delivered);
console.log("rta3", rta3);
