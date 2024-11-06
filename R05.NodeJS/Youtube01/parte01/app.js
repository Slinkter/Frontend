const obj = require("./modulo/saludos.js");
console.log(obj.saludar("liam"));

const { saludarHolaMundo } = require("./modulo/saludos.js");
const { saludar } = require("./modulo/saludos.js");
console.log(saludarHolaMundo());
console.log(saludar("jhonny"));
