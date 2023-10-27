class Banda {
  constructor({ nombre, generos = [] }) {
    this.nombre = nombre;
    this.generos = generos;
    this.integrantes = [];
  }
  agregarIntegrante(integranteNuevo) {
    if (this.integrantes.every((item) => item.instrumento !== "bateria")) {
      this.integrantes.push(integranteNuevo);
    } else {
      console.log("no se agrega");
    }
  }
}

//Crear clase Integrante
class Integrante {
  constructor({ nombre, instrumento }) {
    this.nombre = nombre;
    this.generos = instrumento;
  }
}

export { Banda, Integrante };

const data = {
  nombre: "Los Jacks",
  generos: ["rock", "pop", "post-punk"],
  integrantes: [],
};
const banda = new Banda(data);
const integrante1 = new Integrante({ nombre: "Erik", instrumento: "Guitarra" });
const integrante2 = new Integrante({ nombre: "Paul", instrumento: "Bateria" });
banda.agregarIntegrante(integrante1);
banda.agregarIntegrante(integrante2);

const output = {
  nombre: "Los Jacks",
  generos: ["rock", "pop", "post-punk"],
  integrantes: [
    { nombre: "Erik", instrumento: "Guitarra" },
    { nombre: "Paul", instrumento: "Bateria" },
  ],
};
