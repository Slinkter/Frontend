const obj = { esPublico: true };
let infoCursoJSON = JSON.stringify(obj);
console.log(infoCursoJSON);
console.log(typeof infoCursoJSON);
//
let infoCursoObj = JSON.parse(infoCursoJSON);
console.log(infoCursoObj);
console.log(typeof infoCursoObj);
//
