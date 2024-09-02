// hoisting variables
console.log("nameOfDog : ", nameOfDog);
var nameOfDog = "elmo";
console.log("nameOfDog : ", nameOfDog);
// hoisting functions
nameofCat();
function nameofCat() {
  console.log("el mejor gato es ", elmo); //ReferenceError: elmo is not defined
}
