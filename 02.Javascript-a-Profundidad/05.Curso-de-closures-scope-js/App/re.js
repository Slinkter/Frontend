var firstName;
console.log(firstName);
firstName = "oscar"; // defined
console.log(firstName);

/* var vs let vs cosnt*/
// -->
var lastName = "david"; // declarar /asignar
lastName = "Ana"; // reasignar
console.log(lastName);
var secondName = "david"; // declarar y asignar
var secondName = "Ana"; // reasignar
console.log(secondName);

// ---> let
let fruit = "Apple";
fruit = "kiwi";
console.log(fruit);
let fruit = "Banana";
fruit = "kiwi";
console.log(fruit);

// ---> const
const animal = "dog";
animal = "cat";
const animal = "cat";
console.log(animal);
