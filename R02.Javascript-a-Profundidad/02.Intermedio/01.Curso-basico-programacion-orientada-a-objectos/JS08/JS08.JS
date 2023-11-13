class Banda {
  constructor({ nombre, generos = [], integrantes = [] }) {
    this.nombre = nombre;
    this.generos = generos;
    this.integrantes = integrantes;
  }
  addIntegrante(integranteNuevo) {
    if (this.integrantes.every((item) => item.instrumento !== "Bateria")) {
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
    this.instrumento = instrumento;
  }
}

const data = {
  nombre: "Los Jacks",
  generos: ["rock", "pop", "post-punk"],
  integrantes: [],
};

const banda = new Banda(data);
const p1 = new Integrante({ nombre: "Erik", instrumento: "Guitarra" });
const p2 = new Integrante({ nombre: "Paul", instrumento: "Bateria" });
const p3 = new Integrante({ nombre: "Marcos", instrumento: "Bateria" });
banda.addIntegrante(p1);
banda.addIntegrante(p2);
banda.addIntegrante(p3);
banda.addIntegrante(p3);
banda.addIntegrante(p3);

console.log(banda);
