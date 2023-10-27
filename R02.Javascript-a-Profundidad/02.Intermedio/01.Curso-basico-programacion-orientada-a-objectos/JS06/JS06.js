// JS trabaja con clase  ,solo es una sintaxis especial
// las clases por dentro son prototipos
// Js esta basado en prototipos
class Studen2 {
  // {elmentos100 ,elemento 30,elemmento 2} la ventaja es que puede ir desordenado
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
