// objeto literal , si tiene instancias del prototipo
const natalia = {
  name: "",
  age: 20,
  cursosAprobado: ["curso de css ", "curso de js", "curso de mate"],
  aprobarCurso(curso) {
    this.cursosAprobado.push(curso);
  },
  aumentarAge() {
    this.age += 1;
  },
};

// Acciones , utiliza la herancia del objeto Array
natalia.name = "Nath";
natalia.age += 1;
natalia.cursosAprobado.push("Curso de responsive");
console.log(natalia);
natalia.aprobarCurso("Curso de Python");
natalia.aumentarAge();
console.log(natalia);

// crear prototipo
function StudentPrototipo(name, age, cursosAprobado) {
  this.name = name; // String
  this.age = age; // String
  this.cursosAprobado = cursosAprobado; // []
  /* 
  this.aprobarCurso = function (nameCurso) {
    this.cursosAprobado.push(nameCurso);
  }; 
  */
}
// proto - funciona anonima
StudentPrototipo.prototype.aprobarCurso = function (nameCurso) {
  this.cursosAprobado.push(nameCurso);
};
// crear una instancia
const juliana = new StudentPrototipo("juliana", 25, ["Curso de Mathlab"]);
console.log(juliana);
