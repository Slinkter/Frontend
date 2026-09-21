/* array destructuring */
let fruits = ["Apple", "Banana", "Orange"];
let [a, b, c] = fruits;
console.log(a, b, c);
console.log(a); // a =  Apple
console.log(b); // b = Banana
console.log(a, fruits[0], fruits[fruits.length - 1]);

/* object destructuring */

let user = { username: "Ferney", age: 34, country: "PE" };
let { username, age } = user;
console.log(username, age);
console.log(username, user.age);

let user1 = { username1: "Carlos", age1: 34, country: "LON" };
let { username1: as, age1: bs } = user1;
console.log(as, bs);

//spread operator

let country = "CO";
let person = { name: "Ferney", age: 28 };
let data = { id: 1, country, ...person };
console.log(data);

let numeros = [1, 2, 4, 5];
let othernum = 6;
let array = [...numeros, othernum];
console.log(numeros);
console.log(array);
array[0] = 777;
console.log(array);
console.log(numeros);

// rest

const rpta = sum(1, 1, 2, 3);
function sum(num, ...values) {
  console.log(values);
  console.log(num + values[0]);
  return num + values[0];
}

console.log(rpta);
