//-----> Metodos de seleccion elemetos
// .getElementById
// .getElementByTagName("p")
// .querySelector
// .querySelectorAll
//-----> modificar css
// query selector coger el valor de las clases

const titulo = document.querySelector(".titulo");
titulo.style.color = "blue";
titulo.style.padding = "10px";
titulo.style.background = "red";
//titulo.setAttribute("hidden", "true");
//titulo.removeAttribute("hidden");
//
titulo.classList.add("dasdas");
//
let valor_titulo = titulo.classList.item(1);
let valor_contains = titulo.classList.contains("classmartes");
let resultado = titulo.textContent;

document.write("<br>", valor_titulo);
document.write("<br>", valor_contains);
document.write("<br>", resultado);

const input_001 = document.querySelector(".input_001");
const input_002 = document.querySelector(".input_002");
const input_normal = document.querySelector(".input_003");
input_normal.minLenght = 1;
input_normal.placeholder = "hola";
input_normal.required = "true";
