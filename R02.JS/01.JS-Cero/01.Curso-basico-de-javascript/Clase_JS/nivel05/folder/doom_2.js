var byId = document.getElementById("logo");
console.log(byId.src);

function hiddenimg() {
  var imagen = document.getElementById("logo");
  imagen.style.visibility = "Hidden";
}

function visibleimg() {
  var imagen = document.getElementById("logo");
  imagen.style.visibility = "Visible";
}

//Cambiar de posicion
var parrafos = document.body.getElementsByTagName("p");
document.body.insertBefore(parrafos[2], parrafos[0]);
//Crear Nodos
function reemplzarImg() {
  var imagenes = document.body.getElementsByTagName("img");
  for (var i = imagenes.length - 1; i >= 0; i--) {
    var imagen = imagenes[i];
    if (imagen.alt) {
      var texto = document.createTextNode(imagen.alt);
      imagen.parentNode.replaceChild(texto, imagen);
    }
  }
}
