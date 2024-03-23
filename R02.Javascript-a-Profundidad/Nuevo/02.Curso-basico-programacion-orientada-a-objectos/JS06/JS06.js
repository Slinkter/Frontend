// JS trabaja con clase  ,solo es una sintaxis especial
// las clases por dentro son prototipos
// Js esta basado en prototipos
// Utilizando la sintaxis de clases (introducida en ECMAScript 2015)
class Studen2 {
  constructor({ name, age, cursosAprobado = [] }) {
    this.name = name;
    this.age = age;
    this.cursosAprobado = cursosAprobado;
  }
  aprobadoCurso(nuevoCurso) {
    this.cursosAprobado.push(nuevoCurso);
  }
}
const objMiguel = {
  name: "miguel",
  age: 18,
  cursosAprobado: ["analisis de negocios", "Ciencia de datos"],
};
const miguel = new Studen2(objMiguel);

console.log(miguel);
