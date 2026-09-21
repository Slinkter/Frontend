class Forma {
  constructor(alto, ancho, color) {
    this.alto = alto;
    this.ancho = ancho;
    this.color = color;
  }

  dibujar() {
    return (document.body.innerHTML = `
			<div style="
					width : ${this.ancho}px;
					height : ${this.alto}px;
					background :#${this.color} "
				> hola
			</div>
		`);
  }
}

let forma1 = new Forma(650, 850, 321584);
forma1.dibujar()
