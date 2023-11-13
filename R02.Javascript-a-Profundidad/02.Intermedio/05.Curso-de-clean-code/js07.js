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

/* -------Ambito Global------- */
let greeting = "Hello World";
function getGreet() {
  console.log(greeting);
}
getGreet();
/* -------Ambito Local------- */
function getSaludo() {
  let saludos = "Hello World";
  console.log("saludos desde la  funcion : ", saludos);
}
getSaludo();
console.log(saludos); // error : ReferenceError
/* -------Ambito Bloque------- */
{
  let getGreetingSaludos = "hello world";
  var lang = "English";
  console.log(getGreetingSaludos);
  console.log(lang);
}
// console.log(getGreetingSaludos);
console.log(lang);
