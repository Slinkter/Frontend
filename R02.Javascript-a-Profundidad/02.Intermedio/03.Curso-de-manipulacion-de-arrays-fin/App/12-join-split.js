const elements = ["Fire", "Air", "Water"];

let rtaFinal = " ";
const separator = "_";

for (let index = 0; index < elements.length; index++) {
  rtaFinal = rtaFinal + elements[index] + separator;
}
console.log("for", rtaFinal);

const rta = elements.join("-");
console.log("join", rta);

const title = "Curso de manipulación de arrays";

const urlFinal = title.split(" ").join("-").toLowerCase();
console.log(urlFinal);
