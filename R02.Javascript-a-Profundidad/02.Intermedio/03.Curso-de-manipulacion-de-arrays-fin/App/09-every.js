const { te } = require("date-fns/locale");

/* 1 */
const numbers = [1, 30, 39, 29, 10, 13];
let rta = true;
//
for (let index = 0; index < numbers.length; index++) {
  const element = numbers[index];
  if (element >= 40) {
    rta = false;
  }
}
console.log("for : ", rta);
/* 2 */
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
