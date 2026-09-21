//    (declarar)  ---->  firstName = undefined
var firstName;
//    (asignar)   ---->  firstName = "liam"
firstName = "liam";

var lastName = "cave"; // ----> declaracion y asignacion
lastName = "ana"; //      ----> reasignacion

var secondName = "david"; //----> declaracion y asignacion
var secondName = "ana"; //  ----> reasignacion

/*  */
console.log(firstName);
console.log(lastName);
console.log(secondName);
/* === LET === */
let fruit = "apple"; // ----> declaracion y asignacion
fruit = "kiwi"; //      ----> reasignacion
let fruit = "banana"; //----> No se puede re-declaracion ni reasignacion
console.log(fruit); //  ----> Error Identifier 'fruit' has already been declared
/* === CONST === */
const animal = "dog"; //----> declaracion y asignacion
animal = "cat"; //      ----> No se puede reasignacion
console.log(animal); // ----> Error : TypeError: Assignment to constant variable.

const vehicles = [];
vehicles.push("a");
console.log(vehicles);
vehicles.pop();
console.log(vehicles);
