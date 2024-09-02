let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombre = e.target.nombre.value;
  console.log(nombre);
});
