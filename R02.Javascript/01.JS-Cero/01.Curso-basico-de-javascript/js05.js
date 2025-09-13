// Funcion Declativa
// --> tiene nombre la funcion
// --> usa palabra reservada "function" para ser creada
// --> le afecta el hoisting es decir:
// --> son evaluada antes de ser ejecutadas.
function miFuncion(a, b) {
    return a + b;
}

//Funcion Expresion/anonima
// --> es una funcion que no tiene nombre
// --> necesita de la expresion "=" para ser creada
// --> no le afecta el hoisting

var miFunction = function (a, b) {
    return a + b;
};

// Ejemplo
function saludarEstudiantes(estudiante) {
    console.log(`hola ${estudiante}`);
}

function sumar(a, b) {
    var resultado = a + b;
    return resultado;
}
