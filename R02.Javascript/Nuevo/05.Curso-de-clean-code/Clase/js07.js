/* 
Ambitos de las variables 
Ambitos = Scope

- Ambito Global
    * puede ser accesde desde cualquier lugar
- Ambito Local/funcion
    * 
- Ambito Bloque
    * funciona y trabaja dentro de llaves "{ }" 
    * se recomeinda solo usar let y const 
    * excepcion : var trabaja de manera global rompiendo el ambito
*/

/* -------Ámbito global------- */
//
let greeting = "Hello World";
function greet() {
  console.log(greeting);
}
greet(); //----> Hello world
//
/* -------Ámbito local o de función------- */
//>
function greet() {
  let greeting = "Hello World";
  console.log(greeting);
}
greet(); //----> Hello world
console.log(greeting); //> Variable no definida
//
/* -------Ámbito de bloque------- */
//>
{
  let greeting = "Hello World";
  var lang = "English";
  console.log(greeting);
}
console.log(lang); //> English
console.log(greeting); //> Uncaught ReferenceError: greeting is not defined
/* -------Ámbito estático o dinámico------- */
//>
const age = 28;
function printAge() {
  console.log(age);
}
function mainApp() {
  const age = 26;
  printAge();
}
mainApp(); //> 28
