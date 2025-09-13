class forma{

    //Constructor con paràmetros
    constructor(alto,ancho,color){
        this.alto = alto
        this.ancho = ancho
        this.color = color
    }

    //metodos
    dibujar(){
        return document.body.innerHTML = `    

            <div class="container">        
                <div style="height : ${this.alto}px; width : ${this.ancho}px; background :#${this.color}"  >            

                </div>  
             </div>               
        
        
        `;
    }
}

//let a = new forma(250,350,304269);

class cuadrado extends forma{
    constructor(lado,color){
        super(lado,lado,color);


    }
}

let b = new cuadrado(800,304269);


