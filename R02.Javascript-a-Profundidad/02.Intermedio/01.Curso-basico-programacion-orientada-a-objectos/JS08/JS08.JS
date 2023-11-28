class Banda {
  constructor({ nombre, generos = [], integrantes = [] }) {
    this.nombre = nombre;
    this.generos = generos;
    this.integrantes = integrantes;
  }
  addIntegrante(integranteNuevo) {
    // condicion (no quiero agregar al bateria)
    // array.every = tiene que que todos cumpla la condicion
    console.log(this.integrantes);
    if (
      this.integrantes.every((persona) => persona.instrumento !== "Bateria")
    ) {
      this.integrantes.push(integranteNuevo);
      console.log(this.integrantes);
    } else {
      console.log("no se agrega");
      console.log(this.integrantes);
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
