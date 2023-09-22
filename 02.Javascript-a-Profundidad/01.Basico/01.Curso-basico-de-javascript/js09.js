/*
Hoising
el hoising es un ayuda para detectar  error de codigo o taipo
es cuando las varialbes y funciones se declaran antes de ser procesadas 
es decir cuando se corre el archivo js hace un scaneo y se inicializa con undeling sino tiene valor.

*/

// javascript piensa q es una variable y
//la variables que no son declaradado o no tiene valor son declarado  undefined (x = "undefined")
console.log(miNombre); // variable no declarado ni asignado
var miNombre; // variable declaro
miNombre = "Liam"; // variable asignado
console.log(miNombre); // valor visible

// funcion hoisting
hey();
function hey() {
  console.log("hola", nombre);
}
var nombre = "liam";
