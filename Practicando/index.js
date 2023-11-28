let fruits = ["Apple", "Banana", "Orange"];
let [a, b, c] = fruits;
console.log(a, b, c);
// Object
let user = { username: "Ferney", age: 34, country: "PE" };
const { username: x } = user;
console.log(x);

let country = "CO";
let person = { name: "Ferney", age: 28 };
person = { ...person, country, id: 20 };
console.log(person);

let othernum = 6;
let numeros = [1, 2, 4, 5];
numeros = [...numeros, othernum];
console.log(numeros);
