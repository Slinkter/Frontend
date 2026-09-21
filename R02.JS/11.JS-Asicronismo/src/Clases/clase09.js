/* Promesa 
 - Es una operacion asicronica 
 - Tiene 3 estados (pendiente,resulta y recahzada)
 - uso : then y catch
*/

const num = 5;
const countCows = new Promise((resolve, reject) => {
    if (num > 10) {
        resolve(`we have ${num} cows on the farm`);
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
    });
