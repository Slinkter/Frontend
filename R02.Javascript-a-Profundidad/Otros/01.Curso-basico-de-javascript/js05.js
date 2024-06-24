// Funcion Declativa
function miFuncion(a, b) {
  return a + b;
}
// --> tiene nombre la funcion
// --> usa palabra reservada "function" para ser creada
// --> le afecta el hoisting es decir:
// --> son evaluada antes de ser ejecutadas.

//Funcion Expresion

var miFunction = function (a, b) {
  return a + b;
};
// --> es una funcion anonima (no tiene nombre)
// --> necesita de la expresion "=" para ser creada
// --> no le afecta el hoisting

// Ejemplo
function saludarEstudiantes(estudiante) {
  console.log(`hola ${estudiante}`);
}

function sumar(a, b) {
  var resultado = a + b;
  return resultado;
}
