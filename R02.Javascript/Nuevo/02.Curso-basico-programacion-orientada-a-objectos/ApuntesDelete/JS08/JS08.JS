class Banda {
  constructor({ nombre, generos = [], integrantes = [] }) {
    this.nombre = nombre;
    this.generos = generos;
    this.integrantes = integrantes;
  }
  addIntegrante(integranteNuevo) {
    // condicion
    // --> (persona) => persona.instrumento !== "Bateria",
    // Si todos los integrantes existentes de la banda no tocan la batería, entonces esta expresión devuelve true
    // array.every = tiene que que todos cumpla la condicion

    if (
      this.integrantes.every((persona) => persona.instrumento !== "Bateria")
    ) {
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
const integrante_1 = new Integrante({
  nombre: "Erik",
  instrumento: "Guitarra",
});
const integrante_2 = new Integrante({
  nombre: "Paul",
  instrumento: "Bateria",
});
const integrante_3 = new Integrante({
  nombre: "Marcos",
  instrumento: "Bateria",
});
const integrante_4 = new Integrante({
  nombre: "Lolo",
  instrumento: "Bateria",
});
banda.addIntegrante(integrante_1);
banda.addIntegrante(integrante_2);
banda.addIntegrante(integrante_3);
banda.addIntegrante(integrante_4);

console.log(banda);
