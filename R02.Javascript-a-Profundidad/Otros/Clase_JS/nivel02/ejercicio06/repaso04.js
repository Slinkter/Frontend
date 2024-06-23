const materiaHTML = document.querySelector(".materias");
// --> array de objetos
const db_material = [];
db_material.push({ nombre: "Liam", apellido: "Cave" });
db_material.push({ nombre: "Fiorela", apellido: "Sosa" });
db_material.push({ nombre: "Andrea", apellido: "Vazques" });
db_material.push({ nombre: "Carlos", apellido: "Flores" });
//
const verificarMateriaPorID = (id) => {
  return new Promise((resolve, reject) => {
    if (db_material[id] == undefined) {
      reject(`error, no se ha encontrao ese id ${db_material[id]}`);
    } else {
      resolve(db_material[id]);
    }
  });
};
//
const mostrarMaterias = async () => {
  //
  let array_m = [];
  //
  for (i in db_material) {
    array_m[i] = await verificarMateriaPorID(i);

    let newHTMLCode = `
      <div class="materia">
        <div class="nombre">
           ${array_m[i].nombre}
        </div>
        <span>   </span>
        <div class="nota">
        ${array_m[i].apellido}
        </div>
    </div>
    `;
    materiaHTML.innerHTML = materiaHTML.innerHTML + newHTMLCode;
  }
};

mostrarMaterias();
