const letters = ["a", "b", "c"];
const newLetters = letters.map((item) => item + "++");
console.log("original", letters);
console.log("new", newLetters);

const elements = ["Fire", "Air", "Water"];
console.log(elements);

console.log(elements.join());
// expected "Fire,Air,Water"

console.log(elements.join(" "));
// expected  "FireAirWater"

console.log(elements.join("-"));
// expected "Fire-Air-Water"

function multiplyElements(array) {
  return array.map((item) => item * 2);
}

const arraynumber = [1, 1, -2, -3];
const rpta = multiplyElements(arraynumber);
console.log(rpta);
