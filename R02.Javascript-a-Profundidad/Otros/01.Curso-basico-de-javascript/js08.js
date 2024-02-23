/*
Definicion SCOPE:
  - Global
  - Functions
  - Block
  - Code
*/

// --> Scope global
var nombre = "luis";

function fun() {
  // --> Scope local
  var apellido = "cave";
  var rpta = nombre + " " + apellido;
  console.log(rpta);
  return rpta;
}

console.log(nombre);
