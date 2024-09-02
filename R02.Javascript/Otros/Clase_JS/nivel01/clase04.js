class animal {
  constructor(parametro1, parametro2, parametro3) {
    this.especie = parametro1;
    this.edad = parametro2;
    this.color = parametro3;
    //
    this.info = `mi especie es<b>${this.especie}</b>y tengo ${this.edad} años y soy de color ${this.color} `;
  }
}

let perro = new animal("perro", 3, "negro");
document.write(perro.info);
