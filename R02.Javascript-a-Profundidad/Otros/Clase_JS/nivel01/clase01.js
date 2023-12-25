//

let number_one = 1;
let number_two = 2;
let number_three = 3;

const name = "Liam Cave";
const school = "School JavaScript";

// alert(number_one)
// let input_name = prompt("dame tu nombre")
// document.write(number_two**=number_three)
let saludo = "hola ";
let pregunta = "¿Como estas ? ";
let frase1 = saludo + pregunta;
document.write(frase1);
//
let nombre = "liam cave";
let frase2 = `<br> soy ${nombre} que vive en la molina <br> `;
document.write(frase2);
//
let a = 23;
let b = 13;

let rpta1 = a == b;
let rpta2 = a != b;
let rpta3 = a === b;
let rpta4 = a !== b;
let rpta5 = a <= b;
let rpta6 = a >= b;

document.write(`==================`);
document.write(`<br> `);
document.write(` a  = `, a);
document.write(`<br> `);
document.write(` b  = `, b);
document.write(`<br> `);
document.write(` ¿ a == b ? -------> ` + rpta1);
document.write(`<br> `);
document.write(` ¿ a != b ? -------> ` + rpta2);
document.write(`<br>`);
document.write(` ¿ a === b ? -------> ` + rpta3);
document.write(`<br>`);
document.write(` ¿ a !== b ? -------> ` + rpta4);
document.write(`<br>`);
document.write(` ¿ a <= b ? -------> ` + rpta5);
document.write(`<br>`);
document.write(` ¿ a >= b ? -------> ` + rpta6);
document.write(`<br>`);
//
let afirmacion_1 = a > b;
let afirmacion_2 = b < a;
document.write(`==================`);
document.write(`<br>`);
document.write(afirmacion_1 || afirmacion_2);
document.write(`<br>`);
document.write(afirmacion_1 && afirmacion_2);
