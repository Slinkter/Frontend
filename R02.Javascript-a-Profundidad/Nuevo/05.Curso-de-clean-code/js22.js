/* Dont repeat yourseft */
/* 
DRY 





*/

const juanAverage = (90 + 50 + 70) / 3;
const alexAverage = (80 + 90 + 70 + 80) / 4;
const candeAverage = (40 + 100) / 2;
console.log(juanAverage, alexAverage, candeAverage);

function getAverage(...grades) {
  return grades.reduce((acc, current) => acc + current, 0) / grades.length;
}

const juanAverage2 = getAverage(90, 50, 70);
const alexAverage2 = getAverage(80, 90, 70, 80);
const candeAverage2 = getAverage(40, 100);
console.log(juanAverage2, alexAverage2, candeAverage2);
