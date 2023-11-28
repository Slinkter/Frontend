function moneyBox(coins) {
  let saveCoins = 0;
  saveCoins += coins;
  console.log(`MoneyBox : $ ${saveCoins}`);
}

moneyBox(5); // no funciona
moneyBox(3); // no funciona

// se arregla con una closure

function moneyBoxClosure() {
  let saveCoins = 0;
  function countCoins(coins) {
    saveCoins += coins;
    console.log(`MoneyBox : $ ${saveCoins}`);
  }
  return countCoins;
}

const rpta = moneyBoxClosure();
rpta(5);
rpta(5);
rpta(5);
const rpta2 = moneyBoxClosure();
rpta2(100);
rpta2(15);
rpta2(25);

/* 
Explicacion 

La razón por la que la función moneyBox no funciona es porque 
la variable "saveCoins" NO mantiene su valor entre llamadas a la función. 
Esto se debe a que saveCoins es una variable local, y las variables locales se crean y destruyen cada vez que se llama a la función.

En cambio, la función moneyBoxClosure funciona porque crea una closure. Una closure es una función que recuerda el valor de sus variables locales incluso después de que la función haya terminado de ejecutarse. Esto se debe a que la closure tiene acceso a un entorno léxico especial que contiene los valores de las variables locales de la función.

En el caso de la función moneyBoxClosure, la closure recuerda el valor de la variable saveCoins incluso después de que se haya terminado de ejecutar la función moneyBoxClosure. Esto significa que el valor de saveCoins se mantiene entre llamadas a la función countCoins, lo que permite que la función countCoins realice un seguimiento de la cantidad total de monedas que se han guardado en la hucha.

Por lo tanto, la función moneyBoxClosure es una forma más efectiva de crear una hucha porque mantiene un registro de la cantidad total de monedas que se han guardado en la hucha, incluso después de que se haya terminado de ejecutar la función.

*/
