// objeto literal
const natalia = {
    name: "natalia",
    age: 20,
    cursosAprobado: ["curso de css ", "curso de js", "curso de html"],
    aprobarCurso(curso) {
        this.cursosAprobado.push(curso);
    },
    aumentarAge() {
        this.age += 1;
    },
};

// Settear objecto literal
natalia.name = "Nath";
natalia.age += 1;
natalia.cursosAprobado.push("Curso de python"); // a propiedad
natalia.aprobarCurso("Curso de Python"); // a metodo
natalia.aumentarAge();
console.log(natalia);
//

// crear prototipo con funciones constructoras
function Student(name, age, cursosAprobado) {
    this.name = name; // String
    this.age = age; // String
    this.cursosAprobado = cursosAprobado; // []
}
// Crear metodo -  proto - funciona anonima
Student.prototype.aprobarCurso = function (nameCurso) {
    this.cursosAprobado.push(nameCurso);
};
// crear una instancia
const juliana = new Student("juliana", 25, []);
juliana.aprobarCurso("Curso de Mathlab");
juliana.aprobarCurso("Curso de Marketing");
console.log(juliana);
