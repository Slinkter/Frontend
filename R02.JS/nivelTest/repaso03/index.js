const materiaHTML = document.querySelector(".materias");
const db_materias = [
  { nombre: "fisica 4", nota: 7 },
  { nombre: "calculo 3", nota: 9 },
  { nombre: "Base de datos 1", nota: 8 },
  { nombre: "Operacion 2", nota: 7 },
  { nombre: "Promagracion 1", nota: 9 },
];

const obtenerCursoByPosition = (position) => {
  /* pormesa */
  return new Promise((resolse, reject) => {
    if (db_materias[position] == "undefined") {
      reject("no existe la posicion");
    } else {
      resolse(db_materias[position]);
    }
  });
};

const devolverMaterias = async () => {
  let aux_array = [];
  let htmlCode = ``;
  for (item in db_materias) {
    aux_array[item] = await obtenerCursoByPosition(item);
    htmlCode = `
    <div class='materia' > 
        <div> ${aux_array[item].nombre}   </div>
        <div> ${aux_array[item].nota}   </div>
    </div>  `;
    materiaHTML.innerHTML += htmlCode;
  }
};
devolverMaterias();
