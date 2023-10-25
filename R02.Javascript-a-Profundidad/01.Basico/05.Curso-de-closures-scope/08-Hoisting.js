// https://platzi.com/new-home/clases/3213-javascript-closures-scope/50368-que-es-el-hoisting/
// hoisting  = elevancion

console.log(nameOfDog);
var nameOfDog = "elmo";
console.log(nameOfDog);

nameofCat();
function nameofCat() {
  console.log("el mejor gato es ", elmo); //ReferenceError: elmo is not defined
}
// var elmo; elmo is not defined
