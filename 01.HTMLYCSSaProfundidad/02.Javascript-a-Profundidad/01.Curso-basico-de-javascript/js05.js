//Declativa
// -- tiene nombre la funcion
// -- usa palabra reservada function para ser creada
// -- le afecta el hoisting
// -- son evaluada antes de ser ejecutadas.
function miFuncion(a, b) {
  return a + b;
}

//Expresion
// -- es una funcion anonima (no tiene nombre)
// -- necesita de la expresion = para ser creada
// -- no le afecta el hoisting , 

var miFunction = function (a, b) {
  return a + b;
};

miFuncion();

// Ejemplo
function saludarEstudiantes(estudiante) {
  console.log(`hola ${estudiante}`);
}

function sumar(a, b) {
  var resultado = a + b;
  return resultado;
}
