//> Declaración
function getResult() {
  return "Results";
}
getResult(); //> Results

//> Expresión (a variable)
const getResult = function () {
  return "Results";
};
getResult(); //> Results
//----------------------------------------------------------
// Number es el parámetro de la función
function getDouble(number) {
  return number * 2;
}
// 10 es el argumento de la función
getDobule(10);
//----------------------------------------------------------
//> Parámetros por defecto
function greet(person = "strange") {
  console.log("Hello " + person);
}

greet(); //> Sin parámetro. Hello strange
greet("Alex"); //> Hello Alex
//----------------------------------------------------------
//> Parámetro rest y operador spread
// Sin rest
function add(x, y) {
  return x + y;
}

add(1, 2, 3, 4, 5); //> 3

// Con rest
function add(...args) {
  return args.reduce((previous, current) => previous + current, 0);
}

add(1, 2, 3, 4, 5); //> 15
//----------------------------------------------------------
//> El parámetro rest debe de ser el último
function example(x, y, ...args) {
  console.log(args);
}

example(1, 2, 3, 4, 5); //> [3, 4, 5]

//> Spread también nos permite clonar objetos y arrays de una forma muy simple y expresiva
// OBJETO
const course = {
  title: "JavaScript Definitivo",
  content: "Todo lo que necesitas saber de JavaScript",
};

// Clonado con Object.assign()
const courseCloned1 = Object.assign({}, course);
// Clonado con el spread operator
const courseCloned2 = { ...course };

// ARRAY
const numbers = [1, 2, 3];
// Clonado con slice()
const numbersCloned1 = myArray.slice();
// Clonado con el spread operator
const numbersCloned2 = [...myArray];

//> También podemos usar el operador spread para concatenar arrays:
const numbersA = [1, 2, 3];
const numbersB = [4, 5, 6];

// Con concat
const newArray1 = numbersA.concat(numbersB); //> [1, 2, 3, 4, 5, 6]

// Con spread
const newArray2 = [...numbersA, ...numbersB]; //> [1, 2, 3, 4, 5, 6]
