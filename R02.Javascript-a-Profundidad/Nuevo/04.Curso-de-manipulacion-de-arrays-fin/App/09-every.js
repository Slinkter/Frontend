/* 
¿Qué es array.every()?

es un método que devuelve true si todos los elementos de un array satisfacen 
una condición determinada. 
Devuelve false si al menos uno de los elementos del array 
no satisface la condición.
*/
const numbers = [1, 30, 39, 29, 10, 13];
let rta = true;
// demostracion
for (let index = 0; index < numbers.length; index++) {
  const element = numbers[index];
  if (element >= 40) {
    rta = false;
  }
}
console.log("for : ", rta);
// Aplicacion
const rta2 = numbers.every((item) => item <= 40);
console.log("rta2 : ", rta2);
/* 3 */
const team = [
  {
    name: "Nicolas",
    age: 12,
  },
  {
    name: "Andrea",
    age: 8,
  },
  {
    name: "Zulema",
    age: 12,
  },
  {
    name: "Santiago",
    age: 14,
  },
];

const rta3 = team.map((item) => item.age).every((item) => item <= 15);
console.log("rta3 : ", rta3);
