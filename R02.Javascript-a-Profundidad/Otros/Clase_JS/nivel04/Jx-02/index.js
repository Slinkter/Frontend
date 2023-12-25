

class Forma {
	constructor(alto,ancho,color){
		this.alto = alto
		this.ancho = ancho
		this.color = color
	}

	dibujar(){
		return document.body.innerHTML = `
			<div style="
					width : ${this.ancho}px;
					height : ${this.alto}px;
					background :#${this.color} "
				> hola
			</div>
		`
	}
}

let forma1 = new Forma(200,120,321584);


