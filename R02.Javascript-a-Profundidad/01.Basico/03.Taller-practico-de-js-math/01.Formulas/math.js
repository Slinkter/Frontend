const precio = Number(document.getElementById("idPrecio").value);
const dscto = Number(document.getElementById("idDscto").value);
const rpta = (Number(precio) * (100 - Number(dscto))) / 100;
console.log("precio ", ":", precio);
console.log("dscto ", ":", dscto);
console.log("Rpta : ", rpta);

// Funciones
console.log("math");
function calTriangulo(l1, l2, l3, h, b) {
  const perimetro = l1 + l2 + l3;
  const area = (h * b) / 2;
  return { perimetro, area };
}

function calCuadrado(lado) {
  const perimetro = lado * 4;
  const area = lado * lado;
  return { perimetro, area };
}

function calCirculo(r) {
  const diametro = r * 2;
  const radio = Math.pow(r, 2); /*  radio ** 2; */
  return {
    circuferencia: diametro * Math.PI,
    area: radio * Math.PI,
  };
}

function calcularH(lado1, base) {
  if (lado1 == base) {
    console.warn("este no es un triangulo isosceles");
  } else {
    const altura = Math.sqrt(Math.pow(lado1, 2) - Math.pow(base, 2) / 4);
    return altura;
  }
}
