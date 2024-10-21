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
        customerName: "Vale",
        total: 240,
        delivered: true,
    },
];

console.log("original", orders);

// el map es inmutable porque no modifica el array original
// crear un nuevo array y tiene el mismo tamaño de elementos
const rta = orders.map((item) => item.total);
console.log("rta", rta);
/* error si queremos agregar un campo mas con  return pues modifica el array original */
const rta2 = orders.map((item) => {
    item.tax = 0.19; // se añade tax , esto modifica el array original , copia en memoria
    return item;
});
console.log("rta2", rta2);
console.log("original", orders);
// para agregar se usa spred operator
const rta3 = orders.map((item) => {
    return {
        ...item,
        tax: 0.19,
    };
});
console.log("rta3", rta3);
console.log("original", orders);

/* Ejercicios */

array = [
    {
        name: "Product 1",
        price: 1000,
        stock: 10,
    },
    {
        name: "Product 2",
        price: 2000,
        stock: 20,
    },
];

console.log(array);
const arraypost = array.map((item) => {
    return {
        ...item,
        taxes: Math.trunc(item.price * 0.19),
    };
});

console.log(arraypost);
