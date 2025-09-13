/* Dont repeat yourseft */
/* 
DRY 
*/

const juanAverage1 = (90 + 50 + 70) / 3;
const sofiaAverage1 = (80 + 90 + 70 + 80) / 4;
const anaAverage1 = (60 + 90 + 70 + 100 + 95) / 5;

// Sin repetir código
function average(grades) {
  return grades.reduce((prev, current) => prev + current, 0) / grades.length;
}

const juanAverage = average([90, 50, 70]);
const sofiaAverage = average([80, 90, 70, 80]);
const anaAverage = average([60, 90, 70, 100, 95]);
