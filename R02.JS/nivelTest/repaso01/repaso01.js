let n_one = 1;
let n_two = 2;
let n_three = 3;

const name = "Liam Cave";
const school = "School Javascript";

/* let input_name = prompt("ingresar tu nombre");

/* let saludo = "Hola  ";
let pregunta = ", Como estas?? "; */
/* 
let cadena_ = `hola ${input_name}, Como estar ? ,<br> tiene ${n_three} entradas para el cine  `;

document.write(cadena_);
 */

let a = 40;
let b = 10;
console.log();
console.group("1. Operaciones ");
console.log("a==b ", a == b);
console.log("a!=b ", a != b);
console.log("a<b ", a < b);
console.log("a<=b ", a <= b);
console.log("a===b ", a === b);
console.log("a!=b ", a !== b);
console.groupEnd();
console.group("2. Afirmacion ");
console.log(a > b || b < a);
console.log(a > b && b < a);
console.groupEnd();
console.group("3. Objetos ");
let pc1 = {
  nombre: "pc01",
  procesador: "corei5",
  ram: "16GB",
  disco: "1TB",
};

let pc2 = ["pc02", "Readon serie7 ", "32GB", "2TB"];
console.log(pc1);
console.log(pc2);
console.log("");
console.log(pc1["procesador"]);
console.log(pc1.procesador);
console.log(pc2[1]);
console.log("");
let v1 = pc1.nombre;
let v2 = pc1.procesador;
let v3 = pc1.ram;
let v4 = pc1.disco;
let cadena = `\n
 nombre : ${v1}  \n
 procesador : ${v2}  \n
 ram : ${v3}  \n
 disco : ${v4}  \n
`;
console.log(cadena);
console.groupEnd();
console.group("4. Bucles");
console.group("4.1 While");
let i = 1;
while (i < 10) {
  console.log(i);
  if (i == 5) {
    console.log("se ha interrumpido el bucle");
    break;
  }
  i++;
}
console.groupEnd();
console.group("4.2 While");
let numero = 1;
do {
  console.log(numero);
  numero++;
} while (numero <= 5);
console.groupEnd();
/*============================== */
console.group("4.3 For - version 1 - index");
let animales_01 = ["gatos", "perro", "ave"];
let cant_animales = animales_01.length;
for (let i = 0; i < cant_animales; i++) {
  console.log(animales_01[i]);
}
console.groupEnd();
/*============================== */
console.group("4.4 For - version 2 - in");
let animales_02 = ["gatos", "perro", "ave"];
for (key in animales_02) {
  console.log(animales_02[key]);
}
console.groupEnd();
/*============================== */
console.group("4.5 For - version 3 - of");
let animales_03 = ["gatos", "perro", "ave"];
for (iterator of animales_03) {
  console.log(iterator);
}
console.groupEnd();
console.groupEnd();
console.group("5. Funciones");
console.group("5.1 Funciones - Clasica");
function hello() {
  rpta = prompt("escribe si es de dia o noche");
  if (rpta === "dia") {
    alert("ir a la calle");
  } else if (rpta === "noche") {
    alert("ir a domir");
  } else {
    alert("ir a casa");
  }
}
/* hello() */

console.groupEnd();
console.group("5.2 Funciones - mordena");
const sumar = (a, b) => {
  alert((rpta = a + b));
};

console.groupEnd();
console.groupEnd();
console.group("6. Clases");
class Persona {
  constructor(nombre, apellido, edad) {
    // valores a recibir para opera,trabajar o modificar
    this.first_name = nombre;
    this.last_name = apellido;
    this.age = edad;
    //
    this.info = `hola ${this.first_name} ${this.last_name} , tu edad ingresada es ${this.age}`;
  }
}

let alumno054324 = new Persona("Luis", "Cueva", 29);
console.log(alumno054324.info);

console.groupEnd();
console.group("7. Lista - Array");
//
let lista_nombres = ["pedro", "beto", "zoila", "jorge", "ana"];
//
let m1 = lista_nombres.reverse();
console.log(m1);
let m2 = lista_nombres.sort();
console.log(m2);
let m3 = m2.reverse();
console.log(m3);
//
lista_nombres = ["pedro", "beto", "zoila", "jorge", "ana"];
let m4 = [...lista_nombres];
console.log("Agregar un elemento al final de lista  ");
m4.push("carlos");
console.log(m4);
console.log("Eliminar un elemento al final de lista  ");
m4.pop();
console.log(m4);
//
console.log("Agregar varios elementos al inicio de lista  ");
m4.unshift("alberto", "lola", "kiara", "carmen");
console.log(m4);
//
console.log("Eliminar segun index-position  con rango ");
m4.splice(0, 1);
console.log(m4);
//
console.log("Remplazo segun index-position  con rango ");
m4.splice(0, 1, "carolina");
console.log(m4);
//
lista_nombres = ["pedro", "beto", "zoila", "jorge", "ana"];
console.log("Separadores con   - ");
console.log(lista_nombres.join(","));
console.groupEnd();
console.group("8. Metodos de repeticion");
let array_lista = [
  "compras",
  "ventas",
  "operaciones",
  "marketing",
  "colegio",
  "universidad",
];
console.group("8.1 .map()");
const areas = array_lista.map((item) => {
  return "area " + item;
});
console.log(areas);
console.groupEnd();
console.group("8.2 .filter()");
let lista_aux = [];
const rpta = array_lista.filter((item) => {
  if (item === "universidad") {
    console.log("si son iguales");
    lista_aux.push(item);
  } else {
    console.log("no son iguales , ", item);
  }
});
console.log(lista_aux);
console.groupEnd();
console.group("8.3 .reduce()");
console.groupEnd();

console.group("8.4 .forEach()");
array_lista.forEach((item) => {
  if (1 < item.length) {
    console.log(item);
  }
});

console.groupEnd();

console.groupEnd();
