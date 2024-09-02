"use strict";

sessionStorage.setItem("nombres", "liam");
sessionStorage.setItem("apellidos", "cave");
sessionStorage.setItem("edad", "26");

console.log(sessionStorage);

setTimeout(() => {
  sessionStorage.removeItem("nombres");
  sessionStorage.removeItem("apellidos");
  sessionStorage.removeItem("edad");
}, 5000);
