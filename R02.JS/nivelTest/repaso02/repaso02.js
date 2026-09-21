function changeColor(color) {
  const para = document.getElementById("para");
  para.style.color = color;
}

const titulo = document.querySelector(".titulo");
// settiando
titulo.style.fontSize = "50px";
titulo.style.color = "red";
titulo.style.padding = "15px";
titulo.style.background = "blue";
titulo.style.margin = "50px";
console.log(titulo);
titulo.classList.add("titulo2");
titulo.classList.add("titulo3");
titulo.classList.add("titulo4");
// obteniendo - extraer
let selector00 = titulo.classList.item(0);
let selector01 = titulo.classList.item(1);
let selector02 = titulo.classList.contains("titulo3");
console.log(selector00);
console.log(selector01);
console.log(selector02);

//
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

const container = document.querySelector(".container");
let cadena = ` `;

for (key in db_alumnos) {
  /* console.log(db_alumnos[key]); */
  let nombre = db_alumnos[key].nombre;
  let email = db_alumnos[key].email;
  let materia = db_alumnos[key].materia;
  // plantilla html
  let htmlCode = `
  <div style='margin:30px'>
   <div class="grid-item nombre">${nombre} Cave</div>
   <div class="grid-item email">${email}</div>
   <div class="grid-item materia">${materia}</div>
   <div class="grid-item semana">
           <select name="semana-elegida"  class="semana-elegida">
               <option value="Semana 1">Semana 1 </option>
               <option value="Semana 2">Semana 2 </option>
           </select>
   </div> 
  
  </div> 
   `;

  cadena += htmlCode;
}
container.innerHTML = cadena;

//

const btn_send = document.querySelector(".bnt-send");
btn_send.addEventListener("click", () => {
  //
  let nota, resultado, mensaje;
  try {
    nota = parseInt(prompt("ingresa nota ", "escriba un numero "));
    resultado = func_resultado(nota);
    promedio = func_promedio(nota);
  } catch (error) {
    er_resultado = "esto es el try catch de resultado ";
    er_promedio = "try catch de mensaje ";
    console.error(error);
  }
  //
  console.log(nota, resultado, promedio);
});

function func_resultado(nota) {
  let resultado;
  if (nota > 11) {
    resultado = "aprovado";
  } else {
    resultado = "jalado";
  }
  return resultado;
}

function func_promedio(nota) {
  let promedio;
  let nota1 = 12;
  let nota2 = 15;

  promedio = (nota1 + nota2 + nota) / 3;

  return promedio;
}

const bnt_calc = document.querySelector(".bnt-calc");
console.log(bnt_calc);
bnt_calc.addEventListener("click", () => {
  /*  alert("boton funciona"); */
  let input;
  let categoria;
  let promedio;
  try {
    input = parseInt(prompt("Ingresar nota de examen"));
    categoria = func_categoria(input);
    promedio = func_promedio(input);
    rpta = `Su nota es ${input}  y usted esta ${categoria} y su promedio es ${promedio}`;
    console.log(rpta);
  } catch (error) {
    console.log(error);
  }
});

function func_categoria(nota) {
  let msj_categoria;
  if (nota < 11) {
    msj_categoria = "jalado";
  } else if (nota >= 11 && nota <= 20) {
    msj_categoria = "aprobado";
  } else {
    msj_categoria = "nota invalida";
  }
  return msj_categoria;
}

function func_promedio(nota) {
  n1 = 15;
  n2 = 14;
  let suma = n1 + n2 + nota;
  let promedio = suma / 3;
  return promedio;
}
/* ========== */
const data = [
  ["luis cave", "@luiscave"], // posicion 0
  ["kiara keter", "@kariaketer"], // posicion 1
  ["Jorge Camacho", "@jorgecamacho"],
  ["Norma flores", "@floresnorma"],
  ["mauro jiro", "@jirom"], // posicion 5
];

class Persona {
  constructor(nombre, ig) {
    this.name = nombre;
    this.instagram = ig;
  }
}

let lista_personas = [];
for (item in data) {
  lista_personas.push(new Persona(data[item][0], data[item][1]));
}
/* console.log(lista_personas); */

function obtenerNamebyPosition(position) {
  return new Promise((resolse, reject) => {
    /*  */
    if (lista_personas[position] == "undefined") {
      reject("no existe la position ");
    } else {
      let nombre = lista_personas[position].name;
      resolse(`el nombre es ${nombre}`);
    }
  });
}

let position = 1;
obtenerNamebyPosition(position).then((rpta) => console.log(rpta));
