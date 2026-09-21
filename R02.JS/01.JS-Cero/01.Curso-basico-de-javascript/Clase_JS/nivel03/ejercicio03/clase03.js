"use strict";
// fecha01 es un string
const fecha01 = Date();
console.log(fecha01);
//
// fecha02 ahora es un objeto que tiene metodos
const fecha02 = new Date();
console.log(fecha02.getDate());
console.log("Día[] :   " + fecha02.getDay());
console.log("Año  " + fecha02.getFullYear());
console.log("hora  " + fecha02.getHours());
console.log("minutos  " + fecha02.getMinutes());
console.log("segundos  " + fecha02.getSeconds());
//es un array para los dias y mes , se comienza desde cero
//Domingo ->0
//Lunes ->1
// ...
//viernes ->5
//sabado  ->6
