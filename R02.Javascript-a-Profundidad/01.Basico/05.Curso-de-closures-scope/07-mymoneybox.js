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
