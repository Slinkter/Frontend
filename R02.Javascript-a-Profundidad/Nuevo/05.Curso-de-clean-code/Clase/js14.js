//  son distinto terminos segun el estado de la funcion
// Parametros : se utiliza dentro de la funcion.
// Argumentos : se utiliza en la llamada de la funcion

// number es parametro
// parametro por defecto
function getDouble(number, person = "strange") {
  return console.log(number * 2, person);
}

//  el 10 es el argumento (valores)
//  maximo 3 argumentos
getDouble(10);
getDouble(20, "juan");

// sin Spread operator
const add = (x, y) => {
  return console.log(x + y);
};
add(1, 2, 3, 4, 5);

// con Spread operator
const add2 = (...arg) => {
  console.log(arg.reduce((acc, current) => acc + current, 0));
};
add2(1, 2, 3, 4, 5);
/* Objectos y Array */
const course = {
  title: "Js Definitivo",
  content: "todo lo que necesitas saber",
};
// metodo 1
const courseCloned = Object.assign({}, course);
// metodo 2
const courseSpreadCloned = { ...course };

const alphabet = [1, 2, 3, 4, 5];
const alphabetCloned = alphabet.slice();
const alphabetSpreadCloned = [...alphabet];

const numbersA = [1, 2, 3];
const numbersB = [4, 5, 6];
const joinNumbers = [...numbersA, ...numbersB];
