const button = document.querySelector(".button");
const button2 = document.querySelector(".button2");
const imgprueba = document.querySelector(".imgprueba");
button.addEventListener("click", () => {
  alert(" debe funcionar");
});

button2.addEventListener("click", saludar);

function saludar() {
  alert("otro modod");
  button.removeEventListener("click", saludar);
}



// 2:31:33

const input = document.querySelector(".input-prueba");
const contener = document.querySelector(".seleccionado");

input.addEventListener("select", (e) => {
  let star = e.target.selectionStart;
  let end = e.target.selectionEnd;
  let textCompleto = input.value;
  contener.innerHTML = textCompleto.substring(star, end);
});
