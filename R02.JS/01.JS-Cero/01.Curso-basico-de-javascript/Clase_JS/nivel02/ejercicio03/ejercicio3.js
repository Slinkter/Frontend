class Persona {
  constructor(name, ig) {
    this.nombre = name;
    this.instagram = ig;
  }
}

const data = [
  ["luis cave", "@luiscave"], // posicion 0
  ["kiara keter", "@kariaketer"], // posicion 1
  ["Jorge Camacho", "@jorgecamacho"],
  ["Norma flores", "@floresnorma"],
  ["mauro jiro", "@jirom"], // posicion 5
];

const array_personas = [];

for (i in data) {
  array_personas[i] = new Persona(data[i][0], data[i][1]);
}

// queremos una funcion que cuando le pasemos el id o posicion nos muetre el nombre y
const obtenerPersona = (posicion) => {
  return new Promise((resolve, reject) => {
    if (array_personas[posicion] == undefined) {
      reject("la persona es undefined");
    } else {
      resolve(
        ` la persona exite en esta version ${array_personas[posicion].nombre}`
      );
    }
  });
};

//
const obtenerInstagram = (posicion) => {
  return new Promise((resolve, reject) => {
    if (array_personas[posicion].instagram == undefined) {
      reject("la persona no tiene instagram");
    } else {
      resolve(
        ` lel instagram de persona es :${array_personas[posicion].instagram}`
      );
    }
  });
};

// ejecutamos la promesa
let id = 1;
obtenerPersona(1)
  .then((resultado) => {
    console.log(resultado);
    return obtenerInstagram(1);
  })
  .then((rpta) => {
    console.log(rpta);
  })
  .catch((e) => console.log(e));
