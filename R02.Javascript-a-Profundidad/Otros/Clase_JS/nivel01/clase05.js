let nombres = ["pedro", "maria", "jorge", "ana"];
// estos son metodos tranformadores
document.write("Array original :<b>[" + nombres + "]</b> <br>  <br>");
let resultado = nombres.pop();
document.write(
  "<span >----> Método .pop() : valor saliente </span> <b>" +
  resultado +
  "</b> <br><br>"
);
document.write("Array  modificado : <b>[" + nombres + "]</b><br><br>");
resultado = nombres.push("Angelica");
document.write(
  "----> Método .push(Angelica) : valor entrante <b>" +
  nombres[resultado - 1] +
  "</b> <br><br>"
);
document.write("Array modificado <b>[" + nombres + "]</b><br><br>");

document.write("----> Método .reverse() :  <b>" + "</b> <br><br>");
resultado = nombres.reverse();
document.write("Array modificado <b>[" + nombres + "]</b><br><br>");
document.write("----> Método .unshift(a,b) :  <b>" + "</b> <br><br>");
resultado = nombres.unshift("a", "b");
document.write("Array modificado <b>[" + nombres + "]</b><br><br>");
resultado = nombres.sort();
document.write("----> Método .sort():  <b>" + "</b> <br><br>");
document.write("Array modificado <b>[" + nombres + "]</b><br><br>");
resultado = nombres.splice(1, 3);
document.write("----> Método .splice(1,3)   <b>" + "</b> <br><br>");
document.write("*** caso 1 : eliminar  según posición:  <b>" + "</b> <br><br>");
document.write("Array modificado <b>[" + nombres + "]</b><br><br>");
document.write("resultado <b>" + resultado + "</b><br><br>");
resultado = nombres.splice(1, 3, "kiara", "Andorra");
document.write(
  "----> Método .splice(1,3,'kiara','Andorra')   <b>" + "</b> <br><br>"
);
document.write("*** caso 2 : aumentar según posición :  <b>" + "</b> <br><br>");
document.write("Array modificado <b>" + nombres + "</b><br><br>");
resultado = nombres.splice(0, -1, "Rose", "Carolina");
document.write(
  "----> Método .splice(-1,3,'Rose','Carolina')   <b>" + "</b> <br><br>"
);
document.write("*** caso 3 : aumentar según posición :  <b>" + "</b> <br><br>");
document.write("Array modificado <b>" + nombres + "</b><br><br>");

// estos son metodos  accesores
document.write("<br> ========== Metodoos de accesores ========== <br>");
document.write("---> .join('-') <br>");
let rpta = nombres.join(" - ");
document.write("Array original <b>" + nombres + "</b><br><br>");
document.write("Array obtenido <b>" + rpta + "</b><br><br>");
document.write("---> .slice(0,2) <br>");
rpta = nombres.slice(0, 2);
document.write("Array original <b>" + nombres + "</b><br><br>");
document.write("Array obtenido <b>" + rpta + "</b><br><br>");
// estos son metodos  repeticion
document.write("<br> ========== Metodoos de repeticion ========== <br>");
document.write("---> .filter() <br>");
let array_lista = [
  "compras",
  "ventas",
  "operaciones",
  "marketing",
  "colegio",
  "universidad",
];
array_lista.filter((item) => {
  if (1 < item.length) {
    document.write(
      item + " tiene<span>" + item.length + "</span>caracteres" + "<br>"
    );
  }
});
//
document.write("<br>---> .forEach() <br>");
array_lista.forEach((item) => {
  if (1 < item.length) {
    document.write(
      item + " tiene<span>" + item.length + "</span>caracteres" + "<br>"
    );
  }
});

// estos son metodos  accesores
document.write("<br> ========== Métodos de matematicos ========== <br>");
document.write("---> Math.random('-') <br>");

let rpta_1 = Math.random() * 100;
rpta_1 = rpta_1.toString();
document.write("rpta_1.toString()  : " + rpta_1 + "<br>");
rpta_1 = Math.round(rpta_1);
document.write("Math.round(rpta_1) : " + rpta_1 + "<br>");
rpta_1 = Math.floor(rpta_1);
document.write("Math.floor(rpta_1) :" + rpta_1 + "<br>");