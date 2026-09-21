/* reglas de nomenclatura */
//
//> Nombres pronunciables y expresivos
// No recomendado
const yyyymmdstr = moment().format("YYYY/MM/DD");

// Recomendado
const currentDate = moment().format("YYYY/MM/DD");

//> Ausencia de información técnica en los nombres

/* 
- evitar nombre de las variables con informacion tecnica
- Software Vertical : esta orientado a negocios , evitar nombres a tecnologia
- Software Horizontal : esta orientado a , evitar la informacion tecnica.
*/

let arrayNames = ["liam", "mariana", "karen"]; // no
let namesList = ["liam", "mariana", "karen"]; // si
/* 
- usar lenguaje ubicuo : 

se construye un lenguaje en comun entre colaboradores (stakeholder y programadores)
un vocabularios que todos entiendan

*/

getUserInfo(); // no
getClientData(); // no
getCustomerRecord(); // no

getUser(); // si
