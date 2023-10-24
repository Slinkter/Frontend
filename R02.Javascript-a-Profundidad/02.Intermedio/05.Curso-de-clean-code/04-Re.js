var firstName; // valor : undefined
firstName = "liam";
console.log(firstName);

var lastName = "cave"; //declaracion y asginacion
lastName = "ana"; // reasignacion
console.log(lastName);

var secondName = "david"; //declaracion y asginacion
var secondName = "ana"; // reasignacion
console.log(secondName);

let fruit = "apple"; //declaracion y asginacion
fruit = "kiwi"; // reasignacion
//let fruit = "banana"; // no se puede declaracion con let
console.log(fruit); // error Identifier 'fruit' has already been declared

const animal = "dog"; //declaracion y asginacion
animal = "cat"; // no se puede declaracion con const
console.log(animal); // error : TypeError: Assignment to constant variable.

const vehicles = [];
vehicles.push("a");
console.log(vehicles);
vehicles.pop();
console.log(vehicles);
