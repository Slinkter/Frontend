const materiaHTML = document.querySelector(".materias");

const materias = [
  { nombre: "fisica 4", nota: 7 },
  { nombre: "calculo 3", nota: 9 },
  { nombre: "Base de datos 1", nota: 8 },
  { nombre: "Operacion 2", nota: 7 },
  { nombre: "Promagracion 1", nota: 9 },
];

const obtenerMateria = (id) => {
  return new Promise((resolve, reject) => {
    materia = materias[id];
    if (materia == undefined) {
      reject("la materia no existe");
    } else {
      setTimeout(() => {
        resolve(materia);
      }, Math.random() * 4000);
    }
  });
};

const devolverMaterias = async () => {
  let materia = [];
  let newHTMLCode = ``;
  for (elemento in materias) {
    materia[elemento] = await obtenerMateria(elemento);
    newHTMLCode = `
    <div class="materia">
            <div class="nombre">
               ${materia[elemento].nombre}
            </div>
            <div class="nota">
            ${materia[elemento].nota}
            </div>
        </div>    `;

    materiaHTML.innerHTML += newHTMLCode;
  }
};

devolverMaterias();
