/* Promesa */
// una promesa tiene 3 estados (pendiente,resulta y recahzada)
// es una operacion asicronica
// para manejar el resultado de un promesa se usa then y catch

const cows = 5;
const countCows = new Promise((resolve, reject) => {
  if (cows > 10) {
    resolve(`we have ${cows} cows on the farm`);
  } else {
    reject("there is no cows on the farm enoght");
  }
});
//
countCows
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("finaly"));
