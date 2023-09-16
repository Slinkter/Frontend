/* reduce a un solo valor : promedio,maximo,minimo */

/* 
const totals = [1, 2, 3, 4];
let sum = 0;
for (let index = 0; index < totals.length; index++) {
  const element = totals[index];
  sum = sum + element;
}
console.log(sum); 
*/
const totals = [1, 2, 3, 4];
const rta = totals.reduce((acc, element) => acc * element, 1);
console.log("rta", rta);
