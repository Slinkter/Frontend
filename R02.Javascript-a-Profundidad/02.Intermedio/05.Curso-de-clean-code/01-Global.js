// variable

var a; // declarando
var b = "b"; // declaramos y asignamos
b = bb; // reasignacion
var a = "aa"; // redeclaracion

//Global Scope

var fruit = "Apple";

function bestFruit() {
  console.log(fruit);
}

bestFruit();

function countries() {
  country = "colombia";
  console.log(country);
}
countries();
console.log(country);
//END - Global Scope
