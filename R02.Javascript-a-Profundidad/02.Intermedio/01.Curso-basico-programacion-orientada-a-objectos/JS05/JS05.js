// objeto literal , si tiene instancias del prototipo
const natalia = {
  name: "",
  age: 20,
  cursosAprobado: ["curso de css ", "curso de js"],
  aprobarCurso(nameCurso) {
    this.cursosAprobado.push(nameCurso);
  },
};

// Acciones , utiliza la herancia del objeto Array
// metodo push.
natalia.cursosAprobado.push("Curso de responsive");
// console.log(natalia);
// natalia.name = "Nath";
// console.log(natalia);
// natalia.age += 1;
// console.log(natalia);
natalia.aprobarCurso("Curso de Python");
console.log(natalia);

// crear prototipo

function StudentPrototipo(name, age, cursosAprobado) {
  this.name = name; // String
  this.age = age; // String
  this.cursosAprobado = cursosAprobado; // []
  //
  //   this.aprobarCurso = function (nameCurso) {
  //     this.cursosAprobado.push(nameCurso);
  //   };
}
// proto
StudentPrototipo.prototype.aprobarCurso = function (nameCurso) {
  this.cursosAprobado.push(nameCurso);
};
// crear una instancia

const juliana = new StudentPrototipo("juliana", 25, "Curso de Mathlab");
console.log(juliana);
