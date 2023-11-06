/* 
reglas de nomenclatura 

- nombre pronuncialbes y expresiva en ingles con una estrucutra camelcase

*/

const yyymmdstr = moment().format("YYYY/MM/DD");
const currentday = moment().format("YYYY/MM/DD");
/* 

- evistar nombre de las variables con informacion tecnica

- Software vertical : esta orientado a negocios , evitar nombres a tecnologia
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

/* 
se busca q el codigo se autoexplicativo
*/
