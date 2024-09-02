class Persona {
  constructor(name, ig) {
    this.nombre = name;
    this.instagram = ig;
  }
}

const data = [
  ["luis cave", "@luiscave"],
  ["kiara keter", "@kariaketer"],
  ["Jorge Camacho", "@jorgecamacho"],
  ["Norma flores", "@floresnorma"],
  ["mauro jiro", "@jirom"],
];

const personas = [];

for (elemento in data) {
  personas[elemento] = new Persona(data[elemento][0], data[elemento][1]);
}

const obtenerpersonas = (posicion) => {
  return new Promise((resolve, reject) => {
    if (personas[posicion] == undefined) {
      reject("no se encontro al la persona en la posición ");
    } else {
      resolve(personas[posicion]);
    }
  });
};

const obtenerInstagram = (posicion) => {
  return new Promise((resolve, reject) => {
    if (personas[posicion].instagram == undefined) {
      reject("la persona no tiene instagram");
    } else {
      resolve(personas[posicion].instagram);
    }
  });
};

// ejecutamos
let position = 1;
obtenerpersonas(position)
  .then((respuesta) => {
    console.log(respuesta.nombre);
    document.write(respuesta.nombre)
    return obtenerInstagram(position);
  })
  .then((respuesta) => {
    console.log(respuesta);
    document.write("<br/>")
    document.write(respuesta)
  })
  .catch((e) => {
    console.log(e);
  });
