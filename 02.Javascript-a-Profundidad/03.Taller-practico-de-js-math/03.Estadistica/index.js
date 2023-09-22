/* Basico  */
function calcularPromedio(list) {
  let sumaLista = 0;
  list.forEach((element) => {
    sumaLista = sumaLista + element;
  });
  const promedio = sumaLista / list.length;
  return promedio;
}
/* Avazando */
function calcularPromedioReduce(lista) {
  const sumaLista = lista.reduce((acc, nv) => acc + nv);
  const promedio = sumaLista / lista.length;
  return promedio;
}
/* lista de par */
function esPar(lista) {
  const valor = lista.length % 2;
  // javascript valor = 0 es --> false
  // si valor = 0 , rpta false --> return true
  // si valor != 0 , rpta true --> return false
  if (valor) {
    return false;
  } else {
    return true;
  }
  // !(6%2) ==> true
  // !(5%2) ==> false
}

function esParAvanzado(list) {
  return !(list.length % 2); // !(0)  si list es part
}

function esImPar(lista) {
  return !!(lista.length % 2);
}

function calcularMediana(lista) {
  const isListaEsPar = esPar(lista);
  if (isListaEsPar) {
    //...
  } else {
    /* impar */
    const index = Math.floor(lista.length / 2) + 1;
    const mediana = lista[index];
    console.log(index);
    console.log(mediana);
  }
}
