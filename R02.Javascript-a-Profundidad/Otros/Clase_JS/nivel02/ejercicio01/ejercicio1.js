// array de objectos
db_alumnos = [
  {
    nombre: "liam",
    email: "loam@fas.com",
    materia: "fisica 1",
  },
  {
    nombre: "jorge",
    email: "jorge@fas.com",
    materia: "biologia",
  },
  {
    nombre: "orlando",
    email: "orlando@fas.com",
    materia: "matematicas",
  },
  {
    nombre: "Kiara",
    email: "Kiara@fas.com",
    materia: "historia",
  },
];
// Se recorre la lista

for (i in db_alumnos) {
  // extraer un objeto
  let datos = db_alumnos[i];
  // setear info de un objeto
  let nombre = datos["nombre"];
  let email = datos["email"];
  let material = datos["materia"];
  // plantilla html
  let htmlCode = `
 <div style='margin:30px'>
  <div class="grid-item nombre">${nombre} Cave</div>
  <div class="grid-item email">${email}</div>
  <div class="grid-item materia">${material}</div>
  <div class="grid-item semana">
          <select name="semana-elegida"  class="semana-elegida">
              <option value="Semana 1">Semana 1 </option>
              <option value="Semana 2">Semana 2 </option>
          </select>
  </div> 
 
 </div> 
  `;
  // insertar en DOM
  document.querySelector(".grid-container").innerHTML += htmlCode;
}
//

function sendFormulario(evt) {
  //
  let elementos_nombres = document.querySelectorAll(".nombre");
  let array_nombre = [];
  //
  for (i in elementos_nombres) {
    array_nombre.push(elementos_nombres[i].textContent);
  }

  console.log(array_nombre);
}
//
const btn_confirmar = document.querySelector(".btn_confirmar ");
btn_confirmar.addEventListener("click", () => sendFormulario());
//
