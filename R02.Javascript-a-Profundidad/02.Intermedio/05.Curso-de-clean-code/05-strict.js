"use strict";
pi = 3.1416; // no usa el hoisting
console.log(pi); //ReferenceError: pi is not defined

function myFunctions() {
  "use strict";
  return (pi = 3.1416);
}
console.log(myFunctions()); //ReferenceError: pi is not defined
