// variable
var a; //--> declaracion
var b = "b"; //--> declaracion y asignacion
var a = "aa"; //--> redeclaracion(esta mal?)
b = "bb"; //--> reasignacion
//Global scope

var fruit = "Apple";
function bestFruit() {
  console.log(fruit);
}
bestFruit();

function countries() {
  country = "Londres"; // creacion de scope global
  console.log(country);
}
countries();
console.log(country);
