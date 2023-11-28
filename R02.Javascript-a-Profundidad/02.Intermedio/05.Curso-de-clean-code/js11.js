/* 
JS el ámbito de las variables tiene un comportamiento por defecto estático, 
esto quiere decir que se determina en tiempo de compilación y no de ejecución,
 a ésto se le llama ámbito léxico.
*/
const age = 28;

function printAge() {
  console.log(age); // output es: 28, que es el primer valor que se le definió a la variable age
}

function mainApp() {
  const age = 26;
  printAge();
}

mainApp();
